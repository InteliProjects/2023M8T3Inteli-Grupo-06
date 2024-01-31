from flask import Flask, jsonify, request
from circuitbreaker import CircuitBreaker
import redis
import random
# import time

app = Flask(__name__)

# Configuração do Redis
redis_host = 'localhost'
redis_port = 6379
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)

# Configuração do circuit breaker
circuit = CircuitBreaker(recovery_timeout=5)

failure_count = 0
max_consecutive_failures = 3

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
    # start_time = time.time()

    # Tenta obter a resposta do cache
    cache_response = redis_client.get(string)

    if cache_response:
        print("Resposta do cache:", cache_response)
        # end_time = time.time()
        # response_time = end_time - start_time
        # print("Tempo de resposta: {:.2f} segundos".format(response_time))
        return cache_response

    # Se não estiver no cache, executa a simulação
    response = simulation(string)

    # Armazena o resultado no cache
    redis_client.setex(string, 600, response)

    print("Resposta do simulador:", response)
    # end_time = time.time()
    # response_time = end_time - start_time
    # print("Tempo de resposta: {:.2f} segundos".format(response_time))
    return response

# Rota da API
@app.route('/simulation', methods=['GET'])
def sua_rota():
    global failure_count

    # Obtem o parâmetro da URL
    user_input = request.args.get('user_input', '')
     
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
