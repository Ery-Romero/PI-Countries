import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css'

export default function NavBar() {  

    return (
        <React.Fragment>
            <div className="topnav">
                <NavLink className='a' to= {'/home'}>Home</NavLink>
                <NavLink className='a' to= {'/activities/new'}>Crear Actividad</NavLink>    
            </div>
        </React.Fragment>      
    )  
}

