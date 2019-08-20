const express = require('express');

const server = express();

server.use(express.json());

const users= ['Felipe','Alberto','Liciane'];

server.use((req,res,next)=>{

    console.log(`Método: ${req.method}; URL: ${req.url}; `);

    return next();
})
//CRUD
function checkuser(req,res,next){
    if(!req.body.name){
        return res.status(400).json({erro:"user not found on request value"});
    }

    return next();
}

function checkuserindex(req,res,next){
    
    if(!users[req.params.index]){
        return res.status(400).json({erro:"posição não encontrada no vetor"})
    }
    return next();
}
//list users
server.get('/teste',(req,res)=>{
    return res.json(users);
})
//listar determinado user
server.get('/teste/:index',checkuserindex,(req,res)=>{

    //Route querys ?name=felipe&idade=10

    // const nome = req.query.name;
    // const idade = req.query.idade;
    // return res.json({nome_aluno:`${nome}`,idade_aluno:`${idade}`});

    //route params teste/:id

     const { index } = req.params;

     return res.json(users[index]);
})

server.post('/teste',checkuser,(req,res)=>{

    const { name }= req.body;
    
    users.push(name);
    
    return res.json(users);
})

server.put('/teste/:index',checkuser,checkuserindex,(req,res)=>{

    const { name }= req.body;
    const { index } = req.params;

    users[index] = name;

    return res.json(users)

})

server.delete('/teste/:index',checkuserindex,(req,res)=>{
    const { index } = req.params;

    users.splice(index,1);

    return res.send()
})
server.listen(3333);