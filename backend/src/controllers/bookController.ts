import { Request, Response } from 'express';
import Book from '../models/Book';

export const searchBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;

    if (!query) {
      res.status(200).json({ results: [] });
      return;
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    const mappedBooks = books.map((book) => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      fileUrl: book.fileUrl,
      year: book.publishedYear,
      category: book.category,
      size: book.size,
    }));

    res.status(200).json({ results: mappedBooks });
  } catch (error) {
    console.error('Book search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
