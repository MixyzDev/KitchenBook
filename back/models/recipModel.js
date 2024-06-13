const mongoose = require("mongoose") ; // importation de mongoose 

//definition de notre schema de données grace a la mathode de mongoose schema()
const recipSchema = mongoose.Schema({
    titre : {
        //le nom de notre utilisateur devra obligatoirement etre une chaine de caractere
        type : String,
        /* le nom de l'utilisateur devra obligatoirement etre saisis , si ce n'est pas le cas,
        une erreur de validation avec le message stipulé a l'index 1 du tableau sera transmise */
        required: [true, "la recette doit avoir un titre"]
    },
    instruction:{
        type:String,
        required:[true,"la recette doit avoir des instructions de préparation"]
    },
    tempsPrepa:{
        type:Number,
        required:[true,"la recette doit avoir un temps de préparation"]
    },
    tempsCuisson:{
        type:Number,
        required:[true,"la recette doit avoir un temps de cuisson"]
    },
    difficulté:{
        type:String,
        required:[true,"la recette doit avoir une difficulté"]
    },
    categorie:{
        //l'age de notre utilisateur devra obligatoirement etre un nombre
        type:String,
        required:[true,"la recette doit avoir une catégorie"]
    },
    images:{
        type:String,
        required: false // Le champ images n'est pas obligatoire
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredients', // Référence au modèle 'Ingredient'
        required: true // Les ingrédients sont obligatoires
    }]
})

/*
nous creons maintenant notre modele de donnée.grace a la methode model() de mongoose dans la base , notre collection se nommera "users"
et se basera sur userSchema pour valider les données
*/
const recipModel = mongoose.model('recettes',recipSchema)
module.exports = recipModel // nous exportons notre models de donné pour qu'il soit disponible hors de ce fichier