const Contact = require('../models/Contact')

// Pagina de contatos
exports.contactPage = async (req, res) => {
    const contacts = await Contact.find({
        userId: req.session.user.id
    })

    res.render('contatos', {
        titulo: 'Meus Contatos',
        contacts
    })
}

// Rota da página de criação de contato
exports.createContactPage = async (req, res) => {
    res.render('createContact', {
        titulo: 'Novo Contato'
    })
}

// Rota de criação de um novo contato
exports.createContact = async (req, res) => {
    const { nome, telefone, email } = req.body

    const errors = []

    if(!nome) errors.push('Você precisa inserir um nome')
    if(!telefone) error.push('Você precisa inserir um telefone')

    if(errors.length > 0) {
        return res.redirect('/contacts/create', {
            error: errors
        })
    } else {
        await Contact.create({
            nome,
            telefone,
            email,
            userId: req.session.user.id
        });

        req.flash('success_msg', 'Contato criado com Sucesso!')
        res.redirect('/contacts')
    }
}

// Rota de exclusão de contato
exports.deleteContact = async (req, res) => {

    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        req.flash('error_msg', 'Contato não encontrado')
        return res.redirect('/contacts')
    }

    if(contact.userId.toString() !== req.session.user.id) {
        req.flash('error_msg', 'Acesso Negado!')
        return res.redirect('/contacts')
    }

    await contact.deleteOne()

    req.flash('success_msg', 'Contato excluído com sucesso!')
    res.redirect('/contacts')
}

// Página de edição de contatos
exports.editContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        req.flash('error_msg', 'Contato não encontrado.');
        return res.redirect('/contacts');
    }

    if (contact.userId.toString() !== req.session.user.id) {
        req.flash('error_msg', 'Acesso negado');
        return res.redirect('/contacts');
    }

    res.render('editContact', {
        titulo: 'Editar Contato',
        contact
    });
}

// Rota de Salvar a edição dos contatos
exports.saveContact = async (req, res) => {
    const { nome, telefone, email } = req.body

    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        req.flash('error_msg', 'Contato não encontrado')
        return res.redirect('/contacts')
    }

    if(contact.userId.toString() !== req.session.user.id) {
        req.flash('error_msg', 'Acesso negado');
        return res.redirect('/contacts')
    }

    contact.nome = nome
    contact.email = email
    contact.telefone = telefone
    
    await contact.save()

    req.flash('success_msg', 'Contato atualizado com sucesso')
    res.redirect('/contacts');
}