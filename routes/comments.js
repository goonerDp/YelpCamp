var express = require("express");
var router = express.Router(({mergeParams: true}));
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // index file is grabed automatiacaly


//  NEW
router.get("/new", middleware.isLoggedIN, function(req, res) {
    // find campground by ID
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
    
});

//  CREATE
router.post("/", middleware.isLoggedIN, function(req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           //create new comment
           Comment.create(req.body.comment, function(err, comment) {
              if(err) {
                  console.log(err);
                  req.flash("error", "Something went wrong...");
              } else {
                  // add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  // save comment
                  comment.save();
                  //connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  //redirect to show page
                  req.flash("success", "Successfully added comment...");
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       }
    });
});


// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

// UPDATE
 router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
     // find and update the correct comment
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id)
       }
   });
 });

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   //find by id and remove
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           res.redirect("/campgrounds/"+ req.params.id);
       } else {
           req.flash("success", "Comment is deleted...");
           res.redirect("/campgrounds/"+ req.params.id);
       }
    });
});


module.exports = router;