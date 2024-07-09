const express = require("express");
const {
  createRecipe
} = require("../controllers/recipes");

const router = express.Router();
router.post("/", createRecipe);

module.exports = router;
