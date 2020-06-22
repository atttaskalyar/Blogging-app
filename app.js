//dependencies
var express = require("express");
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");
var app = express();

//blog has a title, image ,body and a date
//appcon figure
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//mongoose/model/config
var blogSchema=new mongoose.Schema({
    title: String,
    image:String,//have to add new place holder image
    body: String,
    created: {type: Date, default:Date.now}});



var Blog = mongoose.model("Blog" ,blogSchema);

/*Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1587613991394-51450cb21333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    body: "this is a test blog that has no purpose actually"
}, function (error, blog) {
if(error){
    console.log(error);
}
else{
    console.log("saved the object with name " + blog.title );
}
}
); */




//RESTful routes

app.get("/",function(req,res){
    res.redirect("/blogs");
});


//INDEX  path-/blogs
app.get("/blogs", function(req,res){
    Blog.find({},function(err,blogs){
        res.render("index",{blogs:blogs});
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
})





app.listen("3000",process.env.IP,function(){
    console.log("server is running");
});