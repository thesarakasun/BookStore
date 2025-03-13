import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Books from './Books'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import NotFound from './NotFound';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}></Route>
          <Route path='/create' element={<CreateBook/>}></Route>
          <Route path='/update/:id' element={<UpdateBook/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
