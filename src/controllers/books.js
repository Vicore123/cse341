import {
  getAllBooks as getAllBooksFromDb,
  getBookById as getBookByIdFromDb,
  createBook as createBookFromDb,
  updateBook as updateBookFromDb,
  deleteBook as deleteBookFromDb
} from '../models/books.js';

import {
  getAuthorById as getAuthorByIdFromDb
} from '../models/authors.js';

const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksFromDb();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookById = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookByIdFromDb(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    if (!id || !title || !authorId || !publicationDate) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    const existingBook = await getBookByIdFromDb(id);
    if (existingBook) {
      return res.status(400).json({ message: 'Book id already exists.' });
    }

    const existingAuthor = await getAuthorByIdFromDb(authorId);
    if (!existingAuthor) {
      return res.status(400).json({ message: 'Author id does not exist.' });
    }

    const createdBook = await createBookFromDb({ id, title, authorId, publicationDate });
    return res.status(201).json(createdBook);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create book.' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authorId, publicationDate } = req.body;

    if (!id || !title || !authorId || !publicationDate) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    const existingBook = await getBookByIdFromDb(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingAuthor = await getAuthorByIdFromDb(authorId);
    if (!existingAuthor) {
      return res.status(400).json({ message: 'Author id does not exist.' });
    }

    const updatedBook = await updateBookFromDb(id, { title, authorId, publicationDate });
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await getBookByIdFromDb(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await deleteBookFromDb(id);
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };