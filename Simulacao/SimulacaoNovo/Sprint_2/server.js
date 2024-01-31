import express , { json } from 'express';
import axios from 'axios';
import CircuitBreaker from 'opossum';

const app = express();
const port = 3000;

app.use(json());

const circuitBreakerOptions = {
  failureThreshold: 3, // Abra o circuito após 3 falhas
  successThreshold: 1, // Feche o circuito após 1 sucesso
  timeout: 10000, // Tempo para o circuito ir para o meio-aberto (10 segundos)
  resetTimeout: 5000, // Tempo em que o circuito deve tentar se reabrir após abrir (5 segundos)
};

const circuit = new CircuitBreaker(requestToThirdPartyAPI, circuitBreakerOptions);

async function requestToThirdPartyAPI() {
    const response = await axios.post('http://fdd0-34-148-177-222.ngrok.io/simulate', { purchase: 10000 });
    return response.data;
  }

// Rota para fazer uma requisição à sua API terceira com circuit breaker
app.get('/simulate', async (req, res) => {
  try {
    const result = await circuit.fire();

    if (result === 'Categorização correta') {
      consecutiveFailures = 0; // Resetar contador de falhas em caso de sucesso
      return res.status(200).json({ message: result });
    } else {
      consecutiveFailures++;
      if (consecutiveFailures >= maxConsecutiveFailures) {
        circuit.open();
      }
      return res.status(500).json({ error: 'Categorização incorreta' });
    }
  } catch (error) {
    if (circuit.status === 'open') {
      return res.status(503).json({ error: 'Circuito aberto' });
    } else {
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
});


// Rota para resetar o circuit breaker (apenas para fins de teste)
app.get('/reset', (req, res) => {
  circuit.open(); // Força o circuito a entrar no estado meio-aberto
  res.json({ message: 'Circuito resetado para o estado meio-aberto' });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});