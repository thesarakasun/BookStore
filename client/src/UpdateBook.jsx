import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UpdateUser() {
  const {id} = useParams()
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [genre, setGenre] = useState()
  const [year, setYear] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/getBook/'+id)
      .then(result => {console.log(result)
        setTitle(result.data.title)
        setAuthor(result.data.author)
        setGenre(result.data.genre)
        setYear(result.data.year)
      })
      .catch(err => console.log(err));
  }, []);

  const Update = (e) =>{
    e.preventDefault();
    axios.put("http://localhost:3001/updateBook/"+id, {title,author,genre,year})
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center gey'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update Book</h2>
          <div className='mb-2'>
            <label htmlFor=''>Title</label>
            <input type='text' placeholder='Enter Title' className='form-control'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Author</label>
            <input type='text' placeholder='Enter Author' className='form-control'
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Genre</label>
            <input type='text' placeholder='Enter Genre' className='form-control'
            value={genre}
            onChange={(e)=> setGenre(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Year</label>
            <input type='text' placeholder='Enter Year' className='form-control'
            value={year}
            onChange={(e)=> setYear(e.target.value)}/>
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}
