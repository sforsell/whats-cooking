namespace :backfill_initial_data do
  desc 'Backfills json to the database. Ignores dupe users & categories'
  task run: :environment do
    file_path = Rails.root.join('lib', 'tasks', 'recipes-en.json')
    data = JSON.load(File.open(file_path))

    data.each do |obj|
      user = create_or_find_user(obj['author'])
      category = create_or_find_category(obj['category'])
      recipe = Recipe.create!(
        title: obj['title'],
        cook_time: obj['cook_time'],
        prep_time: obj['prep_time'],
        category: category,
        author: user,
        image_url: obj['image']
      )
      create_ingredients(recipe, obj['ingredients'])
      Rails.logger.info(recipe.id)
    end
  end
end

def create_or_find_user(name)
  return if name.blank? || name == 'deleteduser'

  User.create!(name: name, password: 'password')
rescue ActiveRecord::RecordNotUnique
  User.find_by_name(name)
end

def create_or_find_category(name)
  return if name.blank?

  Category.create!(name: name)
rescue ActiveRecord::RecordNotUnique
  Category.find_by_name(name)
end

def create_ingredients(recipe, ingredients)
  ingredients.each { |item| Ingredient.create!(item: item, recipe: recipe) }
end