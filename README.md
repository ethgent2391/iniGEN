# iniGEN
.ini server setting generator

## Link to App - https://quiet-basin-26647.herokuapp.com/

## Overview

iniGEN is an application created for the video game server community.  It enables game hosts to easily change game settings and save these changes for future reproduction.

### Problem

Game servers use ini files to set a wide variety of options for server based games such as player name, player strength, number of lives, types of weapons, etc.  Most coders are gamers but not all gamers understand code and ini files can be thousands of lines of code.  

### iniGEN Proposal

Create a simple application that automates the ini update function so that non-coders can easily make the changes they desire to customize their gaming experience.  

For the purpose of this application given the time constraint we focused on the Unreal gaming engine ini file structure.  (A significant portion of the popular games currently on the market are running on the Unreal engine.)

## Technology Used

Our application incorporates the following technology.
* Node and Express Server 
* Heroku
* MySQL Database
* Handlebars
* Bootstrap
* CSS
* Animate.css
* Vegas.js
* Additional Node Modules
  * cors
  * ini
  * multer
  
## The Result

The result is a simple app that breaks apart an ini file, enabling the user to make changes with input fields instead of having to understand code.  The technology implements the desired changes and saves the new file where the User directs it.  A very simple process for a once complicated procedure.  
