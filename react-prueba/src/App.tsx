import { BrowserRouter,Routes, Route } from 'react-router-dom'
import  LoginPage  from './pages/login'
import ClientesPage from './pages/clientes'
import ClientesCreate from './pages/clientesCreate'
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<h1>Home page</h1>} /> */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/clientes' element={<ClientesPage />} />
        <Route path='/NuevoCliente' element={<ClientesCreate />} />
        <Route path='/clientes/:id' element={<ClientesCreate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
