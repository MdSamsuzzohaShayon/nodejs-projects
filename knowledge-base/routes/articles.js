const express = require('express');
const router = express.Router();
//BRING IN ARTICLE MODELS
let Article = require('../models/article');









//ADD ROUTE
router.get('/add', (req, res) => {
    res.render('add_article', {
        title: "Add Article"
    })
});
//IF REQUEST IS DIFFERENT WE CAN GO TO SAME URL
//ADD SUBMIT POST ROUTE
router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'body is required').notEmpty();

    //get the errors
    let errors = req.validationErrors();
    if (errors) {
        res.render('add_article', {
            title: "Add article",
            errors: errors
        })
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        article.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article added');
                res.redirect('/');
            }
        });
    }
});



//LOAD EDIT FORM
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: 'Edit title',
            article: article
        });
    });
});




//UPDATE SUBMIT
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;


    let query = {
        _id: req.params.id
    }

    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article updated')
            res.redirect('/');
        }
    });
});






router.delete('/:id', (req, res) => {
    let query = {
        _id: req.params.id
    }
    Article.remove(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.send('success');
    })
});





//GET SINGLE ARTICLE

router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        });
    });
});

module.exports = router;