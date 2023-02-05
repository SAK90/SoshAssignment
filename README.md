# Sosh backend intern assignment response

This is the reponse to the assignment for the position of backend intern. The tech stack used is NodeJS, ExpressJS, MongoDB, Mongoose and JWT for developing the application. And I have used Mocha and Chai for writing the tests.



## Installation

Clone the repository and install the dependencies.
```
git clone https://github.com/SAK90/SoshAssignment.git
npm install
```

Create a .env in the root directory file and add the MONGODB_URI and jwt SECRET_KEY in the dotenv file.
Register a user in the database with the following credentials
```
{
    "Name":"User",
    "Email":"user@gmail.com",
    "Password":"abc123"
}
```


Run the command to run the tests
```
npm test
```
Tests:
* Login
* Create Blog
* Update Blog
* Delete Blog
* Get Blogs
* Logout 
* Create Blog
* Update Blog
* Delete Blog
* Get Blogs

The last four tests fails as the user has logged out.
                  
