document
  .getElementById("handleADD")
  .addEventListener("click", () => {
    const searchText = document.getElementById("search-box").value;

    if(!searchText){
      return alert('You didn\'t wrote anything');
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        displayProduct(data.meals);
      });
  });

const displayProduct = (products) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";

  if (products) {
    products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
    <img onclick="handleAddToCart('${product.idMeal}')" class="card-img" src='${product.strMealThumb}'  alt=""/>
    <h2 class="food-name">${product.strMeal.slice(0, 15)}</h2>    
    `;
      foodContainer.appendChild(div);
    });
  } else {
    foodContainer.innerHTML = "<h2>No food matches your search!</h2>";
  }
};

const handleAddToCart = (info) => {
  const singleContainer = document.getElementById("instent-show");
  singleContainer.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    .then((res) => res.json())
    .then((data) => {
      const oneMale = data.meals[0];

      const div = document.createElement("div");
      div.classList.add("card2");

      div.innerHTML = `
      <img class='card-img2' src='${oneMale.strMealThumb}'  alt=""/>
      <h2 class="food-name2">${oneMale.strMeal}</h2>
      <h4 class='ingre'>Ingredients</h4>
      <ul class="pg">
        <li>'${oneMale.strIngredient1}'</li>
        <li>'${oneMale.strIngredient2}'</li>
        <li>'${oneMale.strIngredient3}'</li>
        <li>'${oneMale.strIngredient4}'</li>
        <li>'${oneMale.strIngredient5}'</li>
        <li>'${oneMale.strIngredient6}'</li>
        <li>'${oneMale.strIngredient7}'</li>
      </ul>
      `;
      singleContainer.appendChild(div);
    });
};
