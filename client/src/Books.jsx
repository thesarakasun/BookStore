import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Books.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setBooks(result.data))
      .catch(err => console.log(err));
  }, []);

  const genres = [...new Set(books.map(book => book.genre))]; // Get unique genres

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteBook/'+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  };

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genre === selectedGenre)
    : books;

  return (
    <>
      <div className="d-flex vh-100 justify-content-center gey align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <h3 className="mt-3">BookInfo</h3>
          <Link to="/create" className='btn btn-success mt-4'>Add +</Link>

          <div className="mt-3">
            <label htmlFor="genreFilter" className="form-label">Filter by Genre:</label>
            <select id="genreFilter" className="form-select w-50" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">All</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                    <td>
                      <Link to={`/update/${book._id}`} className='btn btn-primary'>Update </Link>
                      <button className='btn btn-danger ms-2' onClick={(e) =>handleDelete(book._id)}>Delete </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <footer className="bg-dark text-white text-center">
        <p>© 2025 | Designed and developed by Thesara Subasinghe</p>
      </footer>
    </>
  );
}
