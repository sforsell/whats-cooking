import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchParams] = useSearchParams();
  const [offset, setOffset] = useState(0);
  const params = Object.fromEntries([...searchParams]);

  const handleOffsetHrefStrings = (num) => {
    const query = `?${searchParams.get('category') ? 'category='+ searchParams.get('category') + '&' : ''}`
    return query + `offset=${num}`
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.search.value.length === 0) {
      return;
    }
    url = event.target.search.value.split(/,\s*/).reduce(
      (queryString, ingr) => queryString + "items[]=" + ingr + "&",
      "/recipes/search?"
    );
    console.log(url)
    // fetchRecipes(url);
  }

  useEffect(() => {
    // handle search params
    const currentParams = Object.fromEntries([...searchParams]);
    if (currentParams.offset) {
      if (parseInt(currentParams.offset) === 0) {
        setOffset(0);
      } else { 
        setOffset(parseInt(offset) + parseInt(currentParams.offset));
      }
    } 
    if (Object.keys(currentParams).length > 0) {
      fetchRecipes(`/recipes?${searchParams.toString()}`);
    }
  }, [searchParams]);

  const fetchRecipes  = (url) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }

  useEffect(() => {
    const url = Object.keys(params).length > 0 ? `/recipes?${searchParams.toString()}` : "/recipes";
    fetchRecipes(url);
  }, []);

  const searchForm = (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="search" id="search-terms" placeholder="Search by ingredients: butter, salt, flour" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Search</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const allRecipes = recipes.map((recipe) => (
    <div key={recipe.id} className="col-md-6 col-lg-3">
      <div className="card" style={{width: '20rem'}}>
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
          {recipe.category && <p>Category: <Link to={`?category=${recipe.category}`} className="card-link" >{recipe.category}</Link></p>}
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
  const pagination = (
    <div className="row">
      <nav aria-label="result pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${offset === 0 ? 'disabled' : ''}`}>
            <a className="page-link" href={handleOffsetHrefStrings(offset-20)} aria-label="Previous">
              {"< Previous"}
            </a>
          </li>
          <li className="page-item disabled"> 
          </li>
          <li className={`page-item ${recipes.length < 20 ? 'disabled' : ''}`}>
            <a className="page-link" href={handleOffsetHrefStrings(offset+20)} aria-label="Next">
              {"Next >"}
            </a>
          </li>
        </ul>
      </nav>
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
          {recipes.length > 0 && pagination}
        </main>
      </div>
    </>
  );
};

export default Home;