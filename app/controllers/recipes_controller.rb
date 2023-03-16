class RecipesController < ApplicationController
  def index
    limit = params[:limit] || 20
    offset = params[:offset] || 0

    recipes = Recipe.all
    if params[:category]
      recipes = recipes.joins(:category).where('categories.name = ?', params[:category])
    end

    @recipes = recipes.includes(:category, :author, :ingredients)
                      .limit(limit).offset(offset).map do |recipe|
                        recipe.as_json.merge({author: recipe.author&.name})
                        .merge({category: recipe.category&.name})
                        .merge({ingredients: recipe.ingredients.pluck(:item).as_json})
                      end

    render json: @recipes
  end

  private

  def recipe_params
    params.permit(:category, :limit, :offset)
  end
end
