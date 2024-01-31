from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from datetime import datetime
import pandas as pd

# Configuração JWT
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

# Função para criar token
def create_jwt_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Função para decodificar token
def decode_jwt_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

# Dependência para obter o token de autenticação
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# DataFrame inicial vazio
df = pd.DataFrame(columns=['Supplier Name',
                           'Region', 'Country Name', 'Strategic Region', 'Level 1', 'Business Unit', 'Legal Entity', 'Cost Center Base',
                             'Cost Center (Level 4)',
                           'Cost Center (Level 5)', 'GL Desc (Level 4)',
                           'GL Desc (Level 5)','Invoice Source','GL Description',  'Amount (USD)'])

class DadosRequisicao(BaseModel):
    supplier_name: str
    country_name: str
    region: str
    strategic_region: str
    level_one: str
    business_unit: str
    legal_entity: str
    cost_center_base: str
    cost_center_four: str
    cost_center_five: str
    gl_four: str
    gl_five: str
    invoice_source: str
    gl_description: str
    amount_usd: float

app = FastAPI()

@app.get("/")
def checkPoint():
    return JSONResponse("working", status_code=200)

@app.post("/token")
async def access():
    token = create_jwt_token({"sub": "user@example.com"})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/add_element")
async def add_element(dados: DadosRequisicao, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:   
        payload = decode_jwt_token(token)
        # Simulação de dados da resposta da API
        resposta_api = {
            'Supplier Name': dados.supplier_name,
            'Region': dados.region,
            'Country Name': dados.country_name,
            'Strategic Region': dados.strategic_region,
            'Level 1': dados.level_one,
            'Business Unit': dados.business_unit,
            'Legal Entity': dados.legal_entity,
            'Cost Center Base': dados.cost_center_base,
            'Cost Center 4': dados.cost_center_four,
            'Cost Center 5': dados.cost_center_five,
            'GL Desc (Level 4)': dados.gl_four,
            'GL Desc (Level 5)': dados.gl_five,
            'Invoice Source': dados.invoice_source,
            'GL Description': dados.gl_description,
            'Amount (USD)': dados.amount_usd
        }

        # Adicionando os dados ao DataFrame
        global df
        df = df.append(resposta_api, ignore_index=True)

    except JWTError:
        raise credentials_exception

    return JSONResponse(content=resposta_api, status_code=201)