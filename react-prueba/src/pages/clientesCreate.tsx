import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ClientesCreate(){
  useEffect(()=>{
    if(params.id){
      const getClient =() =>{
        return axios.get('http://localhost:8094/api/clientes/list/'+params.id)
    }
    }
  })
    const navigate = useNavigate();
    const params = useParams();

    const isEditMode = params.id && !isNaN(Number(params.id)); // Validar si params.id es un número

    interface IdTipoDocumento {
        id_tipodocumento: number;
        tipo: string;
      }
    interface Cliente {
        id:string;
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
    const updateCliente =(cliente: Cliente) =>{
      return axios.post("http://localhost:8094/api/clientes/", cliente);
  }
    const eliminarCliente = (id:string) =>{
      return axios.delete(`http://localhost:8094/api/clientes/${id}`)
    }
    const clienteID = (id:string) =>{
      return axios.get(`http://localhost:8094/api/clientes/list/${id}`)
    }
    const {register, handleSubmit, setValue} = useForm<Cliente>({
        defaultValues: {
          idTipoDocumento: { id_tipodocumento: 1, tipo: "cedula ciudadania" }
        }
      })


      useEffect(()=>{
        if(isEditMode){
          console.log("obteniendo datos")
          async function load(){
            if(params.id){
              const res = await clienteID(params.id)
              console.log(res)
              setValue('id', res.data.id)
              setValue('numeroDocumento', res.data.numeroDocumento)
              setValue('nombre', res.data.nombre)
              setValue('direccion', res.data.direccion)
              setValue('telefono', res.data.telefono)
              setValue('email', res.data.email)
            }
          }
          
        load();
        }
      })
    const onSubmit = handleSubmit(async data =>{
      if(isEditMode) {
        console.log("actualizando")
        await updateCliente(data)
      }else{
        await createCliente(data)
      }
      navigate("/clientes")
    })
    return(
      <>
    <div className='loginForm'>
      <form onSubmit={onSubmit} className='formLogin'>
        <div className='texto'>CREAR NUEVO CLIENTE</div>
        Numero Documento <input type="text" placeholder="Numero Documento" {...register('numeroDocumento')}/>
        Nombre<input type="text" placeholder="Nombre" {...register('nombre')}/>
        Direccion<input type="text" placeholder="Direccion" {...register('direccion')}/>
        Telefono<input type="text" placeholder="Telefono" {...register('telefono')}/>
        Email<input type="text" placeholder="Email" {...register('email')}/>
        <button type="submit" className='botonIngresar surprise'> {isEditMode ? 'Actualizar' : 'Guardar'}</button>
      </form>
      {isEditMode && <button className='botonEliminar' onClick={()=>{
        const aceptado = window.confirm('Quieres eliminar el cliente?')
        if(aceptado && typeof params.id === 'string'){
          eliminarCliente(params.id)
          navigate("/clientes")
        }
      }}>Eliminar</button>}
    </div>
    </>
    )
}