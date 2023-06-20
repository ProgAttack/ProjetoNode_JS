const express = require('express');
const app = express();
const Cama = require('./models/Cama')
const Hospede = require('./models/Hospede')
const Reserva = require('./models/Reserva')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')



// CONFIGURANDO TEMPLATE

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')



//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//CAMA
app.get('/cama', function(req, res){
    Cama.findAll().then(function(camas){//retorna todos os post que tem no banco de dados
        //console.log(posts)
        res.render('homecama', {camas: camas} ) //renderiza para "/" home
        //{cnpjcpf: 123456, nome: "Grupo"})
    }) 
    
})


//HOSPEDE
app.get('/hospede', function(req, res){
    Hospede.findAll().then(function(hospedes){//retorna todos os post que tem no banco de dados
        //console.log(posts)
        res.render('homehospede', {hospedes: hospedes} ) //renderiza para "/" home
        //{cnpjcpf: 123456, nome: "Grupo"})
    }) 
    
})

//RESERVA
app.get('/reserva', function(req, res){
    Reserva.findAll().then(function(reservas){//retorna todos os post que tem no banco de dados
        //console.log(posts)
        res.render('homereserva', {reservas: reservas} ) //renderiza para "/" home
        //{cnpjcpf: 123456, nome: "Grupo"})
    }) 
    
})



// ROTA CAMA
app.get('/cadastrocama', function(req, res){
    res.render('form_cama') // renderiza o html de cadastro - formulario
})


app.get('/cadastrohospede', function(req, res){
    res.render('form_hospede') // renderiza o html de cadastro - formulario
})

app.get('/cadastroreserva', function(req, res){
    res.render('form_reserva') // renderiza o html de cadastro - formulario
})

//ROTA DE RECEBE DADOS DO FORMULÁRIO
app.post('/addcama', function(req, res){    
    Cama.create({
        quantidade: req.body.quantidade        
    }).then(function(){
        res.redirect('/cama')       
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})

//ROTA DE RECEBE DADOS DO FORMULÁRIO
app.post('/addhospede', function(req, res){    
    Hospede.create({
        nomehospede: req.body.nomehospede,
        cpf: req.body.cpf        
    }).then(function(){
        res.redirect('/hospede')        
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})

app.post('/addreserva', function(req, res){    
    Reserva.create({
        dataentrada: req.body.dataentrada,
        datasaida: req.body.datasaida        
    }).then(function(){
        res.redirect('/reserva')        
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})


//DELETANDO DADOS DO BANCO E DA TABELA
app.get('/deletarcama/:id', function(req, res){
    Cama.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Deletado com sucesso")
    }).catch(function(erro){
        res.send("Dado não existe")
    })
})

//DELETANDO DADOS DO BANCO E DA TABELA
app.get('/deletarhospede/:id', function(req, res){
    Hospede.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Deletado com sucesso")
    }).catch(function(erro){
        res.send("Dado não existe")
    })
})

//DELETANDO DADOS DO BANCO E DA TABELA
app.get('/deletarreserva/:id', function(req, res){
    Reserva.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Deletado com sucesso")
    }).catch(function(erro){
        res.send("Dado não existe")
    })
})

//EDITANDO DADOS DA TABELA  CAMA
app.get('/edit/:id', function(req, res){
    Cama.findByPk(req.params.id)
      .then(post => {
        res.render('form-edit-cama', {
            id: req.params.id,
            quantidade: req.params.quantidade
        })
      })
      .catch(err => {
        res.send('Post não encontrado!')
      })
  })
  app.post('/editado/:id', function(req, res){
    Cama.update({
        
      quantidade: req.body.quantidade
  
    },
    {
      where: { id: req.params.id }
    }).then(function(){
      res.redirect('/cama')
    }).catch(function(err){
      console.log(err);
    })
  })


  //EDITANDO DADOS DA TABELA HOSPEDE
app.get('/edithospede/:id', function(req, res){
    Hospede.findByPk(req.params.id)
      .then(post => {
        res.render('form-edit-hospede', {
            id: req.params.id,
            nomehospede: req.params.nomehospede,
            cpf: req.params.cpf
        })
      })
      .catch(err => {
        res.send('Post não encontrado!')
      })
  })
  app.post('/editadohospede/:id', function(req, res){
    Hospede.update({
        
        nomehospede: req.body.nomehospede,
        cpf: req.body.cpf

  
    },
    {
      where: { id: req.params.id }
    }).then(function(){
      res.redirect('/hospede')
    }).catch(function(err){
      console.log(err);
    })
  })


  //EDITANDO DADOS DA TABELA RESERVA
app.get('/editreserva/:id', function(req, res){
    Reserva.findByPk(req.params.id)
      .then(post => {
        res.render('form-edit-reserva', {
            id: req.params.id,
            dataentrada: req.params.dataentrada,
            datasaida: req.params.datasaida
        })
      })
      .catch(err => {
        res.send('Post não encontrado!')
      })
  })
  app.post('/editadoreserva/:id', function(req, res){
    Reserva.update({
        
        dataentrada: req.body.dataentrada,
        datasaida: req.body.datasaida

  
    },
    {
      where: { id: req.params.id }
    }).then(function(){
      res.redirect('/reserva')
    }).catch(function(err){
      console.log(err);
    })
  })






app.listen(8080, function(){
    console.log("Servidor rodando na url http://localhost:8080");
});


