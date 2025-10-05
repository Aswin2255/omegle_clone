
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Chatpage from './pages/Chatpage';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/chat' element={<Chatpage/>}/>
    </Routes>
    </BrowserRouter>
    

  )
}

export default App
