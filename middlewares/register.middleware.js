module.exports.isRegistered = (req, res, next) => {
    const { email, password } = req.body;
    console.log('entro')

    const { image, description, age, height } = req.body

   if (req.user.role === 'Artist' && image && description && age && height) { // si es artist && no tiene ciertos campos, entonces entra. Si no, home.
       res.render('/home')
    } else if (req.user === 'Artist') {
        res.render('/profile-set')
    } else {
        res.render('/home')
    }
}
/*
module.exports.isNotRegister = (req, res, next) => {
    const { email, password } = req.body;
    if (req.user === 'hunter' || !email || !password) {
        res.render('/')
     } else if (req.user === 'Artist' || !email || !password) {
         res.render('/')
     }
}
*/