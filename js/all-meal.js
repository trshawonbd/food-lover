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

        

        /* 
        
                        <div class="col">
                  <div class="card h-100">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
                </div>
                */

    }
}
