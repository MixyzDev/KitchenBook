const recipModel = require("../models/recipModel")//importation de notre modele d'utilisateur
const recipRouter = require("express").Router() /* importation et execution de la methode express Router()
                                                  c'est grace a celle ci que nous pourront definir nos routes par la suite*/


recipRouter.get("/recettes", async (req, res) => {
    try {
        let recip = await recipModel.find(req.query).populate({path:"ingredients"})//on recupere la liste de tout les utilisateurs
        res.send(recip)// on les renvoi au client grace a la methode send() de l'objet res
    } catch (error) {// si une erreur est relevé,
        res.send(error) // on renvoi l'erreur au client

    }
})

recipRouter.get("/recettes/:id", async (req, res) => {
    try {
        let recipId = await recipModel.findOne({ _id: req.params.id }).populate({path:"ingredients"})//on recupere la liste de tout les utilisateurs
        res.send(recipId)// on les renvoi au client grace a la methode send() de l'objet res
    } catch (error) {// si une erreur est relevé,
        res.send(error) // on renvoi l'erreur au client

    }
})

recipRouter.post("/recettes", async (req, res) => {
    try {
        let newRecip = new recipModel(req.body)//nous creons l'utilisateur avec en parametre du constructeur, le corps de notre requete
        newRecip.save()//nous sauvegardons l'utilisateur en base, grace a la methode save() de ce nouvel utilisateur
        res.send("la recette a bien été ajoutée")// on envois un message de reussite au client
    } catch (error) {//si une erreur est relevé,
        res.send(error)// on renvoi l'erreur au client
    }
})

recipRouter.put("/recettes/:id", async (req, res) => {
    try {
        await recipModel.updateOne({ _id: req.params.id }, req.body)// on modifie l'utilisateur dont l'id correspond a notre parametre de requete du meme nom
        res.send("recette modifiée")//on renvoi a l'utilisateur un message de reussite
    } catch (error) {//si une erreur est relevé
        res.send(error)//onrenvoi l'erreur au client
    }
})

recipRouter.delete("/recettes/:id",async(req, res) => {
    try{
        await recipModel.deleteOne({_id: req.params.id})
        res.send("recette supprimée")
    }catch (error){
        res.send(error)
    }
})


module.exports = recipRouter // exportation de notre userRouter