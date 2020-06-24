const expressSanitizer = require("express-sanitizer");

var bodyParser = require("body-parser"),	
mongoose       = require("mongoose"),	
express        = require("express"),	
app            = express();	
methodOveride  = require("method-override");
exprsssSanitizer=require("express-sanitizer");
// APP CONFIG	
mongoose.connect("mongodb://localhost/restful_blog_app");	
app.set("view engine", "ejs");	
app.use(express.static("public"));	
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());	
app.use(methodOveride("_method"));
// MONGOOSE/MODEL CONFIG	
var blogSchema = new mongoose.Schema({	
    title: String,	
    image: String,	
    body: String,	
    created: {type: Date, default: Date.now}	
});	
var Blog = mongoose.model("Blog", blogSchema);	
// RESTFUL ROUTES	
app.get("/", function(req, res){	
   res.redirect("/blogs"); 	
});	
// INDEX ROUTE	
app.get("/blogs", function(req, res){	
   Blog.find({}, function(err, blogs){	
       if(err){	
           console.log("ERROR!");	
       } else {	
          res.render("index", {blogs: blogs}); 	
       }	
   });	
});	
// NEW ROUTE	
app.get("/blogs/new", function(req, res){	
    res.render("new");	
});	
// CREATE ROUTE	
app.post("/blogs", function(req, res){	
    // create blog	
    console.log(req.body);
    req.body.blog.body=req.sanitize(req.body.blog.body);
    console.log(req.body);	
    console.log("===========")	
    console.log(req.body);	
    Blog.create(req.body.blog, function(err, newBlog){	
        if(err){	
            res.render("new");	
        } else {	
            //then, redirect to the index	
            res.redirect("/blogs");	
        }	
    });	
});	
// SHOW ROUTE
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(error,foundBlog){
        if(error){
            console.log(error);
            res.redirect("/blogs");
        }
        else{
            res.render("show",{blog:foundBlog});
        }
    });
    
})


//EDIT ROUTE

app.get("/blogs/:id/edit",function(req,res){
    //find the blog in the database
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit",{blog:foundBlog});
        }
    })

});


//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    req.body.blog.body(req.sanitize.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            console.log("Updated Blog");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,deletedBlog){
       if(err){
            res.redirect("/blogs/"+req.params.id);
            console.log("error");
        }
        else{
            console.log("deleted the post");
            res.redirect("/blogs");
        }
    })

});





app.listen("3000", process.env.IP, function(){	
    console.log("SERVER IS RUNNING!");	
});