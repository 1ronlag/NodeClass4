const express = require('express')
const router = express.Router() 
const { getAllPost, createNewPost, updatePostById, deletePostById} = require('../controllers/postControllers')

router.get('/posts', getAllPost)
router.post('/posts', createNewPost)
router.put('/posts/like/:id', updatePostById)
router.delete('/posts/:id', deletePostById)

module.exports = router
