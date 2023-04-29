'use strict'
const searchByIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const cocktailImages = document.getElementById("cocktail-images");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function searchCocktails() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") return;
    fetch(url + searchTerm)
        .then(response => response.json())
        .then(data => {
            const cocktails = data.drinks || [];
            cocktailImages.innerHTML = "";
            cocktails.forEach(cocktail => {
                const img = document.createElement("img");
                img.src = cocktail.strDrinkThumb;
                img.alt = cocktail.strDrink;
                const name = document.createElement("h3");
                name.textContent = cocktail.strDrink;
                const cocktailDiv = document.createElement("div");
                cocktailDiv.classList.add("cocktail");
                cocktailDiv.setAttribute ( 'data-bs-toggle', 'modal');
                cocktailDiv.setAttribute('data-bs-target', "#info");
                cocktailDiv.appendChild(img);
                cocktailDiv.appendChild(name);
                addInfoFunction(cocktailDiv, cocktail);
                cocktailImages.appendChild(cocktailDiv);
            });
        })
        .catch(error => console.error(error));
}

searchBtn.addEventListener("click", searchCocktails);



const urlForIngrid = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const searchInputIngrid = document.getElementById("search-input-ingrid");
const searchBtnIngrid = document.getElementById("search-btn-ingrid");

function searchIngrid() {
    const searchTermIngrid = searchInputIngrid.value.trim();
    if (searchTermIngrid === "") return;
    fetch(urlForIngrid + searchTermIngrid)
        .then(response => response.json())
        .then(data => {
            const cocktails = data.drinks || [];
            cocktailImages.innerHTML = "";
            cocktails.forEach(cocktail => {
                const img = document.createElement("img");
                img.src = cocktail.strDrinkThumb;
                img.alt = cocktail.strDrink;
                const name = document.createElement("h3");
                name.textContent = cocktail.strDrink;
                const cocktailDiv = document.createElement("div");
                cocktailDiv.classList.add("cocktail");
                cocktailDiv.setAttribute('data-bs-toggle', 'modal')
                cocktailDiv.setAttribute('data-bs-target', "#info")
                cocktailDiv.appendChild(img);
                cocktailDiv.appendChild(name);

                addInfoFunction(cocktailDiv, cocktail);

                cocktailImages.appendChild(cocktailDiv);
            });
        })
        .catch(error => console.error(error));
}

searchBtnIngrid.addEventListener("click", searchIngrid);
function addInfoFunction(newCocktail, cocktail) {
console.log(cocktail);
console.log(newCocktail);

    newCocktail.addEventListener('click', function () {
        createCocktailInfo(cocktail)
    });
}
function createCocktailInfo(cocktail) {
    let ingredients = [];
    for (let index = 1; index < 15; index++) {
        let str= "strIngredient" + index;

        console.log(cocktail)

        let ingredient = cocktail[str]

        if (ingredient == null) {
            break;
        }
        ingredients.push(ingredient);
    }
    ingredients.forEach(
        (ingredient) => { createIngredient(ingredient) });
    document.getElementById('info-body').innerHTML='<p>'+cocktail.strInstructions+'</p>';
}

function createIngredient(name) {
    const ingredient = document.createElement('div');
    ingredient.setAttribute ( 'data-bs-toggle', 'modal');
    ingredient.setAttribute ( 'data-bs-target', "#ingredientModal");
    ingredient.innerHTML = '<img src="https://www.thecocktaildb.com/images/ingredients/' + name + '-Small.png"> <span>  ' + name + '  </span>';

    ingredient.addEventListener('click', function () {
        createIngredientInfo(name)
    });
    document.getElementById('info-head').prepend(ingredient);
}

function createIngredientInfo(name) {

    const ingredient = document.createElement('div');
    ingredient.classList.add('text-center');
    ingredient.innerHTML = '<img src="https://www.thecocktaildb.com/images/ingredients/' + name + '-Medium.png"> <h2>  ' + name + '  </h2>';

    const search = document.createElement('div');
    search.innerHTML = '<div class="input-group ms-auto me-auto">' +
        '<div class="form-outline">' +
        '<input id="search-ingridiend-form" type="search"  class="form-control" placeholder="ingredient"/>' +
        '</div>' +
        '<button id="search-ingridient-button-form" type="button" class="btn btn-primary">Search</button>' +
        '</div>';

    search.getElementsByTagName("button")[0].addEventListener('click', () => {
        const inputValue = search.getElementsByTagName("input")[0].value;
        axios.get(urlForIngrid + inputValue)
            .then(function (response) {
                let idDrinks = [];
                let drinks = response.data.drinks;
                drinks.forEach(
                    (d) => { idDrinks.push(d.idDrink) });
                getDrinksById(idDrinks);
            })
            .catch(function (error) {
                console.log('error from back: ' + error);
            })
    })
    document.getElementById('info-ingredient-body').prepend(ingredient);
    ingredient.after(search);
}


function addCocktail(cocktail) {
    const cocktailElement =  createCocktailElement(cocktail);
    addInfoFunction(cocktailElement, cocktail);
    document.getElementById("contents").prepend(cocktailElement);
}



