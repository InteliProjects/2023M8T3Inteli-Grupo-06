import requests
import time
from datetime import datetime

def testar_disponibilidade(url):
    try:
        inicio = time.time()  # Registra o tempo antes da solicitação
        response = requests.get(url)
        response.raise_for_status()  # Lança uma exceção se a resposta indicar erro
        fim = time.time()  # Registra o tempo após a solicitação
        tempo_resposta = fim - inicio  # Calcula o tempo de resposta em segundos
        return True, response.status_code, tempo_resposta
    except requests.exceptions.RequestException as e:
        return False, str(e), None

# Substitua a URL pela URL real da sua aplicação
url_da_aplicacao = "http://localhost:8000"

# Cria um arquivo de log para armazenar os resultados ao longo do tempo
with open("log_disponibilidade.txt", "a") as log_file:
    # Testa a disponibilidade a cada 10 segundos 
    # Testa o tempo de resposta
    while True:
        disponivel, detalhes, tempo_resposta = testar_disponibilidade(url_da_aplicacao)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        if disponivel:
            mensagem = f"{timestamp} - A aplicação está disponível. Código de status: {detalhes}. Tempo de resposta: {tempo_resposta:.4f} segundos\n"
        else:
            mensagem = f"{timestamp} - A aplicação não está disponível. Erro: {detalhes}\n"

        print(mensagem)
        log_file.write(mensagem)

        time.sleep(10)
