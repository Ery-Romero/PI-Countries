import React from "react";
import { Link } from "react-router-dom";
import './landingPage.css';

export default function LandingPage() {
    return(
        <React.Fragment>
            <div className="Landing">
                <h1 className='texto'>COUNTRIES</h1>
                <span className="welcome">
                    <Link to= "/home" rel= 'arrow'>             
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                                <div class="arrow"></div>
                            </div>
                        </div>
                    </Link>
                </span>    
            </div>
        </React.Fragment>   
    )
}