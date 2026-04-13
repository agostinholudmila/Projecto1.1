import fs from "fs";//
import express from "express";
import dotenv from "dotenv";// importando a biblioteca que ajuda na leitura das variaves de ambientes
dotenv.config();//carregar as variaveis
import logger from './logger.js';

const app=express();
app.use(express.json());

const PORT=process.env.PORT;

let livros = [];

try {
    livros = JSON.parse(fs.readFileSync("data.json", "utf-8"));
} catch (err) {
    livros = [];
}

let proximoId= 1;


app.get('/livros', (req, res) => {
    logger.info('pedido recebido na rota /livros')
    
    const livros = JSON.parse(fs.readFileSync("data.json"));
    
    res.json(livros)
});

app.get('/livros/:id', (req, res) => {
    const livro=livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) {
        return res.status(404).json({ erro: "não encontrado" });
    }
        logger.info('pedido recebido na rota /livros/:id')
        
        res.json(livro);
});


app.post('/livros', (req, res) => {

    // Lê o ficheiro data.json e transforma em array
    const livros = JSON.parse(fs.readFileSync("data.json"));

    // Cria um novo livro com os dados do Postman
    const novoLivro = {
        id: livros.length +1, // gera um id simples
        titulo: req.body.titulo,
        autor: req.body.autor
    };

    // Adiciona o novo livro ao array
    livros.push(novoLivro);

    // Guarda tudo de volta no ficheiro
    fs.writeFileSync("data.json", JSON.stringify(livros));

    // Responde para o Postman
    res.json(novoLivro);
});

app.put('/livros/:id', (req, res) => {

    // 1. lê os dados do ficheiro
    let livros = JSON.parse(fs.readFileSync("data.json"));

    const id = parseInt(req.params.id);

    // 2. procura o livro pelo id
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    // 3. atualiza todos os campos (substitui tudo)
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;

    // 4. grava novamente no ficheiro
    fs.writeFileSync("data.json", JSON.stringify(livros));

    logger.info('actualizado com sucesso');

    // 5. devolve o livro atualizado
    res.json(livro);
});

app.patch('/livros/:id', (req, res) => {

    // 1. lê os dados do ficheiro
    let livros = JSON.parse(fs.readFileSync("data.json"));

    const id = parseInt(req.params.id);

    // 2. procura o livro pelo id
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    // 3. atualiza só o que vier no body
    if (req.body.titulo) {
        livro.titulo = req.body.titulo;
    }

    if (req.body.autor) {
        livro.autor = req.body.autor;
    }

    // 4. grava no ficheiro
    fs.writeFileSync("data.json", JSON.stringify(livros));

    logger.info('actualizado com sucesso');

    // 5. devolve o livro atualizado
    res.json(livro);
});

app.delete('/livros/:id', (req, res) => {

    //ler ficheiro
    let livros = JSON.parse(fs.readFileSync("data.json"));

    const id = parseInt(req.params.id);

    //  procurar livro
    const index = livros.findIndex(livro => livro.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }
  //  remover
    livros.splice(index, 1);

    // guardar no ficheiro
    fs.writeFileSync("data.json", JSON.stringify(livros));

    logger.info('apagado com sucesso');

    res.json({ message: "Sucesso" });
});
app.listen(PORT, () => logger.info(`esta a rodar na porta ${PORT}`));
