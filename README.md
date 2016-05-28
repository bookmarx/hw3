# hw3

[ ![Codeship Status for bookmarx/hw3](https://codeship.com/projects/30b9c5e0-029a-0134-086d-663251dd2b3e/status?branch=master)](https://codeship.com/projects/153629)

### Phase

Phase 1 branch: master-phase-1

Phase 2 branch: master-phase-2

###Module Building

Using webpack: https://webpack.github.io/

###App Structure
```
/client            -- Generated by webpack, client-side app
    index.html     -- Only file not generated by webpack
/client-webpack    -- Webpack files compiled for client

/server    -- The server-side app
   /api_v1 -- Version 1 of our API, contains each api as a subdirectory
      /bookmark                 -- API for bookmark
         bookmark.controller.js -- Controller Logic
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
    /views       -- EJS Templates
       /partials -- EJS Partials
    app.js       -- Main App
    db.js        -- DB Setup
    logger.js    -- Logger Util

    Procfile     -- Heroku settings
    bower.json   -- Bower Dependencies
    package.json -- Node Dependencies
    gulpfile.js  -- Dev/Build Tools

```
