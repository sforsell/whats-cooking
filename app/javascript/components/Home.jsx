import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const url = searchParams ? `/recipes?${searchParams}` : "/recipes";

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

  const useQueryParams = (event) => {
    const url = event.target.href
    const queryPortion = url.substr(url.indexOf('?'), url.length)
    const query = useMemo(() => new URLSearchParams(queryPortion), [queryPortion])
    setSearchParams(query);
  };

  const searchForm = (
    <div className="row">
      <form>
        <div className="form-group">
          <div class="input-group mb-3">
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Search by ingredients: butter, salt, flour" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Search</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )

  const allRecipes = recipes.map((recipe) => (
    <div key={recipe.id} className="col-md-6 col-lg-4">
      <div className="card" style={{width: '25rem'}}>
        <img className="card-img-top" src={recipe.image_url} alt={recipe.title} />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">Prep time: {recipe.prep_time} min.</p>
          <p className="card-text">Cook time: {recipe.cook_time} min.</p>
        </div>
        <ul className="list-group list-group-flush">
          {
            recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">{ingredient}</li>
            ))
          } 
        </ul>
        <div className="card-body">
          <p>
            Author:   
            {recipe.author
              ? <a href="/" className="card-link">{recipe.author}</a>
              : "unknown"
            }
          </p>
          {recipe.category && <p>Category: <Link onClick={useQueryParams} to={`?category=${recipe.category}`} className="card-link" >{recipe.category}</Link></p>}
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
          { searchForm }
          <div className="row">
            {recipes.length > 0 ? allRecipes : noRecipe}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;