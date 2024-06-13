const containerRecip = document.querySelector("#recettes > div");

// Fonction pour récupérer les détails de la recette depuis la base de données
const recipesDb = async () => {
    const response = await fetch("http://127.0.0.1:3000/recettes/" + getRecipId());
    return response.json();
};

const ingredientsDb = async () => {
    const response = await fetch(`http://127.0.0.1:3000/ingredients/`);
    return response.json();
};

function showToast(message, duration = 3000) {
    const toast = document.getElementById("toast");
    toast.className = "toast";
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}

// Fonction pour supprimer une recette par ID
const deleteRecipe = async (id) => {
    const response = await fetch(`http://127.0.0.1:3000/recettes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        showToast("Recette supprimée avec succès!", 3000);
            setTimeout(() => {
                window.location.href = "/ProjetKitchenBook/front/"; // Redirige vers la page principale ou une autre page après suppression
            }, 3000)
    } else {
        showToast("Erreur lors de la suppression de la recette", 3000);
    }
};

// Fonction pour mettre à jour une recette par ID
const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`http://127.0.0.1:3000/recettes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
    });
    if (response.ok) {
        console.log(response);
        showToast("Recette modifiée avec succès!", 3000);
        setTimeout(() => {
            window.location.reload(); // Recharge la page pour afficher les modifications
        }, 3000)
    } else {
        showToast("Erreur lors de la modification de la recette.", 3000);
    }
};

// Récupérer et afficher les données de la recette et les ingrédients
recipesDb().then((recipe) => {
    let container = document.createElement("div");
    container.classList.add("recipe");

    let title = document.createElement("h3");
    title.innerText = recipe.titre;

    let instruction = document.createElement("p");
    instruction.innerText = "Instruction : " + recipe.instruction;

    let prepaTime = document.createElement("p");
    prepaTime.innerText = "Temps de préparation : " + recipe.tempsPrepa + "''";

    let cookTime = document.createElement("p");
    cookTime.innerText = "Temps de cuisson : " + recipe.tempsCuisson + "''";

    let diff = document.createElement("p");
    diff.innerText = "Difficulté de réalisation : " + recipe.difficulté;

    let ingredientsList = document.createElement("p");
    ingredientsList.innerText = recipe.ingredients.map(ing => ing.nom).join(', '); // Afficher les noms des ingrédients

    let category = document.createElement("p");
    category.innerText = "Catégorie de la recette : " + recipe.categorie;

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Supprimer";
    deleteButton.addEventListener("click", () => {
        const confirmDelete = confirm("Voulez-vous vraiment supprimer cette recette ?");
        if (confirmDelete) {
            deleteRecipe(recipe._id);
        }
    });

    let editButton = document.createElement("button");
    editButton.innerText = "Modifier";
    editButton.addEventListener("click", () => {
        showEditForm(recipe);
    });

    container.appendChild(title);
    container.appendChild(instruction);
    container.appendChild(prepaTime);
    container.appendChild(cookTime);
    container.appendChild(diff);
    container.appendChild(ingredientsList); // Ajout de la liste d'ingrédients
    container.appendChild(category);
    container.appendChild(deleteButton);
    container.appendChild(editButton);
    containerRecip.appendChild(container);
})

const showEditForm = (recipe) => {
    const formContainer = document.createElement("div");
    formContainer.classList.add("edit-form");

    ingredientsDb().then((ing) => {
        const newrecipeingredients = document.createElement("div")
        ing.forEach((elem) => {
            let containerIng = document.createElement("p");
            containerIng.innerText = elem.nom;
            newrecipeingredients.appendChild(containerIng);
            formContainer.appendChild(newrecipeingredients)
            if (recipe.ingredients.some(ing => ing._id == elem._id)) {
                containerIng.setAttribute("data", elem._id);
                containerIng.classList.add("selected");
            }

            containerIng.addEventListener("click", function () {
                containerIng.setAttribute("data", elem._id)
                containerIng.classList.toggle("selected")
            })
        });
    });

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = recipe.titre;
    titleInput.placeholder = "Titre";

    const instructionInput = document.createElement("textarea");
    instructionInput.value = recipe.instruction;
    instructionInput.placeholder = "Instructions";

    const prepaTimeInput = document.createElement("input");
    prepaTimeInput.type = "text";
    prepaTimeInput.value = recipe.tempsPrepa;
    prepaTimeInput.placeholder = "Temps de préparation";

    const cookTimeInput = document.createElement("input");
    cookTimeInput.type = "text";
    cookTimeInput.value = recipe.tempsCuisson;
    cookTimeInput.placeholder = "Temps de cuisson";

    const diffInput = document.createElement("input");
    diffInput.type = "text";
    diffInput.value = recipe.difficulté;
    diffInput.placeholder = "Difficulté";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.value = recipe.categorie;
    categoryInput.placeholder = "Catégorie";

    const saveButton = document.createElement("button");
    saveButton.innerText = "Enregistrer";
    saveButton.addEventListener("click", () => {
        const ingredients = document.querySelectorAll(".selected");
        const saveData = [];
        ingredients.forEach((ing) => {
            saveData.push(ing.getAttribute("data"));
        });
        const updatedRecipe = {
            titre: titleInput.value,
            instruction: instructionInput.value,
            tempsPrepa: prepaTimeInput.value,
            tempsCuisson: cookTimeInput.value,
            difficulté: diffInput.value,
            categorie: categoryInput.value,
            ingredients: saveData
        };
        updateRecipe(recipe._id, updatedRecipe);
    });

    formContainer.appendChild(titleInput);
    formContainer.appendChild(instructionInput);
    formContainer.appendChild(prepaTimeInput);
    formContainer.appendChild(cookTimeInput);
    formContainer.appendChild(diffInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(saveButton);

    containerRecip.innerHTML = ""; // Efface les recettes existantes
    containerRecip.appendChild(formContainer);
};

// Fonction pour récupérer l'ID de la recette à partir de l'URL
function getRecipId() {
    const url = window.location.href;
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get("id");
    console.log(id);
    return id;
}
