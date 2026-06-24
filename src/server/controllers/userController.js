const validator = require('validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const nodemailer = require('nodemailer')

// Transporter NodeMailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_BUSINESS,
        pass: process.env.PASS_BUSINESS
    }
});

async function sendCode(email, codigo) {
    await transporter.sendMail({
        from: process.env.EMAIL_BUSINESS,
        to: email,
        subject: 'Código de verificação Agenda',
        text: `Seu código é: ${codigo}`
    })
};

function genCode() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// Página de Login
exports.loginPage = (req, res) => {
    res.render('login', {
        titulo: 'Login'
    })
};

// Página de Cadastro
exports.registerPage = (req, res) => {
    res.render('register', {
        titulo: 'Registre-se'
    })
};

// Cadastro de Usuário
exports.userRegister = async (req, res) => {
    console.log('Entrou na rota de validação de registro')
    const { nome, email, senha, confirmarSenha } = req.body;
    const errors = [];

    if(!nome) errors.push('Você precisa inserir um nome')
    if(!email) errors.push('Você precisa inserir um email')
    if(!senha) errors.push('Você precisa inserir uma senha')

    if(nome.length < 3 || nome.length > 15) errors.push('Seu nome precisa ter entre 3 e 15 caracteres')
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('E-mail inválido');
    }
    
    if(!validator.isStrongPassword(senha, {
        minLength: 8,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) errors.push('A senha precisa conter 8 caracteres, letras maiúsculas e minusculas')

    if(senha !== confirmarSenha) errors.push('As senhas não côincidem')

    if(errors.length > 0) {
        console.log('Apresentou erros no cadatro, que deveriam aparecer na tela')
        return res.render('register', {
            errors,
            titulo: 'Registre-se'
        })
    } else {
        User.findOne({email: email}).then((user) => {
            if(user) {
                console.log('já existe um usuario com esse email')
                req.flash('error_msg', 'Já existe um usuário com esse email, tente outro')
                res.redirect("/register")
            } else {
                const codigo = genCode();
                sendCode(email, codigo)
                const newUser = new User({
                    name: nome,
                    email: email,
                    password: senha,
                    codigo: codigo,
                    ativo: false
                })

                bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(newUser.password, salt, (erro, hash) => {
                            if(erro) {
                                req.flash('error_msg', "Houve um erro ao salvar o usuário")
                                console.log(erro)
                                return res.redirect('/register')
                            }
                            newUser.password = hash

                            newUser.save().then((savedUser) => {
                                req.session.userIdVerificacao = savedUser._id
                                console.log('Id Usuario' + savedUser._id)
                                console.log('ID Salvo:' + req.session.userIdVerificacao)
                                return res.redirect('/verifyEmailPage')
                            })
                        })
                })
            }
        }).catch((e) => {
            req.flash("error_msg", 'Ocorreu um erro interno, pedimos desculpas.')
            res.redirect('/register')
        })
    }
}

exports.verifyEmailPage = async (req, res) => {
    res.render('verificarEmail', {
        titulo: 'Verificar Email'
    })
}

// Validar acesso ao E-mail
exports.verifyEmail = async (req, res) => {
    const { codigo } = req.body

    const user = await User.findById(
        req.session.userIdVerificacao
    );

    if(!user) {
        req.flash('error_msg', 'Usuário não encontrado')
        return res.redirect('/register')
    }

    if (user.codigo !== codigo) {
        req.flash('error_msg', 'Código inválido')
        return res.redirect('verificarEmail')
    }

    user.active = true
    user.codigo = null

    await user.save();

    delete req.session.userIdVerificacao;

    req.flash('success_msg', 'Email validado!')
    res.redirect('/login')
}

// Login de Usuário

exports.userLogin = async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ email })

    if(!user) {
        req.flash('error_msg', 'Usuario não encontrado');
        return res.redirect('/login')
    }

    const passwordValid = await bcrypt.compare(
        senha,
        user.password
    )

    if(!passwordValid) {
        req.flash('error_msg', 'Senha incorreta')
        return res.redirect('/login')
    }

    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    console.log('Usuario salvo na sessão: ')
    console.log(req.session.user)

    req.flash('success_msg', 'Login realizado com sucesso!')
    return res.redirect('/')
}

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)

            req.flash('error_msg', 'Erro ao encerrar sessão')

            res.redirect('/');
        }

        res.redirect('/login')
    })
}