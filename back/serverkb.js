const express = require("express") //import de la librarie express
const mongoose = require("mongoose") // import de la librarie mongoose
const cors = require("cors")
require('dotenv').config()

const ingRouter= require("./routes/ingRouter") // nous importons notre router ici
const recipRouter= require("./routes/recipRouter") // nous importons notre router ici
const port = process.env.PORT // definition du port d'écoute du serveur 
const db = process.env.DATABASE_URL // uri de ma base de donnée locale
const app = express() //demarage d'une instance d'express.

app.use(cors())
app.use(express.json()) //nous demandons ici a express d'analyser nos requetes en json
app.use(ingRouter)//nous demandons ici a express d'utiliser notre userRouter, les routes definies dans notre router seront donc disponibles
app.use(recipRouter)

/*
app.listen est une methode d'express , qui permet de specifier un port d'ecoute pour notre application en premier parametre , en deuxieme parametre ,
elle prend une fonction call back qui a pour but d'afficher une erreur si il y en a une , sinon , j'affiche un message de reussite.
*/

app.listen(port,(err)=>{
    if(err){
        console.log(err) ;
    }else{
        console.log(`connecté au serveur sur le port ${port}`) ;

    }
})

/*
lorsque l'option strictQuery est definie sur true ,
mongoose s'assurera que seuls les champs specifies dans votre schema seront enregistrés
dans la base de données et que tous les autre champs ne seront pas enregistrés
(si d'autre champs sont envoyés)
*/
mongoose.set('strictQuery',true);

/*
mongosse.connect est une methode de mongoose, qui permet de se connecter a notre base de données grace a l'URI que je place en premier paramaetre,
en deuxieme parametre , elle prend une fonction callback qqui a pour but d'afficher une erreur si il y en a une , sinon , j'affiche un message de reussite.
*/

mongoose.connect(db)