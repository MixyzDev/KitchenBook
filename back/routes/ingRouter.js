const ingModel = require("../models/ingModel")//importation de notre modele d'utilisateur
const ingRouter = require("express").Router() /* importation et execution de la methode express Router()
                                                  c'est grace a celle ci que nous pourront definir nos routes par la suite*/


ingRouter.get("/ingredients", async (req, res) => {
    try {
        let ing = await ingModel.find(req.query)//on recupere la liste de tout les utilisateurs
        res.send(ing)// on les renvoi au client grace a la methode send() de l'objet res
    } catch (error) {// si une erreur est relevé,
        res.send(error) // on renvoi l'erreur au client

    }
})

ingRouter.get("/ingredients/:id", async (req, res) => {
    try {
        let ingId = await ingModel.findOne({ _id: req.params.id })//on recupere la liste de tout les utilisateurs
        res.send(ingId)// on les renvoi au client grace a la methode send() de l'objet res
    } catch (error) {// si une erreur est relevé,
        res.send(error) // on renvoi l'erreur au client

    }
})

ingRouter.post("/ingredients", async (req, res) => {
    try {
        let newIng = new ingModel(req.body)//nous creons l'utilisateur avec en parametre du constructeur, le corps de notre requete
        newIng.save()//nous sauvegardons l'utilisateur en base, grace a la methode save() de ce nouvel utilisateur
        res.send("l'ingrédient a bien été ajouté")// on envois un message de reussite au client
    } catch (error) {//si une erreur est relevé,
        res.send(error)// on renvoi l'erreur au client
    }
})

ingRouter.put("/ingredients/:id", async (req, res) => {
    try {
        await ingModel.updateOne({ _id: req.params.id }, req.body)// on modifie l'utilisateur dont l'id correspond a notre parametre de requete du meme nom
        res.send("ingrédient modifié")//on renvoi a l'utilisateur un message de reussite
    } catch (error) {//si une erreur est relevé
        res.send(error)//onrenvoi l'erreur au client
    }
})

ingRouter.delete("/ingredients/:id",async(req, res) => {
    try{
        await ingModel.deleteOne({_id: req.params.id})
        res.send("ingrédient supprimé")
    }catch (error){
        res.send(error)
    }
})


module.exports = ingRouter // exportation de notre userRouter