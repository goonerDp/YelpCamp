var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Clouds rest",
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel malesuada libero. Nunc at accumsan justo. Donec ultrices luctus tellus, et placerat neque. Cras eu vulputate massa, vitae accumsan eros. Aliquam erat volutpat. Integer sollicitudin bibendum turpis et posuere. Pellentesque nisl justo, maximus ac dignissim non, faucibus non mauris. Etiam eu aliquet urna, sed laoreet odio. Nulla facilisi.Quisque in bibendum lacus, at ultrices erat. Cras sed porttitor sapien. In porttitor viverra orci a tristique. Donec rhoncus egestas erat et pulvinar. Fusce sed varius ex. Aliquam id pulvinar sem. Nunc tristique dui dolor, nec rhoncus orci elementum vitae. Donec et nulla purus. Aenean facilisis tempor massa a vestibulum. Nunc euismod ante et ultrices imperdiet. Nunc vel leo tempor, tincidunt turpis a, interdum justo. Phasellus eros tellus, pulvinar ut metus efficitur, pharetra tempor tellus. Donec at tortor justo. Fusce eleifend consequat eleifend. Integer aliquet ligula semper odio facilisis, sed fringilla leo varius. Vivamus et turpis vel libero hendrerit ullamcorper.Sed placerat, sem quis tincidunt ornare, dolor lectus porta metus, non vehicula tellus ante at urna. Morbi rhoncus urna nec nisl hendrerit consequat. Ut hendrerit magna in bibendum dapibus. Pellentesque mollis tincidunt lorem sit amet semper. Cras interdum orci a enim sollicitudin consectetur. Vestibulum congue lorem risus, quis sollicitudin metus tempus et. Ut in ultrices nunc. Mauris volutpat convallis condimentum. Curabitur consequat eros facilisis ultricies porta. Nullam commodo dapibus congue."
        
    },
    {
        name: "Rock's table",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel malesuada libero. Nunc at accumsan justo. Donec ultrices luctus tellus, et placerat neque. Cras eu vulputate massa, vitae accumsan eros. Aliquam erat volutpat. Integer sollicitudin bibendum turpis et posuere. Pellentesque nisl justo, maximus ac dignissim non, faucibus non mauris. Etiam eu aliquet urna, sed laoreet odio. Nulla facilisi.Quisque in bibendum lacus, at ultrices erat. Cras sed porttitor sapien. In porttitor viverra orci a tristique. Donec rhoncus egestas erat et pulvinar. Fusce sed varius ex. Aliquam id pulvinar sem. Nunc tristique dui dolor, nec rhoncus orci elementum vitae. Donec et nulla purus. Aenean facilisis tempor massa a vestibulum. Nunc euismod ante et ultrices imperdiet. Nunc vel leo tempor, tincidunt turpis a, interdum justo. Phasellus eros tellus, pulvinar ut metus efficitur, pharetra tempor tellus. Donec at tortor justo. Fusce eleifend consequat eleifend. Integer aliquet ligula semper odio facilisis, sed fringilla leo varius. Vivamus et turpis vel libero hendrerit ullamcorper.Sed placerat, sem quis tincidunt ornare, dolor lectus porta metus, non vehicula tellus ante at urna. Morbi rhoncus urna nec nisl hendrerit consequat. Ut hendrerit magna in bibendum dapibus. Pellentesque mollis tincidunt lorem sit amet semper. Cras interdum orci a enim sollicitudin consectetur. Vestibulum congue lorem risus, quis sollicitudin metus tempus et. Ut in ultrices nunc. Mauris volutpat convallis condimentum. Curabitur consequat eros facilisis ultricies porta. Nullam commodo dapibus congue."
        
    },
    {
        name: "Dessert beach",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel malesuada libero. Nunc at accumsan justo. Donec ultrices luctus tellus, et placerat neque. Cras eu vulputate massa, vitae accumsan eros. Aliquam erat volutpat. Integer sollicitudin bibendum turpis et posuere. Pellentesque nisl justo, maximus ac dignissim non, faucibus non mauris. Etiam eu aliquet urna, sed laoreet odio. Nulla facilisi.Quisque in bibendum lacus, at ultrices erat. Cras sed porttitor sapien. In porttitor viverra orci a tristique. Donec rhoncus egestas erat et pulvinar. Fusce sed varius ex. Aliquam id pulvinar sem. Nunc tristique dui dolor, nec rhoncus orci elementum vitae. Donec et nulla purus. Aenean facilisis tempor massa a vestibulum. Nunc euismod ante et ultrices imperdiet. Nunc vel leo tempor, tincidunt turpis a, interdum justo. Phasellus eros tellus, pulvinar ut metus efficitur, pharetra tempor tellus. Donec at tortor justo. Fusce eleifend consequat eleifend. Integer aliquet ligula semper odio facilisis, sed fringilla leo varius. Vivamus et turpis vel libero hendrerit ullamcorper.Sed placerat, sem quis tincidunt ornare, dolor lectus porta metus, non vehicula tellus ante at urna. Morbi rhoncus urna nec nisl hendrerit consequat. Ut hendrerit magna in bibendum dapibus. Pellentesque mollis tincidunt lorem sit amet semper. Cras interdum orci a enim sollicitudin consectetur. Vestibulum congue lorem risus, quis sollicitudin metus tempus et. Ut in ultrices nunc. Mauris volutpat convallis condimentum. Curabitur consequat eros facilisis ultricies porta. Nullam commodo dapibus congue."
        
    }
];

function seedDB() {
// remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        
// add a few campgrounds
        data.forEach(function(seed) {
          Campground.create(seed, function(err, campground) {
              if(err) {
                  console.log(err);
              } else {
                  console.log("Added a campground!");
                  // create a comment
                  Comment.create(
                      {
                          text: "This place is great, but I wish there was Internet!",
                          author: "Homer"
                      }, function(err, comment) {
                          if (err) {
                              console.log(err);
                          } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a comment!");
                          }
                      });
              }
          }); 
        });
    });


}
module.exports = seedDB;