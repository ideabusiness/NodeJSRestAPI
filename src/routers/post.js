import express from 'express'
import mongoose from 'mongoose'
import Post from '../models/Post'


const router = express.Router()


// Get All Post 
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find()
        
        if (!posts) {
            return res.status(401).send({error: 'Post not found'})
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get a Post by query id
router.get('/findById', async (req, res) => {
    try {
        // View post with id = req.id
        console.log('Id : ' + req.query.id)
        //Check if is a valid MongoDB Id
        let valid = mongoose.Types.ObjectId.isValid(req.query.id);
        if (!valid) {
            return res.status(400).send({error: 'Not a ObjectId id for post'})
        }
        let post = await Post.findById(req.query.id)
        
        if (!post) {
            return res.status(401).send({error: 'Post not found'})
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error)
    }
})


// Get a Post by param postId
router.get('/:postId', async (req, res) => {
    try {
        // View post with id = req.params.postId
        console.log(`Find by postId : ${req.params.postId}`)
        //Check if is a valid MongoDB Id
        let valid = mongoose.Types.ObjectId.isValid(req.params.postId);
        if (!valid) {
            return res.status(400).send({error: 'Not a valid ObjectId for post'})
        }
        let post = await Post.findById(req.params.postId)
        
        if (!post) {
            return res.status(401).send({error: 'Post not found'})
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Send a Post
router.post('/', async (req, res) => {
    // Create a new post    
    console.log(req.body)
    try {
        const post = new Post(req.body)
        await post.save()
        res.status(201).send({ post})
    } catch (error) {
        res.status(400).send(error)
    }
})


// Update a Post
router.put('/', async (req, res) => {
    // Create a new post    
    console.log(req.body)
    try {
        const updatedPost = await Post.updateOne({_id: req.body.id}, req.body)
        res.status(201).send(updatedPost)
    } catch (error) {
        res.status(400).send(error)
    }
})


// Delete a Post
router.delete('/', async (req, res) => {
    // Create a new post    
    console.log(req.body)
    try {
        const removedPost = await Post.remove({_id: req.body.id})
        res.status(200).send(removedPost)
    } catch (error) {
        res.status(400).send(error)
    }
})


export default router