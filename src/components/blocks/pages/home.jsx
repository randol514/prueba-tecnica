import React,{useEffect, useState} from "react";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db} from "../../firebase"
import { useForm } from "react-hook-form";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


const Home = () =>{

  //List Clients
  const [Clients, setClients] = useState([])
  const clientsCollection = collection(db, "clients")
  const getClients =  async () =>{
    const data = await getDocs(clientsCollection)
    setClients(
      data.docs.map((doc) => ({ ...doc.data(), id:doc.id}))
    )
  }
  useEffect(() =>{
    getClients()
  },[])
  //

  const data = {
    labels: Clients.map(client => client.name),
    datasets: [
      {
        label: 'Clientes',
        data: Clients.map(client => client.age)
      }
    ]
  };
 const options = {
    plugins: {
      title: {
        display: false,
        text: 'Bar Clientes'
      }
    }
  }

  //Validation
  const {register, formState:{errors} ,handleSubmit} = useForm()
  //

  //Save client firebase
  const valueInitial = {
    name: '',
    lastname: '',
    age: '',
    birthday: '',
  }
// 
  const [client,setClient] = useState (valueInitial)
  const [average, setAverage] = useState(0)
  const [deviation, setDeviation] = useState(0)
  const getInputs = e =>{
    const {name,value} = e.target
    setClient({...client, [name]:value})
  }

  const storageClients = async(data,e) =>{
    e.preventDefault()
    try{
      await addDoc(collection(db,'clients'),{...client})
      getClients()
      operationsClients()
    }catch(e){
      console.log(e)
    }
    setClient({...valueInitial})
  }
  //

  //Operations clients
  const operationsClients = () =>{
    let resultOperation = document.getElementById('result-operations')
    resultOperation.style.display="block"
    
    const clientsAge = Clients.map(age => { return Number(age.age)})
    const n = clientsAge.length

    //Average Age clients
    const mean = clientsAge.reduce((a, b) => a + b) / n
    setAverage(Math.round((mean)))

    //standard deviation
    const variation =  Math.sqrt(clientsAge.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    setDeviation(Math.round((variation)))  
  }

  //

  return(
    <div className="container text-center p-5">
      <div className="row">
        <div className="col">
          <form className="row g-3" onSubmit={handleSubmit(storageClients)}>
            <div className="mb-3 mt-0">
              <input type="text" {...register('name', {required: true})} className="form-control" placeholder="Nombre" onChange={getInputs} value={client.name} />
              {errors.name?.type === 'required' && <p>Campo obligatorio</p>}
            </div>
            <div className="mb-3 mt-0">
              <input type="text" {...register('lastname', {required: true})} className="form-control" placeholder="Apellido" onChange={getInputs} value={client.lastname}/>
              {errors.lastname?.type === 'required' && <p>Campo obligatorio</p>}
            </div>
            <div className="mb-3 mt-0">
              <input type="number" {...register('age', {required: true, valueAsNumber: true})} className="form-control" placeholder="Edad" onChange={getInputs} value={client.age} />
              {errors.age?.type === 'required' && <p>Campo obligatorio</p>}
            </div>
            <div className="mb-3 mt-0">
              <input type="date" {...register('birthday', {required: true})} className="form-control" placeholder="Cumpleaños" onChange={getInputs} value={client.birthday} />
              {errors.birthday?.type === 'required' && <p>Campo obligatorio</p>}
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">Registrar</button>
            </div>
          </form>
          
          <div className="d-grid gap-2 mb-3 mt-3">
            <button className="btn btn-secondary"  onClick={operationsClients} >Ver Promedios</button>
          </div>
          <div className="card mb-3" id="result-operations" style={{display:"none"}}>
            <div className="card-body">
            <p className="card-text">Promedio de edades: {average}</p>
            <p className="card-text">Desviación estándar: {deviation} </p>
            </div>
          </div>
          <div className="card mb-3">
          <Bar data={data} options={options} />
          </div>

        </div>
        <div className="col">
          {Clients.map ((clients)=>(
          <div className="card w-75 mb-4" key={clients.id}>
            <div className="card-body">
            <p className="card-text">Nombre: {clients.name}</p>
            <p className="card-text">Apellido: {clients.lastname}</p>
            <p className="card-text">Edad: {clients.age}</p>
            <p className="card-text">Fecha de nacimiento: {clients.birthday}</p>
            </div>
          </div>
          ))}         
        </div>
      </div>
      
    </div>
  )
};

export default Home