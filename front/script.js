const containerRecip = document.querySelector("#recettes > .crea");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

const recipesDb = async () => {
    const response = await fetch("http://127.0.0.1:3000/recettes");
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

recipesDb().then((recipes) => {
    recipes.forEach((recipe) => {
        let container = document.createElement("a");
        container.href = "./pages/recette.html?id=" + recipe._id;
        container.classList.add("recipe");

        let title = document.createElement("h3");
        title.innerText = recipe.titre;

        let category = document.createElement("p");
        category.innerText = recipe.categorie;

        container.appendChild(title);
        container.appendChild(category);
        containerRecip.appendChild(container);
    });
});

ingredientsDb().then((ing) => {
    const newrecipeingredients = document.querySelector("#newrecipeingredients")
    ing.forEach((ingredient) => {
        let containerIng = document.createElement("p");
        containerIng.innerText = ingredient.nom;
        newrecipeingredients.appendChild(containerIng);
        containerIng.addEventListener("click", function () {
            containerIng.setAttribute("data", ingredient._id)
            containerIng.classList.toggle("selected")
        })
    });
});

const filterRecipes = (recipes, searchTerm, searchOption) => {
    return recipes.filter((recipe) => {
        const value = recipe[searchOption].toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });
};

searchButton.addEventListener("click", async () => {
    const searchOption = document.querySelector("input[name='searchOption']:checked").value;
    const searchTerm = searchInput.value;
    const response = await fetch("http://127.0.0.1:3000/recettes?" + searchOption + "=" + searchTerm, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res.json() })
        .then((recipes) => {
            const searchButton = document.querySelector(".search-button");
            const searchInput = document.querySelector(".search-input");
            const searchTerm = searchInput.value;
            const searchOption = document.querySelector("input[name='searchOption']:checked").value;

            containerRecip.innerHTML = '';

            const filteredRecipes = filterRecipes(recipes, searchTerm, searchOption);
            filteredRecipes.forEach((recipe) => {
                let container = document.createElement("a");
                container.href = "./pages/recette.html?id=" + recipe._id;
                container.classList.add("recipe");

                let title = document.createElement("h3");
                title.innerText = recipe.titre;

                let category = document.createElement("p");
                category.innerText = recipe.categorie;

                container.appendChild(title);
                container.appendChild(category);
                containerRecip.appendChild(container);
            });
        });
})

const newRecipeForm = document.getElementById("new-recipe-form");
newRecipeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const ingredients = document.querySelectorAll(".selected");
    const saveData = [];
    ingredients.forEach(ingredient => {
        saveData.push(ingredient.getAttribute("data"))
    });
    const newRecipeTitle = document.getElementById("new-recipe-title").value;
    const newRecipeInstructions = document.getElementById("new-recipe-instructions").value;
    const newRecipePrepTime = document.getElementById("new-recipe-preptime").value;
    const newRecipeCookTime = document.getElementById("new-recipe-cooktime").value;
    const newRecipeDifficulty = document.getElementById("new-recipe-difficulty").value;
    const newRecipeCategory = document.getElementById("new-recipe-category").value;

    const newRecipe = {
        titre: newRecipeTitle,
        instruction: newRecipeInstructions,
        tempsPrepa: newRecipePrepTime,
        tempsCuisson: newRecipeCookTime,
        difficulté: newRecipeDifficulty,
        categorie: newRecipeCategory,
        ingredients: saveData,
    };

    const response = await fetch("http://127.0.0.1:3000/recettes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
    }).then((res) => {
        if (res.ok) {
            showToast("Recette ajouté avec succès!", 3000);
            setTimeout(() => {
                window.location.reload()
            }, 3000)

        } else {
            showToast("Erreur lors de l'ajout de la recette", 3000);
        }
    })
});

