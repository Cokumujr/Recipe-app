const { Recipe } = require("../models/recipes");

const getRecipes = async(req, res) => {
    const recipes = await Recipe.find({})
    res.send(recipes).status(200)
}

const createRecipe = async(req, res) => {
    const { title, ingredients } = req.body

    if(!title || !ingredients) return res.status(400).send({ error: "Please provide all the fields" });

    try {
        const recipe = await Recipe.create({
            title: title,
            creator: req.user.id,
            ingredients: ingredients
        });
        if(!recipe) return res.status(400).send({ error: "Recipe could not be created!!" })
        res.send(recipe).status(201)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message })
    }
}

const getRecipeById = async(req, res) => {
    const { id } = req.params
    try {
        const recipe = await Recipe.findById({ "_id": id })
        if(!recipe) return res.status(404).send({ error: "recipe not found!!" })
        res.send(recipe).status(200)

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}

// Assignment
// 1. Implement recipe updating.
// 2. Implement recipe deletion.

module.exports = { getRecipes, createRecipe, getRecipeById }