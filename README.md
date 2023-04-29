# PlasmaBlogs

This is a [blogging website](https://plasmablogs.netlify.app) that I built using React JS and Firebase. It allows users to create an account, login and create posts. Here's a brief overview of the features and how to use them:

## Features

### User Authentication

Users can create an account with their email and password or sign in with their Google account. Firebase Authentication is used to handle the user authentication process.

### Post Creation

Logged-in users can create new posts by clicking the "New Post" button on the navbar. They'll need to enter a title and content for the post. Posts are stored in a Firebase Realtime Database.

### Post List

The home page displays a list of all the posts in the database. Each post shows the title, content, author name, and the date it was created.

### Post Detail

Clicking on a post in the post list will take you to the post detail page. This page displays the full content of the post, the author name, and the date it was created. If the current user is the author of the post, they'll see an "Edit" button that will take them to the post edit page.

### Post Edit

Logged-in users can edit their own posts by clicking the "Edit" button on the post detail page. They'll be taken to a form where they can update the title and content of the post.

## Conclusion

That's a brief overview of the features of this website. It's a simple blogging platform that demonstrates how to use Firebase with React JS for user authentication and database management.
