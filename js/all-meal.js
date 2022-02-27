/* search by id name */
        /* spinner function */

const toggleSpinner = (state) =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = state;

}
const searchTitle = (state) => {
    const searchTitle = document.getElementById('search-title')
    searchTitle.style.display = state;
}

const searchMeal = () => {
    toggleSpinner('block');
    const errorForWriteAnything = document.getElementById('error-for-write-anything')
    errorForWriteAnything.style.display = 'none';
    const searchMealsContainer = document.getElementById('searchMealsContainer');
    searchMealsContainer.textContent = ''
    const searchValue = document.getElementById('search-text').value;
    document.getElementById('search-text').value =''
    console.log(searchValue);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showSearchMeal(data.meals))
}

const showSearchMeal = (meals) =>{
    console.log(meals)
    if (meals === null){
        const errorForWriteAnything = document.getElementById('error-for-write-anything')
        errorForWriteAnything.style.display = 'block';
        searchTitle('block')
        toggleSpinner('none');
    }
    for(const meal of meals){
        console.log(meal);
        const searchMealsContainer = document.getElementById('searchMealsContainer');
        const div = document.createElement('div');
        div.classList.add('col');
        
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p id="tags" class="card-text">${meal.strTags ? meal.strTags : ''}</p>
                      <button onclick="detailsMeal(${meal.idMeal})" type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        searchMealsContainer.appendChild(div);
        searchTitle('block')
    }
    toggleSpinner('none');
}

const detailsMeal = (idMeal) => {
    console.log(idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data =>  showDetailsMeal(data.meals[0]))
}

const showDetailsMeal = (meal) =>{
    console.log(meal);
    const searchMealsContainer = document.getElementById('searchMealsContainer');
    searchMealsContainer.textContent = ''
    const searchResultDescriptionContainer = document.getElementById('searchResultDescriptionContainer');
    searchResultDescriptionContainer.textContent ='';
    const div = document.createElement('div');
    div.classList.add('for-add');
    div.innerHTML = `
            
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${meal.strMeal}</h3>
        <h5 class="card-ingredients"><span class = "ingredients-title">Ingredients:</span> ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}</h5>
        <p class="card-text instructions">${meal.strInstructions}</p>
      </div>
    </div>
    `
    searchResultDescriptionContainer.appendChild(div);
}





/* search by id name */




/* all meals section */
const loadMeals = () =>{
    const url= `https://www.themealdb.com/api/json/v1/1/categories.php`
    fetch(url)
    .then(response => response.json())
    .then(data => showMeals(data.categories))
}
loadMeals();

const showMeals = (allMeals) =>{
    console.log(allMeals);
    for(const meal of allMeals){
        console.log(meal);
        const allMealsContainer = document.getElementById('allMealsContainer');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${meal.strCategoryThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strCategory}</h5>
                      <p class="card-text">${meal.strCategoryDescription.slice(0,250)}...</p>
                      <button type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        allMealsContainer.appendChild(div);
    }
}

/* all meals end */