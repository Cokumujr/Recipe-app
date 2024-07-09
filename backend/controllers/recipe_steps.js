const { Recipe, RecipeSteps } = require("../models/recipes");

const recipeSteps = async(req, res) => {
    const { id } = req.params

    try {
        const recipe = await Recipe.findOne({ "_id": id })
        if(!recipe) return res.status(404).send({ error: "recipe not found!!" })

        const recipeSteps = await RecipeSteps.find({ recipe: recipe._id })
        res.send(recipeSteps).status(200)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}

const createRecipeStep = async(req, res) => {
    const { recipe, name } = req.body

    if(!recipe || !name) return res.status(400).send({ error: "Please provide all fields" })
    
    try {
        const recipe = await Recipe.findOne({ "_id": id })
        if(!recipe) return res.status(404).send({ error: "recipe not found!!" })
        
        const recipeStep = await RecipeSteps.create({
            recipe: recipe._id,
            name: name
        });
        if(!recipeStep) return res.status(400).send({ error: "Recipe step could not be created!!" })
        res.send(recipeStep).status(201)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { recipeSteps, createRecipeStep }