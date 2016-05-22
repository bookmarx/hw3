# hw3

Phase 1 branch: master-phase-1
Phase 2 branch: master-phase-2




App Structure
```
/client    -- Public HTML Served by the Node Server, client-side app

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
