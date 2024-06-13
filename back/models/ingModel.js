const mongoose = require("mongoose") ; // importation de mongoose 

//definition de notre schema de données grace a la mathode de mongoose schema()
const ingSchema = mongoose.Schema({
    nom:{
        //le nom de notre utilisateur devra obligatoirement etre une chaine de caractere
        type : String,
        /* le nom de l'utilisateur devra obligatoirement etre saisis , si ce n'est pas le cas,
        une erreur de validation avec le message stipulé a l'index 1 du tableau sera transmise */
        required: [true, "l'ingrédient doit avoir un nom"]
    },
})
/*
nous creons maintenant notre modele de donnée.grace a la methode model() de mongoose dans la base , notre collection se nommera "users"
et se basera sur userSchema pour valider les données
*/
const ingModel = mongoose.model('ingredients',ingSchema)
module.exports = ingModel // nous exportons notre models de donné pour qu'il soit disponible hors de ce fichier