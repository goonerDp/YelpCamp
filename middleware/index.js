// all the middleware goes here
var middlewareObj = {};
var Comment = require("../models/comment");
var Campground = require("../models/campground");

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
        //does comment is created by loged in user?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground is not found!");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};
    

middlewareObj.isLoggedIN = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!"); //configurate flash message in case of error
    res.redirect("/login");
};

module.exports = middlewareObj;