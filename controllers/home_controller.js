const Post = require('../models/post');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    
    // populate the user of each post
    let posts = await Post.find({}).populate('user').exec()
    return res.render('home', {
        title: "Codeial | Home",
        posts: posts
    });
}

// module.exports.actionName = function(req, res){}