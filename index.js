var express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


mongoose.connect('mongodb://127.0.0.1/crmData', {
    useNewUrlParser: true
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const blogSchema = require('./src/model/crmModel');
const blogModel = mongoose.model("Blog", blogSchema);


app.use(express.static('public'));


//POST new blog
app.post('/newBlog', (req,res) => {

    let blog = new blogModel(req.body);

    blog.save()
    .then(blogModel =>{

        res.json(blog);
    })
    .catch(err => res.send(err));
})

//GET all blogs

const getAllBlogs = (req, res) => {

    blogModel.find({}).then( blogs => {
        res.json(blogs);
    })
    .catch(err => {
        res.send(err);
    })
}

app.get("/getBlogs", getAllBlogs);


//GET blog by param 
const getBlogByID = (req,res) => 
{
    blogModel.findById(req.params.blogId)
    .then( blog => {
        res.json(blog);
    })
    .catch(err => {
        res.send(err);
    })
}

app.get('/blog/:blogId', getBlogByID);


//PUT update blog
const updateBlog = (req,res)=>{

    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true})

    .then(updatedBlog => {
        res.json(updatedBlog);
    })

    .catch(err => {
        res.send(err);
    })
}

app.put('/blog/:blogId', updateBlog);



//Delete blog by param

const deleteBlog = (req,res) => {
    blogModel.findOneAndDelete({_id: req.params.blogId})

    .then( () => {
        res.json({message: "Success!!"});
    })

    .catch( err => {
        res.send(err);
    })
}

app.delete('/blog/:blogId', deleteBlog);



// Server
app.listen(PORT, () =>{
    console.log(`Your server is running on port: ${PORT}`)
});