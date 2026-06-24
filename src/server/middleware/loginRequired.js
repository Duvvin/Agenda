exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('error_msg', 'Você precisa estar logado para acessar esta funcionalidade')
        return res.redirect('/login')
    }

    next()
}