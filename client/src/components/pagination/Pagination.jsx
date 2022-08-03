import React from "react";
import '../pagination/pagination.css'

export default function Pagination({countriesForPage, countries, pagination}) {
    const pageNumbers = [];

    for(let i= 0; i<= Math.ceil(countries/countriesForPage) - 1; i++) {
        pageNumbers.push(i + 1);
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumbers && pageNumbers.map(n => {
                    return(
                        <li className="pag" key={n}>
                            <a onClick= {()=> pagination(n)}>{n}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}