const express = require('express');
const route = express.Router();
const { homePage } = require('./controllers/homeController')
const { loginPage, registerPage, userRegister, userLogin, verifyEmail, verifyEmailPage, logOut } = require('./controllers/userController')
const { loginRequired } = require('./middleware/loginRequired')
const { contactPage, createContactPage, createContact, deleteContact, editContact } = require('./controllers/contactController')

// Pagina Inicial
route.get('/', homePage)

// Rotas de Usuário
    // Pagina de Login
    route.get('/login', loginPage)

    // Página de validação de Login
    route.post('/login/verify', userLogin)

    // Pagina de Cadastro
    route.get('/register', registerPage)

    // Pagina de Validação de cadastro
    route.post('/register/verify', userRegister)

    // Página de Validação de E-Mail
    route.get('/verifyEmailPage', loginRequired, verifyEmailPage)

    // Validação do E-Mail
    route.post('/verify-email', loginRequired, verifyEmail)

    // Rota de Logout
    route.get('/logout', loginRequired, logOut)


// Rotas de Contatos
    // Pagina de Contatos
    route.get('/contacts', loginRequired, contactPage)

    // Pagina de criação de um novo contato
    route.get('/contacts/create', loginRequired, createContactPage)

    // Rota de criação de contato
    route.post('/contacts/create', loginRequired, createContact)

    //Rota de Exclusão de contato
    route.get('/contacts/delete/:id', loginRequired, deleteContact)

    // Página de edição de contato
    route.get('/contacts/edit/:id', loginRequired, editContact)


module.exports = route