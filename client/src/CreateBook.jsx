import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Books.css';


export default function CreateUser() {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [genre, setGenre] = useState()
  const [year, setYear] = useState()
  const navigate = useNavigate()


  const Submit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/addBook", {title,author,genre,year})
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center gey'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add Book</h2>
          <div className='mb-2'>
            <label htmlFor=''>Title</label>
            <input type='text' placeholder='Enter Title' className='form-control'
            onChange={(e)=> setTitle(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Author</label>
            <input type='text' placeholder='Enter Author' className='form-control'
            onChange={(e)=> setAuthor(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Genre</label>
            <input type='text' placeholder='Enter Genre' className='form-control'
            onChange={(e)=> setGenre(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Year</label>
            <input type='text' placeholder='Enter Year' className='form-control'
            onChange={(e)=> setYear(e.target.value)}/>
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
      
    </div>
  )
  
}
