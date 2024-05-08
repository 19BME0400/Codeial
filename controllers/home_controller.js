const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    let allUsers = await User.find({})
    return res.render('home', {
        title: "Codeial | Home",
        posts: posts,
        all_users: allUsers
    });
    } catch(err) {
        console.log('Error', err);
        return;
    }
    // populate the user of each post
    
}

// module.exports.actionName = function(req, res){}