require "test_helper"

class RecipesHelperTest < ActionView::TestCase
  test "filter should get recipes where ingredients match" do
    assert_equal 3, filter_recipes_by_ingredients(["Jell-o"]).size
    assert_equal 4, filter_recipes_by_ingredients(["Jell-o", "butter"]).size
    assert_equal 2, filter_recipes_by_ingredients(["sugar", "butter"]).size
    assert_equal 1, filter_recipes_by_ingredients(["organic eggs"]).size
  end

  test "filter should order by number of ingredients that match" do
    assert_equal(
      recipes(:all_about_jello, :cake, :donut),
      filter_recipes_by_ingredients(["Jell-o"])
    )

    assert_equal(
      recipes(:pancakes, :donut),
      filter_recipes_by_ingredients(["eggs", "butter"])
    )
  end

  test "merge json models formats items correctly" do
    rec = recipes(:pancakes)
    cat = categories(:breakfast)
    usr = users(:becky)

    expected = [{ 
      "id" => rec.id,
      "title" => rec.title,
      "cook_time" => 0,
      "prep_time" => 0,
      "image_url" => nil,
      "user_id" => usr.id,
      "category_id" => cat.id,
      "created_at" => rec.created_at.as_json,
      "updated_at" => rec.updated_at.as_json,
      author: usr.name,
      category: cat.name,
      ingredients: rec.ingredients.pluck(:item)
    }]
    assert_equal expected, merge_models_as_json(Recipe.where(id: rec.id))
  end
end
