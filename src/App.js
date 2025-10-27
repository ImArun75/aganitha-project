import React, { useState } from 'react';
import {TailSpin} from 'react-loader-spinner'
import { GoMoveToTop } from "react-icons/go";

import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import './App.css';

function App() {
  const [loading, isLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchBooks = async (title) => {
    isLoading(true)
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await res.json();
      console.log(data)
      if (data.docs.length === 0) {
        isLoading(false)
        setError('No books found.');
        setBooks([]);
      } else {
        isLoading(false)
        setError('');
        setBooks(data.docs);
      }
    } catch (err) {
      isLoading(false)
      setError('Something went wrong.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className="app-container" id='app-section'>
      <h1 className="heading">📚 Book Finder</h1>
      <SearchBar onSearch={fetchBooks} />
      {error && <p className="error">{error}</p>}
      {
        loading ? (
          <div className="loader-container">
            <TailSpin height={60} width={60} color="white" />
          </div>
        ) :
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      }
        <button className="clickmeButton" onClick={scrollToTop}>
            <GoMoveToTop size={20}/>
        </button>
    </div>
  );
}

export default App;