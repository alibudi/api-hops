const router = require('express').Router();
const { categori,post } = require('../controllers');


router.get('/categori', categori.getAll);
router.get('/categori/:slug', categori.getById);
router.get('/posts',post.getAll);

// router.get('/categori/:id', categori.getById);

module.exports = router;