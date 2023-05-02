const express = require("express");
const {PostModel}= require("../models/Post.model")

const PostRouter = express.Router()


 PostRouter.post("/create", async(req,res)=>{
    try {
       const post = new PostModel(req.body) 
       await post.save();
    //    console.log(post);
       res.status(200).send({msg:"New Post has been added!!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"something went wrong"})
    }
 })

 PostRouter.get("/",async(req,res)=>{
    const {device}= req.query
    let query = {}
    if(device){
        query.device=device
    }
    try {
        const posts = await PostModel.find({$and:[{authorId:req.body.authorId},query]})
        res.status(200).send(posts)
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"Something went wrong"})
    } 
 })

 PostRouter.patch("/update/:postId",async(req,res)=>{
    const {postId}= req.params
    const post = await PostModel.findOne({_id:postId})
    try {
        if(post.authorId!==req.body.authorId){
            res.status(200).send({msg:"you are not authorised to update this post"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postId},req.body)
            res.status(200).send({msg:"Post has been updated"})
        }
    } catch (error) {
        console.log(error)
        res.send({msg:"Something went wrong"})
    }
 })


 PostRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}= req.params
    const post = await PostModel.findOne({_id:postId})
    try {
        if(post.authorId!==req.body.authorId){
            res.status(200).send({msg:"you are not authorised to delete this post"})
        }else{
            await PostModel.findByIdAndDelete({_id:postId},req.body)
            res.status(200).send({msg:"Post has been deleted"})
        }
    } catch (error) {
        console.log(error)
        res.send({msg:"Something went wrong"})
    }
 })







module.exports = {
    PostRouter
}