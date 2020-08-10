const User = require('../database/models/User')

module.exports = (req, res, next) => {
    // fetch user from database
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            req.flash("fail", "Please login to get access.")
            return res.redirect('/')
        }
        next()
    });
};