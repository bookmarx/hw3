# HW5 - Phase 3

[ ![Codeship Status for bookmarx/hw3](https://codeship.com/projects/30b9c5e0-029a-0134-086d-663251dd2b3e/status?branch=master)](https://codeship.com/projects/153629)

### Phase

Phase 1 branch: master-phase-1 (https://cse136-team4-p1.herokuapp.com/)

Phase 2 branch: master-phase-2 (https://cse136-team4-p2.herokuapp.com/)

Phase 3 branch: master-phase-3 (https://cse136-team4-p3.herokuapp.com/)

###Module Building

Using webpack: https://webpack.github.io/

###App Structure
```
/client            -- Generated by webpack, client-side app
   /app
      index.html   -- Index file
      robot.txt    -- Robot file
/client-webpack    -- Webpack files compiled for client
    /scripts     -- Client side script compiled using webpack
    /style       -- CSS and fonts
    /views       -- EJS Templates
       /partials -- EJS Partials
/server    -- The server-side app
   /api_v1 -- DEPRECATED API Version 1
   /api_v2 -- Version 2 of our API, contains each api as a subdirectory
      /bookmark                 -- API for bookmark
         bookmark.controller.js -- Controller Logic
         bookmark.model.js      -- Bookmark DB Model
         index.js               -- Routing
      /user                     -- API for user
         user.controller.js
         user.model.js
         index.js
    /auth        -- Authentication Library
       /local    -- Local Authentication Strategy
       auth.js   -- Main Authentication Logic
       index.js  -- Authentication Routing
    /config      -- App Configurations
       /environment -- Environment Specific Configurations (i.e. production, development, stage)
       express.js   -- Express Configurations
    app.js       -- Main App
    db.js        -- DB Setup
    logger.js    -- Logger Util

    Procfile     -- Heroku settings
    bower.json   -- Bower Dependencies
    package.json -- Node Dependencies
    gulpfile.js  -- Dev/Build Tools

```

### Notable Features

1. Strong password security hashedPassword w/ random salt
1. Token using JSON Web Tokens to validate api calls and securely transport some non-vital user data.
1. Forget password with One Time Token Password reset send via NodeMailer
1. Webpack minification, optimization, custom font building reduced size from 130kb uncompressed down to < 20kb compressed
1. Webpack compiles node like module in `client-webpack` loading system for scalablity and easy maintainability
1. Good project structure, single view folder shared between client-webpack and server
1. CodeShip Continuous Integration and Deployment (heroku) with 1 unit tests

### Things that didn't make it into the build

1. Linter
1. Pagination is done, but not enough time to tests and merge
1. Service Workers, we didn't have time to implement this.
1. Note enough time to tests for all error cases


## Contributions

###Feature List
* Alex Gian (@alex_gian)
   * CSS/HTML
   * Setup/Project Structure
   * API Design (https://slack-files.com/T0W3ECZA6-F1ABE442K-cef31d9ebb)
   * Building w/ Webpack
      * Compression
      * Packaging/Bundling
      * Minification
   * Create an account        
   * Login                             
   * Logout                          
   * Forget/Change a password
      * Sessions w/ JSON Web Token
      * Hash passwords w/ random salt
* Israel Cruz (@israelcruz)
   * Add a Bookmark (client-side)     
   * Analytics
   * Server-side logger
* Zahara Jivani (@zjivani)
   * Add a Bookmark (server-side)
   * Edit a Bookmark (server-side/client-side)    
   * Pagination
* Edward Lau (@eklau)
   * Delete a Bookmark 
   * Star/Unstar a bookmark 
   * CSS/Mobile  
   * 404 Page 
* Joseph (@janz)
   * List your Bookmarks             - 
   * Sort your Bookmarks  
   * Search your Bookmarks
   * Visit a Bookmark  
   * Database Schema
* Kay Yang (@layti)
   * Categorize your bookmarks (Folder and/or Tag Style)
      * Add folder
      * Edit folder
   * Import list of bookmarks
   * Export list of bookmarks
