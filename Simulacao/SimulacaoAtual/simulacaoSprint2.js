const express = require('express');
const CircuitBreaker = require('opossum');

const app = express();

// Função de exemplo para simular a categorização
function simulation() {
  // Simule uma categorização correta ou incorreta
  const categorization = Math.random(); // 80% de chance de ser correta

  if (categorization > 0.65) {
    // Retorna um valor específico para indicar falha
    return 'Falha na categorização';
  } else {
    return 'Categorização correta';
  }
}

// Configurações do circuit breaker
const circuit = new CircuitBreaker(simulation, {
  timeout: 1000,
  resetTimeout: 5000,
});

let consecutiveFailures = 0;
const maxConsecutiveFailures = 3;

// Rota da API
app.get('/sua-rota', async (req, res) => {
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

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
