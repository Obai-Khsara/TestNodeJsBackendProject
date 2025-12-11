const express = require("express");
const mongoose = require("mongoose")



const Article = require("./models/Article")
//mongodb+srv://mongodb+srv://obai:obai1998@myfirstnodejscluster.arlzgyc.mongodb.net/?appName=MyFirstNodeJsCluster
mongoose.connect("mongodb+srv://obai:obai1998@myfirstnodejscluster.arlzgyc.mongodb.net/?appName=MyFirstNodeJsCluster").then(()=>{
    console.log("Connected Successfully")
})
.catch((error)=>{
    console.log("Connected Failed",error)
})


const app = express()
app.use(express.json())




app.get("/",(req,res)=>{
    res.send("You visited root Endpoint")
})

app.get("/hello",(req,res)=>{
    // res.send("You visited hello endpoint")
    // res.send("<h1>You visited Hello Endpoint</h1>")
    // res.sendFile(__dirname + "/views/numbers.html")
    res.render("numbers.ejs",{
        name: "Obai",
        numbers: []
    })
})

app.get("/hi",(req,res)=>{
    let numbers = ""
    for(let i = 0 ; i <= 100; i++){
        numbers += i + "-"
    }
    // res.send(`The numbers are : ${numbers}`)
    res.render("numbers2.ejs",{
        name: "Obai",
        numbers: numbers
    })
})

// path parameters
app.get("/findSummation/:number1/:number2",(req,res)=>{
    let total = Number(req.params.number1) + Number(req.params.number2)
    res.send(`The total is: ${total}`)
})
// body parameters and querey parameters
app.get("/sayHello",(req,res)=>{
    // querey parameters
    console.log(req.query)
    // body parameters
    // res.send(`Hello ${req.body.name}, Age is ${req.query.age}`)
    res.json({
        name: req.body.name,
        age: req.query.age,
        location: req.query.location
    })
})
app.get("/test",(req,res)=>{
    res.send("You visited test endpoint")
})
app.put("/test",(req,res)=>{
    res.send("You visited test endpoint in put method")
})
app.delete("/testDelete",(req,res)=>{
    res.send("You visited testDelete endpoint in delete method")
})


app.post("/addComment",(req,res)=>{
    res.send("post request on add comment")
})



// Article Endpoints

app.post("/articles",async(req,res)=>{
    const newArticle = new Article()

    newArticle.title = req.body.articleTitle
    newArticle.body= req.body.articleBody
    newArticle.numberOfLikes = 10
    await newArticle.save()

    res.json(newArticle)
})

app.get("/articles",async(req,res)=>{
    const articles = await Article.find()
    res.json(articles)
})

app.get("/articles/:articleId",async(req,res)=>{
    const article = await Article.findById(req.params.articleId)
    res.json(article)
})

app.delete("/articles/:articleId",async(req,res)=>{
    const article = await Article.findByIdAndDelete(req.params.articleId)

    res.json(article)
})


app.get("/showArticles",async(req,res)=>{
    const articles = await Article.find()
    res.render("articles.ejs",{
        allArticles: articles
    })

})

app.listen(15892,()=>{
    console.log("I am listening in port 15892")
})