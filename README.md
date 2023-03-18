# What's Cooking? 

A basic recipe web app build with Rails and React.

## Get set up

### With docker-compose

1. run `rails generate dockerfile --compose`. This will generate a docker-compose file and make a change to the Dockerfile. Type `y` when prompted.
2. run `docker-compose build --build-arg GID=1000 --build-arg UID=1000 web`
3. run `docker-compose up` to start the server. in another terminal run `docker-compose run web bash`, this will open up a terminal in the docker context. 
4. run `bin/rails db:migrate` to set up the database schema.
5. run `bundle exec rake backfill_initial_data:run`. This will start a task that populates the db with records. It takes a long time to run, and will output the id of every recipe that gets created. You can ctrl+c out of it if you don't want to wait for it to finish and think you have enough recipes to play around with.
6. type  `exit` when you are done to close the terminal.

### Running locally

1. run `bundle install`. (assumes you have [Bundler](https://bundler.io/guides/getting_started.html) installed)
2. run `rails db:create`, followed by `rails db:migrate`. This will set up your database and schema. 
3. Run step 5 under the docker instructions to populate the db with data.
4. Run `yarn install` to build your node_modules.
5. Run `bin/dev` to start the server.

Navigate to localhost:3000 and you should see a list of recipes. 

## Behavior

As a visitor...

- [x] I should be able to see a list of recipes in a paginated list
- [x] I should be able to filter recipes on category
- [x] I should be able to search recipes by ingredients, seeing the recipes with the most matches first
  *pagination NOT working with this atm, limiting to 50 results*
- [ ] I should be able to search for recipes by title
- [ ] The recipe author should be a clickable link and I should be able to see a list of recipes by that author when clicked
- [ ] I should be able to create a new user and log in and out.
- [ ] I should be able to see a recipes ratings

As a user...
- [ ] I should be able to like/save recipes
- [ ] I should be able to see my liked/saved recipes
- [ ] I should be able to create new recipes
- [ ] I should be able to edit and delete my recipes
- [ ] I should be able to rate other users recipes
- [ ] I should be able to delete my account

## DB Schema

<img width="1056" alt="Screenshot 2023-03-18 at 15 08 32" src="https://user-images.githubusercontent.com/12724098/226112175-44b381a4-4474-44cb-942a-93f3d7b6bdae.png">

Ideally the ingredients.item would be cleaned up/parsed out and there would be a recipe_ingredients table that would store amount, unit recipe_id and ingredient_id. The ingredients table could then focus on storing the actual product/item and be deduped and indexed better.
