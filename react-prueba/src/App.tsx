import { BrowserRouter,Routes, Route } from 'react-router-dom'
import  LoginPage  from './pages/login'
import ClientesPage from './pages/clientes'
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/clientes' element={<ClientesPage />} />
        <Route path='/NuevoCliente' element={<h1>Nuevo cliente</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
