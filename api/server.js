import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())
app.post('/usuarios', async (req, res) => {
    // console.log(req.body)

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    // res.send('ok post')
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    // res.json(users)
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
                name: req.query.name,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany() 
    }
    
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
    
    // console.log(req)

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete(
        {
            where:{
                id: req.params.id
            },

        }
    )

    res.status(200).json({ message: 'Usuario deletado com sucesso'})

})

app.listen(3000)


/*

    Tipo de rota / metodo 
    Endereço - caminho

*/

/*
    criar usuario
    listar usuario
    editar usuario 
    deletar user

    israel
    CPoFHhxpXrVnMfLO

    npx prisma db push
    npx prisma studio
*/