const User = require('../models/user')

module.exports.profile = async function(req, res){
    let user = await User.findById(req.params.id);
    res.render('profile', {
        title: "User Profile",
        profile_user: user
    });
}


module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('back');
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user = await User.findOne({email: req.body.email})

    if(user==null) {
        const newUser = new User(req.body);
        await newUser.save();
        console.log(newUser);
        return res.redirect('/users/sign-in')
    }
    else{
        console.log("user already exists");
        return res.redirect('back');
    }
    
    
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
    return res.redirect('/')
    }
);
}

