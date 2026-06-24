exports.homePage = async (req, res) => {
    if (!req.session.user) {
        return res.render('index', {
            titulo: 'Agenda'
        });
    }

    res.render('index', {
        titulo: 'Agenda'
    });
}