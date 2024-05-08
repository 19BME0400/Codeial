const Comment = require('../models/comment');
const Post = require('../models/post'); 

module.exports.create = async function(req, res) {
    let post = await Post.findById(req.body.post);
    if(post) {
        let com = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        post.comments.push(com);
        post.save();

        res.redirect('/');
    }
}

module.exports.destroy = async function(req, res){
    console.log('heelo');
    const comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id) {
        let post_id = comment.post;

        await Comment.findByIdAndDelete(req.params.id);

        Post.findByIdAndUpdate(post_id, {$pull: {comments: req.params.id}})
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}