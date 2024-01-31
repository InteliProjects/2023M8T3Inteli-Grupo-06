from locust import HttpUser, task, between
import random
import string
import time

class MeuUsuario(HttpUser):
    wait_time = between(1, 3) # Espera entre 1 e 3 segundos entre as solicitações

    def on_start(self):
        # Adicionar função para esperar a estabilidade do sistema
        self.wait_until_stable()

    def wait_until_stable(self, max_attempts= 5):
        # lógica para esperar a estabilidade
        consecutive_success = 0

        while consecutive_success < max_attempts:
            response = self.client.get("/add_element")  
            if response.status_code == 200:
                consecutive_success += 1
            else:
                consecutive_success = 0
            
            # Aguarda 1 segundo antes da próxima verificação
            time.sleep(1)
    @task
    def add_element(self):
        dados_aleatorios = {
            "supplier_name": self.generate_random_string(10),
            "region": self.generate_random_string(10),
            "country_name": self.generate_random_string(10),
            "strategic_region": self.generate_random_string(10),
            "level_one": self.generate_random_string(10),
            "business_unit": self.generate_random_string(10),
            "legal_entity": self.generate_random_string(10),
            "cost_center_base": self.generate_random_string(10),
            "cost_center_four": self.generate_random_string(10),
            "cost_center_five": self.generate_random_string(10),
            "gl_four": self.generate_random_string(10),
            "gl_five": self.generate_random_string(10),
            "invoice_source": self.generate_random_string(10),
            "gl_description": self.generate_random_string(10),
            "amount_usd": random.uniform(35000, 50000)
        }

        # Realizando a requisição POST
        response_token = self.client.post("/token", json={})
        token_valido = response_token.json().get('access_token')
        headers = {"Authorization": f"Bearer {token_valido}"}
        self.client.post("/add_element", headers=headers,json=dados_aleatorios)
    
    def generate_random_string(self, length):
        return ''.join(random.choice(string.ascii_letters) for _ in range(length))
