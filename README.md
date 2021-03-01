# Innowise Lab Internship: Level 1: Clever to-do list

To-do list app for Innowise Lab Internship by Uladzislau Rahinia. Created using React and Firebase

## Task

You can find task requirements [here](https://docs.google.com/document/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA/edit)

## How to run the app

This app is hosted on Github Pages. You can use link [here](https://uladzislau-rahinia.github.io/Innowise-Practice-Level-1/)

If you want run this app locally, clone or fork this repository.

To clone use **git clone https://github.com/Uladzislau-Rahinia/Innowise-Practice-Level-1** command.

After clonning you will have to run **npm i** command to get all dependencies.

**For working locally you will need an .env file with firebase api keys. You can contact me or create your own.**

## Database snapshot
    .
    └──tasks
        └──uid                            #Unique user id generated when user was signing up
            └──date                       #Date on which task was assigned in format yyyy-mm-dd
                └──taskid                 #Unique task id generated on creating task
                      ├──description      #Task description
                      ├──status           #Task status (done or not)
                      └──text             #Task title

Screenshot for example: [here](https://imgur.com/a/koZGhWf)

## Application stack

List of additional packages I used for this app (aside from React and Firebase)

### React-router

Used to add routing into app

### Styled components

Used for more efficient and more deep style customizing

### React-toastify

Use to add Toast messages in error cases

### Date-fns

Used to format date in string for better use

### Gh-pages

Used to deploy app to Github Pages

## Folder structure
    └──src                  #Main folder for source code
        ├──api              #Holds api initializing script
        ├──app              #Holds main component of the app
        ├──components       #Small components, which don't hold any business logic, can be reused in different features
        ├──features         #Big components, representing features this app has, they hold buisness logic like fetching data
        └──index.js         #Entry point of an app, renders main component



