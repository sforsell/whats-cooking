# What's Cooking? 

A basic recipe web app build with Rails and React.

## Get set up

### With docker-compose

1. run `rails generate dockerfile --compose`. This will generate a docker-compose file and make a change to the Dockerfile. Type `y` when prompted.
2. run `docker-compose up --build`. If you'd rather build separately you need to pass in `$UID` and `$GID` with  `--build-arg` with your `docker-compose build` command. Then followed by `docker-compose up`. add `-d` if you want it to run in the background.

### Running locally

1. run `bundle install`. (assumes you have [Bundler](https://bundler.io/guides/getting_started.html) installed)
2. run `rails db:create`, followed by `rails db:migrate`. Thiswill set up your database and schema. 
3. Run `yarn install` to build your node_modules.
4. Run `bin/dev` to start the server. 

Navigate to localhost:3000 and you should see a list of recipes. 

## Behavior

As a visitor...

- [ ] I should be able to see a list of recipes in a paginated list
- [x] I should be able to filter recipes on category
- [ ] I should be able to serach for recipes by title
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
