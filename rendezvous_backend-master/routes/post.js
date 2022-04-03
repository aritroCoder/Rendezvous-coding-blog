const express = require('express');
const Post = require('../models/Post');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// ROUTE 1: Create a new post using: POST "/api/post/create". login required

router.post('/create', fetchuser, [
  body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
  body('body', 'Content must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = req.user;

    // Create a new post
    var today = new Date();
    let date = today.getDate()<10? '0'+today.getDate() : today.getDate();
    let month = today.getMonth()+1<10? '0'+(today.getMonth()+1) : today.getMonth()+1;

    // var current_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var current_date = date + '-' + month + '-' + today.getFullYear();
    let post = await Post.create({
      username: user.username,
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      date: current_date
    });

    // res.json(post)
    res.json({ post })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE 2: view all posts using: POST "/api/post/view".No login required
router.get('/view', async (req, res) => {
  // If there are errors, return Bad request and the errors
  try {
    let post = await Post.find();

    // res.json(post)
    res.json({ post })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE 3: delete a new post using: POST "/api/post/delete". login required
router.delete('/delete/:id', fetchuser, async (req, res) => {
  // If there are errors, return Bad request and the errors
  try {
    let user = req.user;
    const username = user.username;
    // Create post by username and title
    let post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    res.json(post)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE 4: Like a post using GET /api/post/like. Login required. This will be a toggle operation
router.get('/like/:id', fetchuser, async (req, res) => {
  let user = req.user;
  const username = user.username;
  let post = await Post.findById(req.params.id);
  if (post) {
    if (post.like.find((like) => like.username === username)) {
      //post already liked, unlike it
      post.like = post.like.filter((like) => like.username !== username);
    } else {
      //Post not liked, like it
      post.like.push({ username })
    }
    await post.save();
    return res.json(post)
  } else {
    return res.status(400).json({ error: "Post not found" })
  }
})

module.exports = router