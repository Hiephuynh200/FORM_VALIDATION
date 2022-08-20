
const meals = document.getElementById('meals')

getRandomMeal();
fetchFavMeal();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    const respData = await resp.json();
    const randomMeal = respData.meals[0]

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp =  await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)

    const respData = await resp.json();

    const meal = respData.meals[0]
    return meal
}

async function getMealBySearch(term) {
    const meals =  await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div')
    meal.classList.add('meal')

    meal.innerHTML = `
            <div class="meal-header">
                ${random ?              
                    `<span class="random">
                    Random Recipe
                    </span>` : ''}
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn ><i class="fa-thin fa-heart"></i>
                </button>
            </div>
    `

    const btn = meal.querySelector(".meal-body .fav-btn")

    btn.addEventListener("click", () => {
        if(btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal)
            btn.classList.remove("active")
        } else {
            addMeaToLS(mealData.idMeal)
            btn.classList.add("active")
        }
       btn.classList.toggle("active")
    })

    meals.appendChild(meal)
}

function addMeaToLS(meal) {
    const mealIds = getMealsFromLS()

    localStorage.setItem ("mealIds", JSON.stringify
    ([...mealIds, mealIds]))
}

function removeMealFromLS(meal) {
    const mealIds = getMealsFromLS()

    localStorage.setItem ("mealIds", JSON.stringify
    (mealIds.filter(id => id !== mealIds)))
}
 
function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"))
    return mealIds === null ? [] : mealIds
}

async function fetchFavMeal() {
    const mealIds = getMealsFromLS();


    const meals = []
    for(let i = 0; i < mealIds.length; i++) {
        const mealID = mealIds[i]
        meal = await getMealById(mealID)
        meals.push(meal)
    }
}