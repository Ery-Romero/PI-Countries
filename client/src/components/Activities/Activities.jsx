import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getAllCountries } from "../../actions";
import NavBar from "../NavBar/NavBar";
import './activities.css';

export default function Activities() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: "",
        difficulty: "1",
        duration: "00:00:00",
        season: "Cualquier temporada del año",
        idCountries: []
    });

    const countries = useSelector((state) => state.countriesLoaded)

    const filter = "";

    useEffect(() => {
        dispatch(getAllCountries(filter));
    },[dispatch])
    
    let handleChange = (e) => {
        e.preventDefault();       
        setInput({...input, [e.target.name]: e.target.value})
    };  

    const handleChangeRadio = (e) => {
        if(e.target.checked) {
            setInput({...input, season: e.target.value})
        }
    };

    const handleSelectCountries = (e) => {
        setInput({
            ...input,
            idCountries : [...input.idCountries, e.target.value]
        })
    };

    const handleDelete = (e) => {
        setInput({
            ...input,
            idCountries: input.idCountries.filter(x => x!==e)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.name) {
            alert('Falta completar el nombre de la actividad')
        }
            else {
                input.name.replaceAll("^\\p{Zs}+|\\p{Zs}+$","")
                dispatch(createActivity(input))
                alert('La actividad ha sido creada exitosamente')
                setInput({name: "", difficulty: "1", duration: "00:00:00", season: "Cualquier temporada del año", idCountries:[]})
            }
    };

    return (
        <React.Fragment>
            <NavBar/> 
            <body className='fondo'>  
            <form  className='form' onSubmit= {e => handleSubmit(e)}>
                <h2 className="titulo">CREAR ACTIVIDAD TURÍSTICA</h2>
                <br/>
                <div className="contenedor1">
                <div>
                    <label>Nombre:</label>
                    <input 
                        className="inputname"
                        type= 'text' 
                        name= 'name' 
                        value= {input.name}
                        onChange={(e) => handleChange(e)}/>
                </div>                
                <div>
                    <label>Dificultad (siendo "1" la dificultad más baja y "5" la más alta):</label>
                    <select className='selectdif' name= 'difficulty' onChange={(e) => handleChange(e)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>     
                </div>               
                <div>
                    <label>Duración (horas:minutos:segundos):</label>
                    <input 
                        type= 'text'
                        name= 'duration' 
                        className="inp-duration"
                        value= {input.duration}
                        placeholder= '00:00:00'
                        onChange={(e) => handleChange(e)}/>
                </div>                              
                <div className="radioTemp">
                    <div className="radio1">
                        <label>Temporada:</label> 
                            <input
                                id = 'radio1'
                                type= 'radio'
                                name= 'season' 
                                className="radiocual"
                                value= 'Cualquier temporada del año'
                                onChange={(e) => handleChangeRadio(e)}
                            /> 
                            <label className="lab-radio">       Cualquier temporada del año</label>
                    </div>
                    <div className="radio">
                            <input
                                id = 'radio2'
                                type= 'radio'
                                name= 'season' 
                                value= 'Primavera'
                                onChange={(e) => handleChangeRadio(e)}
                            />  
                            <label className="lab-radio">    Primavera</label>
                    </div>
                    <div className="radio">
                            <input
                                id = 'radio3'
                                type= 'radio'
                                name= 'season' 
                                value= 'Verano'
                                onChange={(e) => handleChangeRadio(e)}
                            /> 
                            <label className="lab-radio">    Verano</label>
                    </div>
                    <div className="radio">
                        
                            <input
                                id = 'radio4'
                                type= 'radio'
                                name= 'season' 
                                value= 'Otoño'
                                onChange={(e) => handleChangeRadio(e)}
                            />
                            <label className="lab-radio">     Otoño</label>
                    </div>
                    <div className="radio">
                            <input
                                id = 'radio5'
                                type= 'radio'
                                name= 'season' 
                                value= 'Invierno'
                                onChange={(e) => handleChangeRadio(e)}
                            />
                            <label className="lab-radio">  Invierno</label>
                    </div>
                </div> 
                <br/>
                <div>
                    <label>Países que proponen dicha actividad:</label>
                    {
                        <select className='selectpaises' name="countriesActiv" onChange={(e) => handleSelectCountries(e)}>
                        {
                            countries?.map((c) => (
                                <option key = {c.fifa} value={c.fifa}>
                                    {c.name}
                                </option>
                            ))
                        }
                        </select>}<br></br>                        
                    {
                        input.idCountries.map((e) => 
                        <div className="delete" value={e}>    
                            <p className="p-country" value={e}>{e}</p> 
                            <button className="close" onClick={() => handleDelete(e)}>
                                x
                            </button>
                        </div>
                        )
                    }                   
                </div> 
                <div className="button-create">
                    <button className='button-crear' type= 'submit' value= 'Crear'> 
                        <span>CREAR</span>
                    </button> 
                </div>                  
                </div>                
            </form>         
            </body>    
        </React.Fragment>
    )
}