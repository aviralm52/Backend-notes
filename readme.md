Hello -> server -> server-express -> APIs -> Middlewares -> MongoDB -> MVC -> short-url -> Server_Site_Rendering -> Auth(stateful authenticaion) -> JWT(stateless authentication) -> FileUpload -> Blog


### MVC - Model View Controller
    Model - mongoose schema
    View - 
    Controller - functions for handeling api calls
    Routes - router & get/post/patch/delete requests
    Connection.js - creating function for connection using mongoose 

## EJS
    EJS is a template engine for server site rendering, we can display html code using node and express but it will not be feasible if there is styling involved in it so we use template engine which allow us to write HTML code in a different file
    
## JWT
    json web tokens are used for stateless authentication, in case of sessionId when we refresh the page or restart the server we get logged out as cookie is refreshed, but JWT will remain logged in.

## Cookies 
    cookies are domain specific, and we can also set expiry for it