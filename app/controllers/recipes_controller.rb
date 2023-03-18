class RecipesController < ApplicationController
  include RecipesHelper

  def index
  end

  def show
    params = recipe_params
    limit = params[:limit] || 20
    offset = params[:offset] || 0

    recipes = Recipe.all
    if params[:category]
      recipes = recipes.joins(:category).where('categories.name = ?', params[:category])
    end

    @recipes = merge_models_as_json(
      recipes.includes(:category, :author, :ingredients).limit(limit).offset(offset)
    )

    render json: @recipes
  end

  def search
    @recipes = merge_models_as_json(
      filter_recipes_by_ingredients(search_params[:items])
    )
    render json: @recipes
  end

  private

  def recipe_params
    params.permit(:category, :limit, :offset)
  end

  def search_params
    params.permit(items: [])
  end
end
