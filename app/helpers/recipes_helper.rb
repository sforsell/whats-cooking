module RecipesHelper
  def filter_recipes_by_ingredients(ingredients)
    sql_str = "i.item ilike '%#{ingredients.shift}%'"
    sql_ilike_clause = ingredients.inject(sql_str) { |clause, item| clause + " or i.item ilike '%#{item}%'" }
    Rails.logger.info(sql_ilike_clause)
    where = """
      recipes.id in (
        select r.id from recipes r 
        join ingredients i on i.recipe_id = r.id
        where #{sql_ilike_clause}
        group by r.id order by count(r.id) desc limit 50)
    """
    Recipe.includes(:category, :author, :ingredients).where(where)
  end

  def merge_models_as_json(recipes)
    recipes.map do |recipe|
      recipe.as_json.merge({author: recipe.author&.name})
      .merge({category: recipe.category&.name})
      .merge({ingredients: recipe.ingredients.pluck(:item).as_json})
    end
  end
end
