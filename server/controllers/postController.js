const Feedback = require("../models/feedbackModel");
const Post = require("../models/postModel");

const createPost = async (req,res) => {
    try {
        const { postName, description } = req.body;
        let image 
        if (req.file) {
          image = req.file.path;
        } 
        if (!postName || !description) {
            res.status(400).json({ message: 'all feilds are required' })
        }
        const newPost =await Post.create({
            postName,
            description,
            image 
        });
        return res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const getPost = async (req,res) => {
    try {
        const { post_id } = req.params;
    
        if (!post_id) {
          return res.status(400).json({ message: 'Post ID is required' });
        }
    
        const checkPost = Post.findById(post_id).populate('feedback')
        if (!checkPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
        
        return res.status(200).json({
          message: 'Feedback retrieved successfully',
          // feedbacks,
          checkPost
        });
      } catch (error) {
        console.error('Error fetching feedback:', error);
        return res.status(500).json({ message: 'Server error' });
      }  
}


const getAllPost = async (req,res) => {
    try {
        const checkPost = await Post.find().populate('feedback')
        if (checkPost.length === 0) {
          return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).send(checkPost);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        return res.status(500).json({ message: error.message,error:error });
      }  
}


module.exports = {createPost, getPost, getAllPost}