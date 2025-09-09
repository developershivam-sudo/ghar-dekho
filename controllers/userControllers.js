const User = require("../models/user.js");

// display signup form
module.exports.renderSignUpForm = async (req, res) => {
    res.render("./users/signup.ejs");
};

// add new user to DB
module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });

        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {    // auto login after signup
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to GharExpress");
            res.redirect(res.locals.redirectUrlAfterLogin || "/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};

// display login form
module.exports.renderLoginForm = async (req, res) => {
    res.render("./users/login.ejs");
};

// verify user and login to website
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to GharExpress");
    res.redirect(res.locals.redirectUrlAfterLogin || "/listings" );
};

// logout by ending the current session / dedeserializeUser
module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout Successful");
        res.redirect("/listings");
    })
};