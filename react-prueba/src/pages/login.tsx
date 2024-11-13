import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './login.css'
function LoginPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario:'',
        contrasena:''
      });


      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = (e: React.FormEvent ) => {
        e.preventDefault();
        console.log('Usuario:', formData.usuario);
        console.log('Contraseña:', formData.contrasena);
        login()
      };

      const login = async () => {
        const usuario = {
          nombreUsuario: formData.usuario,
          password: formData.contrasena
        }
      
        try {
          const response = await fetch("http://localhost:8094/api/usuarios/loginclient", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log("Login exitoso:", data);
            if(data == 1){
              navigate("/clientes");
            }
          } else {
            console.log("Error en el login:", data);
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      };
    return (
      <> usuario: juanp <br></br>
      contraseña: password123
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
                <label>USUARIO</label>
                <input type="text" name="usuario" onChange={handleChange}  placeholder="Usuario"></input>
                <label>CONTRASEÑA</label>
                <input type="password" name="contrasena" onChange={handleChange} placeholder="Contraseña"></input>
                <button type='submit' className='botonIngresar surprise'>INGRESAR</button>
            </form>
        </div>
      </>
    )
}

export default LoginPage
