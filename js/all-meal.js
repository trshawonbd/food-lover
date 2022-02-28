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
    const errorForWriteNothing = document.getElementById('error-for-write-nothing')
    errorForWriteNothing.style.display = 'none';
    const searchMealsContainer = document.getElementById('searchMealsContainer');
    searchMealsContainer.textContent = ''
    const searchResultDescriptionContainer = document.getElementById('searchResultDescriptionContainer');
    searchResultDescriptionContainer.textContent ='';
    
    const searchValue = document.getElementById('search-text').value;
    if(searchValue === ''){
        const errorForWriteNothing = document.getElementById('error-for-write-nothing')
        errorForWriteNothing.style.display = 'block';
        const searchMealsContainer = document.getElementById('searchMealsContainer');
        searchMealsContainer.textContent = ''
        toggleSpinner('none')
    }
    else{
        document.getElementById('search-text').value =''
        /* console.log(searchValue); */
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showSearchMeal(data.meals))

    }

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
       /*  console.log(meal); */
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
   /*  console.log(idMeal); */
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    /* console.log(url) */
    fetch(url)
    .then(res => res.json())
    .then(data =>  showDetailsMeal(data.meals[0]))
}

const showDetailsMeal = (meal) =>{
   /*  console.log(meal); */
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
        <p class="card-text youtube"><a href="${meal.strYoutube}">Youtube Link</a></p>
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
    /* console.log(allMeals); */
    for(const meal of allMeals){
       /*  console.log(meal); */
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

/* popular Ingredients start */
const loadIngredients = () =>{
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    fetch(url)
    .then(res => res.json())
    .then (data => showIngredients(data.meals))
}
loadIngredients()

const showIngredients = (data) => {
    const meals = data.slice(0,14)
   /*  console.log(meals) */
    for(const meal of meals){
       /*  console.log(meal) */
        const ingredientContainer = document.getElementById('ingredientContainer');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strIngredient}</h5>
                      <p class="card-text">${meal.strDescription.slice(0,200)}</p>
                      <button type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        ingredientContainer.appendChild(div);

    }
}

/* popular Ingredients end */


/* random meal start */
const randomMeal = () =>{
    const url = `https://www.themealdb.com/api/json/v1/1/random.php`
    fetch(url)
    .then(res => res.json())
    .then(data => showRandomMeal(data.meals[0]))
}
randomMeal()

const showRandomMeal = (meal) =>{
/*     console.log(meal)
 */    const randomMealContainer = document.getElementById('randomMealContainer')
    const div = document.createElement('div')
    div.classList.add('card')
    div.style.width = '25rem'
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text"><span class = "ingredients-title">Catagories:</span> ${meal.strCategory}</p>
    <p class="card-text"><span class = "ingredients-title">Region:</span> ${meal.strArea}</p>
  </div>
  <div class="card-body">
    <a href="${meal.strYoutube}" class="card-link">Youtube Link</a>
  </div>
            
    `
    randomMealContainer.appendChild(div)

}

/* random meal end */


/* start country */

const loadCountry = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    fetch(url)
    .then(res => res.json())
    .then(data => showCountry(data.meals))

}

loadCountry();

const showCountry = (countries) =>{
    console.log(countries)
    for(const country of countries){
        console.log (country)
        const countriesContainer = document.getElementById('countriesContainer');
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
    
        <div class="p-3 border card" onclick = "findByCountry('${country.strArea}')"> <span class="card-text">  ${country.strArea} </span></div>
      
        
        `
        countriesContainer.appendChild(div)

    }
}

const findByCountry = (countries) =>{
    const countryMealsContainer = document.getElementById('countryMealsContainer');
    countryMealsContainer.textContent = ''
    document.getElementById('country-meal').style.display = 'none'
    
    const url =`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countries}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showMealByCountry(data.meals))
}

const showMealByCountry = (meals) =>{
    for(const meal of meals){
        console.log(meal)
        const countryMealsContainer = document.getElementById('countryMealsContainer');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                  </div>
        `
        countryMealsContainer.appendChild(div);
        document.getElementById('country-meal').style.display = 'block'

    }
}




/* start letter */

const loadLetter = (id) =>{
    const letterMealsContainer = document.getElementById('letterMealsContainer');
    letterMealsContainer.textContent = ''
    document.getElementById('letter-meal').style.display = 'none'
    const foundletter = document.getElementById(id)
    const found = foundletter.innerText
    const input = found.toLowerCase();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
    /* console.log(url) */
    fetch (url)
    .then(res => res.json())
    .then(data => showMealsByLetter(data.meals))
}

const showMealsByLetter = (meals) =>{
    /* console.log(meals) */
    for (const meal of meals){
        console.log(meal)
        const letterMealsContainer = document.getElementById('letterMealsContainer');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">Instruction: ${meal.strInstructions.slice(0,250)}...</p>
                      <button type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        letterMealsContainer.appendChild(div);
        document.getElementById('letter-meal').style.display = 'block'
    }
}