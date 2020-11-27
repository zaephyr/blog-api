<br />
<p align="center">
  <h3 align="center">Blog-api</h3>

  <p align="center">
    Simple REST api
    <br />
    <a href="https://pacific-fjord-55363.herokuapp.com/api/v1/">Link to a blog api</a>
    ·
    <a href="https://github.com/zaephyr/blog-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/zaephyr/blog-api/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [About the Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)

<!-- ABOUT THE PROJECT -->

## About The Project

Works as Backend for:

-   Blog-nuxt: [Live Page](http://wooden-self.surge.sh/) **||** [Repository](https://github.com/zaephyr/blog-nuxt)

You can call the API `https://pacific-fjord-55363.herokuapp.com/api/v1/ROUTE/ENDPOINT`, this way

> For Example: `https://pacific-fjord-55363.herokuapp.com/api/v1/blogs`

Logging in before calling other endpoints is **necessary**. Calling `/auth/login` with `username and password` will authenticate the user, create a session and generate a _JsonWebToken_ for the API to verify on each call.

## Endpoints

|     ROUTE     |   METHOD   |     ENDPOINT      |         PURPOSE          |
| :-----------: | :--------: | :---------------: | :----------------------: |
|   _`/auth`_   |  **POST**  |    _`/login`_     |        User Login        |
|   _`/auth`_   |  **POST**  |    _`/logout`_    |       User Logout        |
|   _`/auth`_   |  **POST**  |    _`/signup`_    |       User Signup        |
|   _`/user`_   |  **GET**   |      _`/me`_      |    View Your Profile     |
|   _`/user`_   |  **GET**   |   _`/me/blogs`_   |     View Your Drafts     |
|   _`/user`_   | **PATCH**  |   _`/updateMe`_   |     Update Your Info     |
|   _`/user`_   | **DELETE** |   _`/deleteMe`_   |   Delete Your Account    |
|   _`/blog`_   |  **GET**   |                   |    Get All Blog Posts    |
|   _`/blog`_   |  **POST**  |                   |    Create a New Post     |
|   _`/blog`_   |  **GET**   |     _`/:id`_      |     View a Blog Post     |
|   _`/blog`_   | **PATCH**  |     _`/:id`_      |    Update a Blog Post    |
|   _`/blog`_   | **DELETE** |     _`/:id`_      |    Delete a Blog Post    |
| _`/blog/:id`_ |  **GET**   |  _`/messages/`_   | Get All comments on Post |
| _`/blog/:id`_ |  **POST**  |  _`/messages/`_   |  New Comment on a Post   |
| _`/blog/:id`_ |  **GET**   | _`/messages/:id`_ |      View a Comment      |
| _`/blog/:id`_ |  **PUT**   | _`/messages/:id`_ |      Edit a Comment      |
| _`/blog/:id`_ | **DELETE** | _`/messages/:id`_ |     Delete a Comment     |

### Built With

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/zaephyr/blog-api.git
```

2. Install NPM packages

```sh
npm install
```
