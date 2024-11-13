import 'animate.css';
import './clientes.css';
import axios from 'axios'
import { useEffect, useState } from 'react'

function ClientesPage() {
    interface IdTipoDocumento {
        id_tipodocumento: number;
        tipo: string;
      }
    interface Cliente {
        id: number;
        nombre: string;
        numeroDocumento:string;
        idTipoDocumento: IdTipoDocumento;
        direccion: string;
        telefono: string;
        email: string;
      }

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const getAllClients =() =>{
        return axios.get('http://localhost:8094/api/clientes/list')
    }
    useEffect(()=>{
        async function loadClients(){
            const res = await getAllClients();
            console.log(res)
            setClientes(res.data)
        }
        loadClients();
    },[])


    return (
        <>
            <h1 className="animate__animated animate__backInLeft titulo"> CLIENTES  </h1>
            <table className="animate__animated animate__zoomIn">
                <thead>
                    <tr>
                        <th>Tipo Documento</th>
                        <th>Numero Documento</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(Clientes =>(
                    <tr key={Clientes.id}>
                        <td>{Clientes.idTipoDocumento.tipo}</td>
                        <td>{Clientes.numeroDocumento}</td>
                        <td>{Clientes.nombre}</td>
                        <td>{Clientes.direccion}</td>
                        <td>{Clientes.telefono}</td>
                        <td>{Clientes.email}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default ClientesPage