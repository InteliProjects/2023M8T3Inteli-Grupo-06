from locust import HttpUser, task, between
import random
import string

class MyUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def test_autenticacao_correta(self):
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
        response_token = self.client.post("/token", json=dados_aleatorios)
        token_valido = response_token.json().get('access_token')
        headers = {"Authorization": f"Bearer {token_valido}"}
        self.client.post("/add_element", headers=headers, json=dados_aleatorios)

    @task
    def test_autenticacao_incorreta(self):
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
        headers = {"Authorization": "Bearer token_invalido"}
        self.client.post("/add_element", headers=headers, json=dados_aleatorios)
        
    def generate_random_string(self, length):
        return ''.join(random.choice(string.ascii_letters) for _ in range(length))


