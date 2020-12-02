# book-project

# knex cheatsheet:

https://devhints.io/knex

# Books taken from:

https://github.com/benoitvallon/100-best-books

# Description

- LOGIN with
  username: admin
  password: vention9001
- The app starts off with a view of the main book repo (viewing all books).
- You must choose a library to view the books specific to that library and their stock.
- Incrementing or Decrementing a books stock when viewing a libraries books can be done with the "+" or "-" buttons.
- Editing a book from the Book Repo allows you to edit the book properties itself.
- Editing a book when a library has been selected allows you to only change the stock.
- Deleting a book from the Book Repo deletes the boom from all libraries with relation as well.
- Deleting a book when a library is selected will only delete it from that specific library. It will still be in the repo.
- You can add a book from the main Repo. Only the title is required. You can see the book on the last page.

# Instructions:

- Put the following in a .env file in BOOK-PROJECT folder (the main server folder)
  ```
  DB_NAME=<database name>
  DB_USER=<user name>
  DB_PASSWORD=<password>
  ```
- Run the Migrations and then Seeds
- To start you must run "yarn dev" in terminal from the main project folder and then "yarn start" from the client folder.
- LOGIN with
  username: admin
  password: vention9001
