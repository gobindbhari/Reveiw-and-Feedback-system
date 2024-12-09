const express = require('express')
const { createPost, getPost } = require('../controllers/postController')
const { createFeedback, allFeedbacks, approvedFeedback, deleteFeedback } = require('../controllers/feedbackController')


const feedbackRouter = express.Router()

feedbackRouter.route('/create').post(createFeedback)

feedbackRouter.route('/get').get(allFeedbacks)

feedbackRouter.route('/approved/:id').patch(approvedFeedback)

feedbackRouter.route('/delete/:id').delete(deleteFeedback)


module.exports = feedbackRouter