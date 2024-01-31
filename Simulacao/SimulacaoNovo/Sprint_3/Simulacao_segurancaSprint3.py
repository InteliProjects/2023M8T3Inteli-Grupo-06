from flask import Flask, jsonify, request
from circuitbreaker import CircuitBreaker
import redis
import random
from cryptography.fernet import Fernet
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)

# Chave secreta para assinar o JWT
secret_key = "sua_chave_secreta"  # Substitua com uma chave secreta segura

# Configuração do Redis
redis_host = 'localhost'
redis_port = 6379
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)

# Configuração do circuit breaker
circuit = CircuitBreaker(recovery_timeout=5)
failure_count = 0
max_consecutive_failures = 3

# Chave de criptografia para proteger o resultado da simulação
encryption_key = Fernet.generate_key()
cipher_suite = Fernet(encryption_key)

# Função de exemplo para simular a categorização
def simulation(string):
    categorization = random.random()

    if categorization > 0.65:
        return "Categorização incorreta"
    else:
        return "Categorização correta"

# Função para processar a cache e circuit breaker
@circuit
def cache_process(string):
    # Tenta obter a resposta do cache
    cache_response = redis_client.get(string)

    if cache_response:
        # Descriptografa a resposta do cache
        decrypted_response = cipher_suite.decrypt(cache_response.encode()).decode()
        print("Resposta descriptografada do cache:", decrypted_response)
        return decrypted_response

    # Se não estiver no cache, executa a simulação
    response = simulation(string)

    # Criptografa o resultado da simulação antes de armazená-lo
    encrypted_response = cipher_suite.encrypt(response.encode()).decode()
    redis_client.setex(string, 86400, encrypted_response)

    print("Resposta do simulador:", response)
    return response

# Rota da API para criar e retornar um token JWT
@app.route('/get_token', methods=['POST'])
def get_token():
    data = request.get_json()

    # Verifique as credenciais (isso pode variar dependendo do seu sistema de autenticação)
    if data['username'] == 'usuario' and data['password'] == 'senha':
        # Crie um token JWT com expiração em 1 hora (pode ajustar conforme necessário)
        expiration_time = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({'username': 'usuario', 'exp': expiration_time}, secret_key, algorithm='HS256')
        return jsonify({'token': token, 'expires_in': expiration_time}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401

# Rota da API protegida por JWT
@app.route('/simulation', methods=['GET'])
def sua_rota_protegida():
    global failure_count

    # Obtem o parâmetro da URL
    user_input = request.args.get('user_input', '')

    # Verifica se o token JWT está presente no cabeçalho da solicitação
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify(error='Token JWT ausente ou formato inválido'), 401

    token = auth_header.split('Bearer ')[1]

    try:
        # Verifica e decodifica o token JWT
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify(error='Token JWT expirado'), 401
    except jwt.InvalidTokenError:
        return jsonify(error='Token JWT inválido'), 401

    # O token é válido, continue com a lógica da sua rota
    result = cache_process(user_input)

    if result == 'Categorização correta':
        failure_count = 0
        return jsonify(message=result), 200
    else:
        failure_count += 1
        if failure_count >= max_consecutive_failures:
            circuit._state = 'open'
            return jsonify(error='Circuito aberto'), 503
        else:
            return jsonify(error='Categorização incorreta'), 500

# Inicie o servidor
if __name__ == '__main__':
    app.run(port=3000)
