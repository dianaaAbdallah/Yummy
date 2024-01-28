// &&&&&&&&&&&&&&&&variables&&&&&&&&&&&&&&
let mealsData = document.getElementById("mealsData");
let searchData = document.querySelector(".searchData");
// let submitBtn = document.getElementById("submitBtn");

// ^^^^^^^^^^^Events^^^^^^^^^^^^^^^^^^^^^^^^^^^
$(".loading-screen").fadeIn(500)

$(window).ready(function(){
    
    closeLoader();
    DisplayDefaultMails();
})
$(".openIcon").click(function(){
    openNav()
    for (let i = 0; i < $(".links li").length; i++) {
        $(".links li").eq(i).animate({
            top: 0
        },  (i+$(".links li").length)*200)}
   
})
$(".closeIcon").click(function(){
 
    closeNav()
    $(".links li").animate({
        top: 300
    }, 500)
})
// ^^^^^^^^^^^Function^^^^^^^^^^^^^^^^^^^^^^^^^^^
// !!!!!!!!!!!!!!!!!!!!!!!!11close loader
function closeLoader()
{
    $(".loader").fadeOut(200,function()
    {
      $(".loading-screen").remove() 
      $("body").css({"overflow":"auto"})
    }) 
}

// !!!!!!!!!!!!!!!!!!!!!!!open Navbar
function openNav(){
    $(".nav_menu").animate({
        left: 0
    }, 500)
  
    $(".closeIcon").css("display","block");
    $(".openIcon").css("display","none");
 
}
// !!!!!!!!!!!!!!!!!!!!!!!Close Navbar
function closeNav()
{$(".nav_menu").animate({
    left: "-300px"
}, 200)
$(".openIcon").css("display","block")
$(".closeIcon").css("display","none")}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!Display Default Meals
async function DisplayDefaultMails() {
    closeNav()
   mealsData.innerHTML = ""
   searchData.innerHTML = "";
    $(".loading-screen").fadeIn(400);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()


    
    displayMeals(response.meals)
   
    closeLoader()
    
}


