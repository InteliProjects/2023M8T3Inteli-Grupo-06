# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://github.com/2023M7T3-Inteli/Projeto3/blob/main/assets/imagens/Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# Projeto de Arquitetura de Software

## Grupo 6 - Metatesters

### 🚀 Integrantes
- <a href="https://www.linkedin.com/in/felipesilberberg/">Felipe Silberberg</a>
- <a href="https://www.linkedin.com/in/gabrielriostorres/">Gabriel Rios Torres</a>
- <a href="https://www.linkedin.com/in/mariana-silva-paula/">Mariana Silva de Paula</a>
- <a href="https://www.linkedin.com/in/raissa-sabino/">Raissa Sabino</a>
- <a href="https://www.linkedin.com/in/yveslevi/">Yves Lapa</a>
- <a href="https://www.linkedin.com/in/wagner-estevam/">Wagner Estevam</a>

## Sumário
* [Descrição ](#descricao)
* [Estrutura de pastas](#estrutura)
* [Instalação](#instalacao)
* [Histórico de Lançamentos](#historico)
* [Licença/license](#licenca)
* [Referências](#ref)
* [Documentação](#documentacao)

## 📜 Descrição
O objetivo do projeto é aprimorar a classificação taxonômica de compras da Meta, desenvolvendo uma solução avançada de arquitetura de software. Esta solução foi cuidadosamente elaborada para melhorar significativamente os requisitos não funcionais, como desempenho, disponibilidade e eficiência operacional, garantindo uma resposta mais ágil e confiável do sistema.

A taxonomia de compras anterior apresentava uma precisão de apenas 65%, uma margem que limitava a eficácia das estratégias de compras. Com a implementação da nova arquitetura, o projeto visa alcançar uma notável acurácia de 95% na classificação dos níveis de compra. Esse aumento na precisão não apenas aperfeiçoará o processo de categorização de compras, mas também proporcionará uma base mais sólida para decisões estratégicas e operacionais, impactando positivamente a gestão de recursos e a eficiência operacional da empresa.

## 📁 Estrutura de pastas

|--> Atual<br>
  &emsp;| --> src<br>
|--> Dcumentacao<br>
  &emsp;| --> assets <br>
  &emsp;| --> index.md <br>
|--> Novo<br>
  &emsp;|--> src <br>
|--> Simulacao<br>
  &emsp;|--> simulação atual<br>
  &emsp;|--> simulação novo<br>
|--> Taxonomia<br>
  &emsp;|--> taxonomia_via_pipeline.ipynb<br>
|--> app<br>
  &emsp;|--> backend<br>
  &emsp;|--> frontend<br>
| readme.md<br>

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>Atual</b>: aqui estão os arquivos relacionados ao sistema atual, como testes de requisitos e até simulação do sistema atual.

- <b>Documentação</b>: aqui estão todos os documentos do projeto. Há um arquivo "index.md" onde está a documentação, e "assets" onde estão todas as imagens usadas na documentação.

- <b>Novo</b>: aqui estão os arquivos relacionados ao sistema novo, como testes de requisitos, simulação e projeções para o novo sistema.
  
- <b>Simulação</b>: aqui estão os arquivos relacionados a parte de simulação do projeto, ela está dividida em 2 outros arquivos "simulação atual" e "simulação novo", e cada uma delas corresponde a simualação de uma parte, atual ou novo.

- <b>Taxonomia</b>: Todo o código fonte criado para o desenvolvimento do modelo de classificação de taxonomia do projeto.

- <b>app</b>: Todo o código fonte criado para o desenvolvimento do backend e frontend da aplicação está nessa pasta.
  
- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Instalação

* 1- Clonar o repositório em questão.
* 2- Baixar e instalar o node.js
* 3- Baixar e instalar react

* No modo administrador, abra o "prompt de comando" ou o "terminal" e, em seguida, abra a pasta "app/backend" no repositório clonado e digite o seguinte comando:
  
```
npm install
```
Isso instalará todas as dependências definidas no arquivo package.json que são necessárias para rodar o backend projeto. Depois só rodar o backend com o comando "npm run start"

* 4- Apra outro prompt e navegue até pasta "app/frontend"
* 5- Execute novamente o comando `npm install` <br>
Isso instalará todas as dependências definidas no arquivo package.json que são necessárias para rodar o frontend projeto.
* 6- Depois utilize o mesmo comando para rodar o front "npm run start" <br>
* 7- Abro arquivo .ipynb e execute todas as células do no google colab <br>

## 🗃 Histórico de lançamentos

* 0.0.0 
    * Template Inicial.
      
* 0.1.0 - 27/10/2023
    * Primeira versão
 
* 0.2.0 - 10/11/2023
    * Segunda versão
 
* 0.3.0 - 24/11/2023
    * Terceira versão
 
* 0.4.0 - 08/12/2023
    * Quarta versão
 
* 0.5.0 - 20/12/2023
    *  Quinta versão - final
      

## 📋 Licença/License

<a href="https://github.com/2023M8T3Inteli/Grupo-06">Metatesters</a> by <a href="https://www.inteli.edu.br/">Inteli</a>, <a href="https://www.linkedin.com/in/felipesilberberg/">Felipe Silberberg</a>, <a href="https://www.linkedin.com/in/gabrielriostorres/">Gabriel Rios Torres</a>, <a href="https://www.linkedin.com/in/mariana-silva-paula/">Mariana Silva de Paula</a>, <a href="https://www.linkedin.com/in/raissa-sabino/">Raissa Sabino</a>, <a href="https://www.linkedin.com/in/yveslevi/">Yves Lapa</a>, <a href="https://www.linkedin.com/in/wagner-estevam/">Wagner Estevam</a>is Licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Documentação Oficial do Python: https://docs.python.org/3/ Acesso em: out. 2023.

Documentação de node: Disponível em: https://nodejs.org/docs/latest/api/ . Acesso em: out. 2023.

Google Colab: Dísponivel em: https://colab.research.google.com/ Acesso em: nov. 2023

ADZLANI, Nasri. RabbitMQ on Docker and python. Disponível em: https://nasriadzlani.medium.com/rabbitmq-on-docker-and-python-300e449fcc8c. Acesso em: set. 2023.

PALLETS, Flask. API. Disponível em: https://flask.palletsprojects.com/en/3.0.x/api/. Acesso em: set. 2023.

Alguns textos foram baseados em pesquisas no ChatGPT. Disponível em: https://chat.openai.com/.

# Documentação

Os arquivos da documentação deste projeto estão na pasta: <a href="https://github.com/2023M8T3Inteli/Grupo-06/blob/main/Documentacao/Index.md">Documentação</a>, dentro do arquivo index.md.

