import React from 'react'; 
import './country.css';

export default function Country({name, continent, flag}) {

    return (
        <React.Fragment>  
            <body className='body-country'>
                <div class="wrapper">
                    <div class="card">
                        <h4 class="title">
                            <span class='enclosed'>{name}</span>
                        </h4>
                        <div> <br></br>
                            <h5>
                                <span>{continent}</span>      
                            </h5>
                        </div>
                        <div class='img_country'>
                            <img src = {flag} alt = {"No se encontró imagen"}/> 
                        </div>  
                    </div>
                </div>
            </body> 
        </React.Fragment>     
    )
} 
