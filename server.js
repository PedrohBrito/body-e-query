// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";

const {bruxos, varinhas, animais, pocoes} = dados;


// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionandoooooo...");
});

// Get com filtros
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.get("/varinhas", (req, res) => {
  const { material, nucleo, comprimento } = req.query;
  let resultadoVarinha = varinhas;

  if (material) {
    resultadoVarinha = resultadoVarinha.filter(v => v.material.toLowerCase().includes(material.toLowerCase()));
  }

  if (nucleo) {
    resultadoVarinha = resultadoVarinha.filter(v => v.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
  }

  if (comprimento) {
    resultadoVarinha = resultadoVarinha.filter(v => v.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
  }

  res.status(200).json ({
  total: resultadoVarinha.length,
  data: resultadoVarinha
});
});


app.get("/pocoes", (req, res) => {
  const { nome, efeito } = req.query;
  let resultadoPocoes= pocoes;

  if (nome) {
    resultadoPocoes = resultadoPocoes.filter(p => p.pocoes.toLowerCase().includes(pocoes.toLowerCase()));
  }

  if (pocoes) {
    resultadoPocoes = resultadoPocoes.filter(p => p.efeito.toLowerCase().includes(efeito.toLowerCase()));
  }

  res.status(200).json ({
  total: resultadoPocoes.length,
  data: resultadoPocoes
});
});



// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});