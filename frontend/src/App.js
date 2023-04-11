import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import UpdateVendor from './components/UpdateVendor'
import Login from './pages/Login'
import Register from './pages/Register'
import AddVendor from './components/AddVendor'

function App() {
  
 
   
  return (
    <>
      <Router>
        <Header />  
        <div className='container'>
          <Routes> 
           <Route exact path='/' element={ <Dashboard  />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addnote' element={<AddVendor/>}/>
            <Route path='/edit/:id' element={<UpdateVendor />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
