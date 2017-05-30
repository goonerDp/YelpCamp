var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
// requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp"); //create LOCAL yelp_camp DB and connect to it
mongoose.connect("mongodb://goonerDp:hfdDFs83fdsf@ds157621.mlab.com:57621/yelpcamp")

app.set("view engine", "ejs");
app.use(methodOverride("_method")); // for adding PUT & DELETE methods
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // plug in custom styles and scripts
//seedDB(); //create campgrounds and comments
app.use(flash()); // flash messages

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Murchik is the best cat ever!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
   res.locals.currentUser = req.user; //create 'currentUser' var and pass it to all files
   res.locals.error = req.flash("error"); //plug in flash messages on every page
   res.locals.success = req.flash("success");
   next();
});

//plugin routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// server configuration
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The server is running..."); 
});     