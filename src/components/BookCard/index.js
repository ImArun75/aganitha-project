import React from 'react';
import './index.css'

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220?text=No+Cover';

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} className="book-image" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Author: {book.author_name?.[0] || 'Unknown'}</p>
      <p className="book-year">Year: {book.first_publish_year || 'N/A'}</p>
    </div>
  );
}

export default BookCard;