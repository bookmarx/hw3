#API Structure
```
/api_v#
   /apiName                  - the name for the api (i.e bookmark)
      apiName.controller.js  - the controller
      index.js               - the api routing

```
The api folder houses the controller and the routing logic.

Each directory refers to a related group of resources like bookmark which handles
the routing in the `index.js` and the logic that is execute to the corresponding
route is located in the file postfixed with .controller.js
