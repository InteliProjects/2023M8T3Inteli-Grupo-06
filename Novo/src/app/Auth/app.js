/* Imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response
app.use(express.json())

//Models
const User = require('./models/User')



//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' })
})

// Private Route
app.get('/user/:id', checkToken, async (req, res) => {

    const id = req.params.id

    //Check if user exists
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]  
    
    if (!token) {
        return res.status(401).json({msg: 'Acesso negado!'})
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
        
    } catch(error) {
        return res.status(401).json({msg: 'Token inválido!'})

    }

}

//Register User
app.post('/auth/register', async (req, res) => {

    const {name, email, password, confirmpassword} = req.body

    //validations
    if(!name) {
        res.status(422).json({msg: 'O nome é obrigatório!'})
    }

    if(!email) {
        res.status(422).json({msg: 'O email é obrigatório!'})
    }

    if(!password) {
        res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    if (password !== confirmpassword) {
        res.status(422).json({msg: 'As senhas não conferem!'})
    }

    //Check if user exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(422).json({msg: 'Por favor, utilize outro e-mail!'})
    }

    //Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({msg: 'Usuário criado com sucesso!'})
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: "Aconteceu um erro no servidor, por favor tente novamente mais tarde!",
        })
    }

})

//Login User
app.post('/auth/login', async (req, res) => {

    const {email, password} = req.body

  //Validations
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' })
  }

  //Check if user exists
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(422).json({msg: 'Usuário não encontrado!'})
  }
  
  // Check if password is valid
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({msg: 'Senha inválida!'})
  }

  try {

    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({msg: "Autenticação realizada com sucesso!", token})

  } catch(err) {
    console.log(error)
        
    res.status(500).json({
      msg: "Aconteceu um erro no servidor, por favor tente novamente mais tarde!",
    })
  }
        
})


//Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect('mongodb+srv://wagnerestevam:ibqKzn4nQ6Hyoy5e@cluster0.up74khy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    app.listen(3000)
    console.log('Conectou ao banco!')
  })
  .catch((err) => console.log(err))

