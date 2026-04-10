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
    const livro=livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) {
        return res.status(404).json({ erro: "não encontrado" });
    }
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
    const id = parseInt(req.params.id);
    const livro =livros.find(l => l.id===id);//procurar o id

    if (livro){ 
        livro.titulo=req.body.titulo;
        livro.autor=req.body.autor;

        logger.info('Actualizado com sucesso');
        return res.json(livro);
    }
    res.status(404).json({ erro: "Livro não encontrado" });
    
});

app.patch('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id===id);//procurar o id

    if (!livro){
        return res.status(404).json({ erro: "Livro não encontrado" });
    }
        
    if(req.body.titulo) {
        livro.titulo=req.body.titulo;
    }
    
    if(req.body.autor){
        livro.autor=req.body.autor;
    }
        logger.info('Actualizado com sucesso');
        res.json(livro);
   
});

app.delete('/livros/:id',(req,res) => {
    const id= parseInt(req.params.id);

    const index = livros.findIndex(livro => livro.id === id);

     if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    livros.splice(index, 1);

    logger.info('apagado com sucesso');
    
    res.json({message: "Sucesso"});
});
app.listen(PORT, () => logger.info(`esta a rodar na porta ${PORT}`));
