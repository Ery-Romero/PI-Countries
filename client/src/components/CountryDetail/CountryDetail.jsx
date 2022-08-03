import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailCountry } from "../../actions";
import './detail.css';


export default function CountryDetail() {
    const dispatch= useDispatch();

    const details = useSelector((state) => state.countriesDetail);

    const {countryId} = useParams();

    useEffect(() => {   
        dispatch(getDetailCountry(countryId));
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className='fondo-detail'>
                <div className="container-detail">
                    <div className="titulo">
                        <h1>Detalles del País: {details.name}</h1>
                    </div>
                        <img className='other' src= {details.flags} alt=''/>
                    <div className='otherImg'>
                        <img className='otra' src= {details.flags} alt=''/>
                    </div>
                    <div className="detail">
                        <ul>
                            <p>Código: {details.fifa}</p>
                            <p>Continente: {details.continents}</p>
                            <p>Capital: {details.capital}</p>
                            <p>Sub-Región: {details.subregion}</p>
                            <p>Área: {details.aerea} km²</p>
                            <p>Población: {details.population}</p>
                        </ul>
                    </div>
                    
                    <div className="activities">
                        <h3>Actividades Turísticas</h3>
                        {
                            details.TouristActivities && details.TouristActivities.map((at) => (   
                                <ul className="detail-act" key = {at.name}>
                                    <li>Nombre: {at.name}</li>
                                    <li>Dificultad: {at.difficulty}</li>
                                    <li>Duración: {at.duration}</li>
                                    <li>Temporada: {at.season}</li><br/>
                                </ul>
                            ))   
                        }
                    </div>     
                </div>         
            </div>      
        </React.Fragment>
    )
}
