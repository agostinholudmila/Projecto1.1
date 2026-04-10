import express from "express";
import dotenv from "dotenv";// importando a biblioteca que ajuda na leitura das variaves de ambientes
dotenv.config();//carregar as variaveis
import logger from './logger.js';

const app=express();
app.use(express.json());

const PORT=process.env.PORT;
const livros=[];
let proximoId= 1;


app.get('/livros', (req, res) => {
    logger.info('pedido recebido na rota /livros')
    
    res.json(livros)
});

app.get('/livros/:id', (req, res) => {
    const livro=livros[req.params.id -1];
    if (!livro) {
        return res.status(404).json({ erro: "não encontrado" });}
        logger.info('pedido recebido na rota /livros/:id')
        
        res.json(livro);
});


app.post('/livros' , (req, res) => {
    const livro = {
        id:proximoId++,
        titulo:req.body.titulo,
        autor:req.body.autor
    };
    livros.push(livro);

    logger.info('criado na /livros')
    
    res.status(201).json(livro);
});

app.put('/livros/:id',(req, res) => {
    const livro =req.body;//receber livro no body
    const id=parseInt(req.params.id);
    livros.splice(id, 1, livro);
    logger.info('Actualizado com sucesso');
    res.json({message: "Sucesso"});
});

app.patch('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const atualizacoes = req.body;
    livros[id] = { ...livros[id], ...atualizacoes };
    logger.info('Actualizado parcialmente com sucesso');
    res.json(livros[id]);
});

app.delete('/livros/:id',(req,res) => {
    const id=req.params.id;
    livros.splice(id, 1);
    logger.info('apagado com sucesso');
    res.json({message: "Sucesso"});
});
app.listen(PORT, () => logger.info(`esta a rodar na porta ${PORT}`));
