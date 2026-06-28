const User = require('../models/User')

exports.loginRequired = async (req, res, next) => {

    if(!req.session.user) {
        req.flash('error_msg', 'Você precisa estar logado')
        return res.redirect('/login')
    }

    next()
}