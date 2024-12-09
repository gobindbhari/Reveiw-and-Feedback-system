const Feedback = require("../models/feedbackModel");
const Post = require("../models/postModel");

const createFeedback = async (req, res) => {
  try {
    const { userName, post_id, comment, rating } = req.body;

    if (!userName || !post_id || !comment || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const checkpost = await Post.findById(post_id);
    if (!checkpost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newFeedback = await Feedback.create({
      userName,
      post_id,
      comment,
      rating
    });

    await checkpost.feedback.push(newFeedback._id)
    checkpost.totalRating = checkpost.totalRating + Number(rating)
    await checkpost.save()

    // const totalRatings = checkpost.avgRating * checkpost.feedback.length + Number(rating);
    checkpost.avgRating = checkpost.totalRating / checkpost.feedback.length;

    const feedbackCount = checkpost.feedback.length;
    console.log(checkpost,'++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(feedbackCount,'================================================')
    console.log(checkpost.totalRating,'.............................')
    console.log(checkpost.totalRating / feedbackCount)

    checkpost.avgRating = (Math.round(checkpost.totalRating / feedbackCount)) || 0;  // Default avgRating to 0 if feedbackCount is 0
    console.log('????????????????????????????????????????')

    // checkpost.avgRating = + rating
    await checkpost.save()


    return res.status(201).json({
      message: 'Feedback created successfully',
      newFeedback
    });

  } catch (error) {
    console.error('Error creating feedback controller', error);
    return res.status(500).json({ message: 'Server error' });
  }

}


const allFeedbacks = async (req, res) => {
  try {
    const data = await Feedback.find({ approved: false });
    if (data.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};



const approvedFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const { approved } = req.body; // Expecting { approved: true/false }

    // Find feedback by ID and update its 'approved' status
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { approved },
      { new: true } // Return the updated document
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: 'Feedback approval status updated', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const feedback = await Feedback.findByIdAndDelete(id);
    console.log(feedback,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    const feed = await Post.findOne({'feedback': id});
    console.log(feed,'feedfffffffffffffffffffffffffffffffffffff')
    if (!feed) {
      return res.status(404).json({ message: "Post not found or feedback not associated with this post" });
    }
    if(feed.feedback.includes(id))console.log('yesssssssssssssssssssssssssss')
    const d = feed.feedback.pull(id)
    console.log(d,'ddddddddddddddddddddddddddddddddddddddddddd')
    await feed.save()
    res.status(200).json({ message: "Feedback successfully deleted" });

  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "An error occurred while deleting feedback" });
  }
};



module.exports = { createFeedback, allFeedbacks, approvedFeedback, deleteFeedback }