import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ClientesCreate(){
    const navigate = useNavigate();
    interface IdTipoDocumento {
        id_tipodocumento: number;
        tipo: string;
      }
    interface Cliente {
        nombre: string;
        idTipoDocumento: IdTipoDocumento;
        numeroDocumento: string;
        direccion: string;
        telefono: string;
        email: string;
      }
    const createCliente =(cliente: Cliente) =>{
        return axios.post("http://localhost:8094/api/clientes/", cliente);
    }
    const {register, handleSubmit} = useForm<Cliente>({
        defaultValues: {
          idTipoDocumento: { id_tipodocumento: 1, tipo: "cedula ciudadania" }
        }
      })

    const onSubmit = handleSubmit(async data =>{
        console.log(data)
        await createCliente(data)
        navigate("/clientes")
    })
    return(
    <div className='loginForm'>
      <form onSubmit={onSubmit} className='formLogin'>
        <div className='texto'>CREAR NUEVO CLIENTE</div>
        <input type="text" placeholder="Numero Documento" {...register('numeroDocumento')}/>
        <input type="text" placeholder="Nombre" {...register('nombre')}/>
        <input type="text" placeholder="Direccion" {...register('direccion')}/>
        <input type="text" placeholder="Telefono" {...register('telefono')}/>
        <input type="text" placeholder="Email" {...register('email')}/>
        <button type="submit" className='botonIngresar surprise'>Guardar</button>
      </form>
    </div>
    )
}