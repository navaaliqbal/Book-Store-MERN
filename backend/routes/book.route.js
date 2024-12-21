let express = require("express");
let router = express.Router();

// Book Model
let bookSchema = require("../Models/Book");

// CREATE Book
router.route("/create-book").post((req, res, next) => {
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);  // Pass error to next middleware
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Books
router.route("/").get((req, res, next) => {
  bookSchema.find((error, data) => {
    if (error) {
      return next(error);  // Pass error to next middleware
    } else {
      res.json(data);
    }
  });
});

// Get Single Book
router.route("/edit-book/:id").get((req, res, next) => {
  bookSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);  // Pass error to next middleware
    } else {
      res.json(data);
    }
  });
});

// Update Book
router.route("/update-book/:id").put((req, res, next) => {
  bookSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }, // To return the updated book
    (error, data) => {
      if (error) {
        return next(error);  // Pass error to next middleware
      } else {
        res.json(data);
        console.log("Book updated successfully!");
      }
    }
  );
});

// Delete Book
router.route("/delete-book/:id").delete((req, res, next) => {
  bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);  // Pass error to next middleware
    } else {
      res.status(200).json({
        msg: "Book deleted successfully!",
        data: data,
      });
    }
  });
});

module.exports = router;
