# Innowise Lab Internship: Level 1: Clever to-do list

To-do list app for Innowise Lab Internship by Uladzislau Rahinia. Created using React and Firebase

## Task

You can find task requirements [here](https://docs.google.com/document/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA/edit)

## How to run the app

This app is hosted on Github Pages. You can use link [here](https://uladzislau-rahinia.github.io/Innowise-Practice-Level-1/)

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

