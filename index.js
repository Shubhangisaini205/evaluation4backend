const express = require("express");
const {connection}= require("./db")
const { UserRouter}= require("./routes/User.routes")
const {PostRouter}= require("./routes/post.routes")
const {AuthMiddleWare}= require("./middleware/auth.middleware")
const app = express();
app.use(express.json())
app.get("/", (req,res)=>{
    res.send("Done")
})



app.use("/users",UserRouter)

app.use(AuthMiddleWare)
app.use("/posts",PostRouter)



app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to the Db!!");
        
    } catch (error) {
        console.log(error);
        console.log("cannot connected to the Db")
    }
    console.log("server at port 8080 is running")
})