function displayMeals(mealData) {
    let cartoona = "";

    for (let i = 0; i < mealData.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${mealData[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealData[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${mealData[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
// console.log(cartoona)
 mealsData.innerHTML = cartoona
}
async function getMealDetails(mealID)
{

    closeNav()
    mealsData.innerHTML = ""
    $(".loading-screen").fadeIn(400)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
  
    closeLoader()

}
function displayMealDetails(meal) {


    let ingrdientCartonaa = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingrdientCartonaa += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingrdientCartonaa}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    mealsData.innerHTML = cartoona
}
// !!!!!!!!!!!!!!!!!!!!Search
function searchContent()
{
    closeNav()
    searchData.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    mealsData.innerHTML = ""
}
async function searchByName(name)
{
    closeNav()
    mealsData.innerHTML = ""
    $(".loading-screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    if(response.meals!=null)
    {displayMeals(response.meals)}
else{
    displayMeals([]) 
}
    
closeLoader()
}
async function searchByFirstLetter(fName) {
    closeNav()
    mealsData.innerHTML = ""
    $(".loading_screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fName}`)
    response = await response.json()

    if(response.meals!=null)
    {displayMeals(response.meals)}
else{
    displayMeals([]) 
}
closeLoader()

}
// !!!!!!!!!!!!!!!!!!category
async function displayCategoriesName() {
    closeNav()
    mealsData.innerHTML = ""
    $(".loading_screen").fadeIn(400)
    searchData.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
console.log(response.categories)
  displayCategories(response.categories)
  closeLoader()

}
function displayCategories(categoriesArr)
{
   
        let cartoona = "";
    
        for (let i = 0; i < categoriesArr.length; i++) {
            cartoona += `
            <div class="col-md-3">
                    <div onclick="getCategoryMeals('${categoriesArr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${categoriesArr[i].strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${categoriesArr[i].strCategory}</h3>
                            <p>${categoriesArr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
            </div>
            `
        }
    
        mealsData.innerHTML = cartoona
    
}
async function getCategoryMeals(category) {
    mealsData.innerHTML = ""
    $(".loading_screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    closeLoader()

}


// !!!!!!!!!!!!!!!!!!!!!Display meals by areas
async function getArea() {
    closeNav()
    mealsData.innerHTML = ""
    $(".loading_screen").fadeIn(400)

    searchData.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
  

    displayAreas(respone.meals)
    closeLoader()

}

function displayAreas(areaArr) {
    let cartoona = "";

    for (let i = 0; i < areaArr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="displayAreaDetails('${areaArr[i].strArea}')" class="rounded-2 text-center div_cursor">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areaArr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    mealsData.innerHTML = cartoona
}
async function displayAreaDetails(area) {
    mealsData.innerHTML = ""
    $(".loading_screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    closeLoader()

}
// !!!!!!!!!!!!!!!!!!!Display meals by Ingredients
async function getIngredients() {
    closeNav()
    mealsData.innerHTML = ""
    $(".loading-screen").fadeIn(400)

    searchData.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
  closeLoader()

}
function displayIngredients(ingredientArr) {
    let cartoona = "";

    for (let i = 0; i < ingredientArr.length; i++) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="displayIngredientsDetails('${ingredientArr[i].strIngredient}')" class="rounded-2 text-center div_cursor">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredientArr[i].strIngredient}</h3>
                        <p>${ingredientArr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    mealsData.innerHTML = cartoona
}
async function displayIngredientsDetails(ingredients) {
    mealsData.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
  closeLoader()

}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!! contact section
function showContacts() {
    closeNav()
    mealsData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="ValidateName()" type="text" class="form-control" placeholder="Enter Your Name">
                <span id="nameError" class="alert alert-danger w-100  mt-2 d-none">
               
                </span>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="ValidateEmail()" type="email" class="form-control " placeholder="Enter Your Email">
                <span id="emailError" class="alert alert-danger w-100 mt-2 d-none">
                   
                </span>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="phoneValidation()"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="ageValidation()"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageError" class="alert alert-danger w-100 mt-2 d-none">
                
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="passwordValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordError" class="alert alert-danger w-100 mt-2 d-none">
                   
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="repasswordValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordError" class="alert alert-danger w-100 mt-2 d-none">
                    
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `



}
// !!!!!!!!!!!!!!!!!!!!!!validations
var validName=false;
var validAge=false;
var validPhone=false;
var validEmail=false;
var validPassword=false;
var validRepassword=false;

function ValidateName() {
    let email = document.getElementById("nameInput").value;
    let lblError = document.getElementById("nameError");
 
    let expr = /^[a-zA-Z ]+$/;
    if (!expr.test(email)) {

        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML="  Special characters and numbers not allowed"

    }
    else{
        document.getElementById("nameError").classList.replace("d-block", "d-none")
    validName=true;
    }
    validAllInputs()
}
function ValidateEmail() {
    let email = document.getElementById("emailInput").value;
    let lblError = document.getElementById("emailError");
    lblError.innerHTML = "";
    let expr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!expr.test(email)) {
        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML=" Email not valid *exemple@gmail.com"
    }
    else{
        lblError.classList.replace("d-block", "d-none")
    validEmail=true;
    }
    validAllInputs()
}

function phoneValidation() {
    let phone = document.getElementById("phoneInput").value;
    let lblError = document.getElementById("phoneError");
    lblError.innerHTML = "";
    let expr = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!expr.test(phone)) {

        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML=" Enter valid Phone Number"

    }
    else{
        lblError.classList.replace("d-block", "d-none")
     validPhone=true;
     }
  
    validAllInputs()

}
function ageValidation() {
    let age = document.getElementById("ageInput").value;
    let lblError = document.getElementById("ageError");
    lblError.innerHTML = "";
    let expr = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (!expr.test(age)) {

        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML=" Enter valid age"

    }
    else{
        lblError.classList.replace("d-block", "d-none")
   validAge=true }
    validAllInputs()
}

function passwordValidation() {
    let password = document.getElementById("passwordInput").value;
    let lblError = document.getElementById("passwordError");
    lblError.innerHTML = "";
    let expr = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (!expr.test([password])) {

        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML="  Enter valid password *Minimum eight characters, at least one letter and one number:*"

    }
    else{
   lblError.classList.replace("d-block", "d-none")
   validPassword=true ;
}
    validAllInputs()
}


function repasswordValidation() {
    let lblError = document.getElementById("repasswordError");  
  if(document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value)
 {
    lblError.classList.replace("d-block", "d-none")
}
else{
        lblError.classList.replace("d-none", "d-block")
        lblError.innerHTML=" Enter valid repassword"
validRepassword=true
    }
    
    validAllInputs()   
    

}
function validAllInputs()
{
    if (validName &&
    validPhone &&
    validEmail&&
    validAge &&
   validPassword &&
   validRepassword) {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled", true)
}
}
