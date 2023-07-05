const routes = (app) => {

    app.route("/")
    
    .get((req,res) => {
        
        res.send("This is the get method");
    })

    .post((req,res) => {

        res.send("This is the post method");
    })

    .delete((req,res) => {

        res.send("This is the delete method");
    })

    .put((req,res) => {

        res.send("This is the put method");
    })
}


module.exports = routes;