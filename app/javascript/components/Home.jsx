import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const offsetParam = useState("");
  const limitParam = useState("");

  useEffect(() => {
    console.log
    const url = "/";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }, []);

  const allRecipes = recipes.map((recipe) => (
    <div key={recipe.id} className="col-md-6 col-lg-4">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src={recipe.image_url} alt={recipe.title} />
        <div class="card-body">
          <h5 class="card-title">{recipe.title}</h5>
          <p class="card-text">Prep time: {recipe.prep_time} min.</p>
          <p class="card-text">Cook time: {recipe.cook_time} min.</p>
        </div>
        <ul class="list-group list-group-flush">
          {
            recipe.ingredients.map((ingredient) => (
              <li class="list-group-item">{ingredient}</li>
            ))
          } 
        </ul>
        <div class="card-body">
          <p>
            Author:  
            {recipe.author
              ? <a href="#" class="card-link">{recipe.author}</a>
              : "unknown"
            }
          </p>
          {recipe.category && <p>Category: <a href="#" class="card-link">{recipe.category}</a></p>}
        </div>
      </div>
    </div>
  ));
  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet...
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid">
        <div className="container py-5">
          <h1 className="display-4">Recipes</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {recipes.length > 0 ? allRecipes : noRecipe}
          </div>
        </main>
      </div>
    </>
  );
};

export default Recipes;