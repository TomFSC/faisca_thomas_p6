# Database connection & authorization

App use MongoDB database

Create file .env
Insert for database connection:
DATABASE_USERNAME="<your database username>",
DATABASE_PASSWORD="<your password>",
DATABASE_URL="<rest of database url>"
Insert for authorization (token):
TOKEN_ENCODING_KEY='<your encoding mode>'

# Packages

App use:
express,
mongoose(communication with database),
mongoose-unique-validator(e-mail can be use once),
bcrypt(to hash user password),
JSON web tokens(to encode token),
multer(to accept entering files in HTTP requests)

Run `npm install`

# To run the app

Run `node server`
