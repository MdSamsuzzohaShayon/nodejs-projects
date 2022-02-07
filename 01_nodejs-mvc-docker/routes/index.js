const express = require("express");
const Book = require('../models/Book');
const router = express.Router();

router.get("/", async(req, res, next) => {
  // SHOWING IMAGE IN ORDER BY DATE
  let books = [];
  try {
    books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec();
  } catch  {
    books = [];
  }
  res.render("index", {books});
});



module.exports = router;
