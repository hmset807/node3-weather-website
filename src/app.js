const path = require("path");
const express =require("express");
const hbs = require("hbs");
const geocode =require("./utils/geocode")
const forecast =require("./utils/forecast");


const app= express();
const port = process.env.PORT || 3000;


//Define paths fro Express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewPath =path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req,res) =>{
    res.render("index", {
        title: "Weather",
        name: "Seto ho man"
    })
})

app.get("/about", (req,res) =>{
    res.render("about", {
        title: "About me",
        name: "Seto ho man"
    })
})

app.get("/help", (req,res) =>{
    res.render("help", {
        helpText:"This is some helpful text.",
        name: "Seto ho man",
        title: `Ask ${this.name} for help`
    })
})


app.get("/help/*", (req, res) =>{
    res.render("failure",{
        title: "help article not found ",
        name: "Seto ho man "
    })
})

app.get("/weather", (req,res) =>{
    const {address} = req.query
    if(!address){
        return res.send({
            error: "Please enter the address"
        })
    }
    geocode(address,(error, {latitude, longitude, location}={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: address
            })
            
          })
    })
    
})

app.get("/products", (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: req.query.search
    })
});

app.get("*", (req, res) =>{
    res.render("failure",{
        title: "Page not found ",
        name: "Seto ho man "
    })
})


//app.com 
//app.com/help
//app.com/about


app.listen(port, () =>{
    console.log(`the server is up on port ${port}`)
})

