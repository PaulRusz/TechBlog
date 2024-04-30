# TechBlog

a blog for discussing, reviewing and finding new or old technology

Link to the deployed application can be tested here on Heroku: [Tech Blog]() and the project repository can be viewed here: [Tech Blog](https://github.com/PaulRusz/TechBlog).

## Description

This Tech Blog is a CMS style project utilising the MVC structure, routes, SQL and Handlebars templating. This website should allow users to view/edit posts, leave comments login and register.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To install the files into your local repo, using Git Bash Terminal:

1. Create a folder locally to nominate for cloning from online repo
2. Clone with SSH by

```GitBash Commands
git clone https://github.com/PaulRusz/TechBlog"
```

Additionally, please install [NodeJS](https://nodejs.org/en/) and the below npm packages

```Terminal Commands
npm i init -y
npm i
npm i bcrypt
npm i connect-session-sequelize
npm i dotenv
npm i express
npm i express-handlebars
npm i express-session
npm i handlebars
npm i inquirer
npm i mysql2
npm i nodemon
npm i sequelize
```

## Credits

N/A

## License

Licensed under the [MIT](https://opensource.org/licenses/MIT).

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Features

- Posts are viewable and you can see the author and date of the post created.
- You can freely Login and Sign Up to create new posts.
- All posts made by the author are editable and can be deleted.
- Logged in users can leave comments.
