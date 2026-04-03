import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    await connectDB();

    // Simple regex search on title, author, and category
    // For more advanced search, use Atlas Search or $text index
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    // Map to match the frontend expected structure if necessary
    const mappedBooks = books.map((book) => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      fileUrl: book.fileUrl,
      year: book.publishedYear, // map publishedYear to year
      category: book.category,
      size: book.size,
    }));

    return NextResponse.json({ results: mappedBooks });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
