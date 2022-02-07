const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require('../models/Book');

// ALL AUTHER ROUTES
router.get("/", async (req, res, next) => {
  let searchOption = {};
  // because we are using get method to retrive the data we need to use req.query insted of req.body
  if (req.query.name != null && req.query.name != "") {
    // i (ignore case) If u flag is also enabled, use Unicode case folding.
    searchOption.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOption);
    console.log(authors);
    console.log("authors from authors.js");
    console.log(req.query);
    res.render("authors/index", { authors, searchOption: req.query });
  } catch {
    res.redirect("/");
  }
});

// NEW AUTHER ROUTE
router.get("/new", (req, res, next) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res, next) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`/authors/${newAuthor.id}`);
  } catch {
    res.render(
      "authors/new",
      { author, errorMessage: "Error creating Author" },
    );
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render(
  //       "authors/new",
  //       { author, errorMessage: "Error creating Author" },
  //     );
  //   }else{
  //     // res.redirect(`/authors/${newAuthor.id}`);
  //     res.redirect('/authors');
  //   }
  // });
  // // res.send(req.body.name);
});



router.get("/:id", async (req, res, next) => {
  // res.send("show author" + req.params.id);
  try {
    const author = await Author.findById(req.params.id);
    const books= await Book.find({author: author.id}).limit(6).exec();
    res.render('authors/show', {
      author,
      booksByAuthor: books
    });
  } catch {
    console.log(err);    
    res.redirect('/');
  }
});



router.get('/:id/edit', async ( req, res, next)=>{
  try {
    const author = await Author.findById(req.params.id);
    console.log(author.name);
    
    res.render("authors/edit", { author: author });
  } catch  {
    res.redirect('/authors')
  }
});
router.put('/:id', async ( req, res, next)=>{
  let author ; 
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if(author == null){
      res.redirect('/');
    }else{
      res.render(
        "authors/edit",
        { author, errorMessage: "Error updating Author" },
      );
    }
  }
});

router.delete('/:id',async (req, res, next)=>{
  let author ; 
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.remove();
    res.redirect('/authors');
  } catch {
    if(author == null){
      res.redirect('/');
    }else{
      res.redirect(`/authors/${author.id}`)
    }
  }
});

router.put

module.exports = router;
