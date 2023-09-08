const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3333
//Importar o módulo conn para as operações com o banco

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para arquivos estáticos
app.use(express.static('public'))

app.get('/', (request, response)=>{
  return response.render('home')
})

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
})


app.post('/cadastro', (request, reponse) =>{
    const {titulo, categoria, descricao, preco, quantidade} = request.body
    console.log(titulo, categoria, descricao, preco, quantidade)

    const sql = `INSERT INTO livros (titulo, categoria, descricao, preco, quantidade) VALUES ('${titulo}', '${categoria}', '${descricao}, ${preco}, ${quantidade})`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        response.redirect('/')
    })
});

app.get('/', (request, response)=>{
    const sql = 'SELECT * FROM livros'
    //query
    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const titulo = data
      
        return response.render('home', {titulo})
    })
    
})


app.get('/cadastro/:id', (request, response)=>{
    const id = request.params.id

    const sql = `SELECT * FROM livros WHERE id = ${id}`

    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const livros = data[0]
        console.log(livros)
        return response.render('cadastro', {livros})
    })
    
})

app.get('/cadastro/atualizar/:id',(request, response)=>{
    const id  = request.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const livros = data[0]
        console.log(livros)
        return response.render('home', {livros})
    })
})


app.post('/home/atualizar', (request, response)=>{
    const {titulo, categoria, descricao, preco, quantidade} = request.body

    const sql = `UPDATE books SET titulo='${titulo}',  = categoria'${ categoria}', = descricao '${descricao}, =  preco '${ preco}, = quantidade '${quantidade}'  WHERE id = ${id}`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        return response.redirect('/home')
    })
})


app.post('/livros/atualizar/:id', (request, response)=>{
    const id = request.params.id
    const sql = `DELETE FROM livros WHERE id = ${id}`

    conn.query(sql, (err)=>{
        if(err){
            console.log(err)
            return
        }
        return response.redirect('/home')
    })
})
