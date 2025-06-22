# ✅ Library Management Backend System

This is a backend system for managing a library. You can create, read, update, delete books and also manage borrowing activities.

## Features

### Book Management
- **Create Book**: Add a new book.
- **Get all Books Details**: View details of all book.
- **Get Book Details**: View details of a specific book.
- **Update Book**: Edit details of an existing book.
- **Delete Book**: Remove a book from the DB.

### Borrow Records
- **Create Borrow Record**: Create when a book is borrowed.
- **Borrow Summary**: View a summary of borrowed books using mongodb aggregation pipeline.

## API Endpoints

### Books
- `POST /api/books` - Create a new book
- `GET /api/books` - Get all book details with filtering options
- `GET /api/books/:bookId` - get book by id
- `PUT /api/books/:bookId` - update book by id
- `DELETE /api/books/:bookId` - Delete a book

### Borrow
- `POST /api/borrow` - Create borrow record
- `GET /api/borrow` - Get borrowd books summary

## Tech Stack
- Nodejs / Express with TypeScript
- MongoDB with Mongoose (Database)

## How to setup and run locally
1. Clone the repo
2. create a `.env` file with `MONGO_URI` at root
3. Run `npm install`
4. Build with ts `npm run build`
5. Start server using `npm start`
6. Use Postman or any API tool to test the endpoints.

---
