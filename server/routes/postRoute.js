const express = require('express')
const { createPost, getPost, getAllPost } = require('../controllers/postController')


const postRouter = express.Router()

postRouter.route('/create').post(createPost)

postRouter.route('/:post_id').get(getPost)

postRouter.route('/').get(getAllPost)


module.exports = postRouter