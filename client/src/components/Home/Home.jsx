import React, { useEffect, useState } from "react";
import { getAllCountries, orderForPopulation, alphabeticalOrder, filterForActivity, getAllActivities, getCountryForName } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Country from "../Country/Country";
import Pagination from "../pagination/Pagination";
import './home.css';
import NavBar from "../NavBar/NavBar";

const Home = () => {
    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countriesLoaded)
    const activities = useSelector((state) => state.activity)
    const countriesForAct = useSelector((state) => [state.filterActivities])

    const [page, setPage] = useState(1);
    const [countriesForPage, setcountriesForPage] = useState(10);
    const indexLastPage = page * countriesForPage;
    const indexFirstPage = indexLastPage - countriesForPage;
    const actualCountries = countries.slice(indexFirstPage, indexLastPage);

    const [name, setName] = useState("");

    const [filter, setFilter] = useState("");
    const [alfOrder, setalfOrder] = useState("");
    const [popOrder, setPopOrder] = useState("");
    const [actFilter, setActFilter] = useState("");
    const [one, setOne] = useState(true);
    
    const pagination = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(()=> {
        dispatch(getAllCountries(filter)); 
        dispatch(getAllActivities());
        dispatch(filterForActivity(actFilter));
    }, [dispatch, filter, actFilter]);

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        dispatch(getCountryForName(name));
        setName("");    
    }  

    const handleRefresh = (e) => {
        e.preventDefault();
        dispatch(getAllCountries(filter)); 
        setPage(1); setFilter(""); setPopOrder(""); setalfOrder(""); setActFilter(""); setName("");
    };
    
   const orderAlf = (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value));
        setPage(1)
        setalfOrder(e.target.value);
    }

    const orderPop = (e) => {
        e.preventDefault();
        dispatch(orderForPopulation(e.target.value));
        setPage(1);
        setPopOrder(e.target.value);
    }

    const filterCont = (e) => {
        e.preventDefault();
        setPage(1)
        setFilter(e.target.value);
        setOne(true)
    }

    const filterAct = (e) => {
        e.preventDefault();
        setPage(1)
        setActFilter(e.target.value);
        setOne(false)
    }

    return (
        <React.Fragment> 
            <NavBar/> 
            <div className="fondoHome">
                <div>
                    <Pagination
                        countriesForPage = {countriesForPage}
                        countries = {countries.length}
                        pagination = {pagination}
                    />
                    <button className="button-refresh" onClick={(e) => {handleRefresh(e);}}>
                        RECARGAR LA PÁGINA
                    </button>               
                    {/* <div className= "search-container"> */}
                        <input 
                            className="inp-search"
                            type="text" 
                            placeholder="Buscar por País.." 
                            name="search"
                            onChange={e => handleChange(e)}
                        />
                        <button type="submit" onClick={e => handleClick(e)}>
                            <i class="fa fa-search"></i>
                        </button>
                </div>        
                {/* </div> */} 
                <div className="navbar-home">
                        <button className="filter-por">Filtrar por: 
                        </button>
                            <label>Continente: </label>
                            <select name="filterCont" onClick={(e) => filterCont(e)}>
                                <option value= "">Todos</option>
                                <option value= "North America">América del Norte</option>
                                <option value= "South America">América del Sur</option>
                                <option value= "Asia">Asia</option>
                                <option value= "Africa">África</option>
                                <option value= "Europe">Europa</option>
                                <option value= "Oceania">Oceanía</option>
                                <option value= "Antarctica">Antártida</option>
                            </select>  
                            <label>Tipo de actividad turística: </label>  
                            <select name="filterAct" onChange={(e) => filterAct(e)}>
                                {   
                                    activities?.map(a => {
                                    return(
                                            <option key={a.id} value={a.name} >                                   
                                                {a.name}  
                                            </option>
                                        )
                                    })                
                                }
                            </select>      
                        <button className="filter-por">Ordenar: 
                        </button>
                        <label>Alfabéticamente: </label>
                        <select name="alfab" onChange={e => orderAlf(e)}>
                            <option value="ASC">A-Z</option>
                            <option value="DESC">Z-A</option>
                        </select>       
                        <label>Por cantidad de población: </label>
                        <select name="population" onChange={e => orderPop(e)}>
                            <option value="menor">De menor a mayor</option>
                            <option value="mayor">De mayor a menor</option>
                        </select>     
                </div> <br />
                <div> 
                    <div class='contenedor'>        
                    {one===false &&
                        countriesForAct[0]["Countries"]?.map((a) =>
                        (
                            <div class='contcard' className="countryForAct" key= {a.fifa}>
                                <NavLink to= {`/country/${a.fifa}`}> 
                                    <Country 
                                        key = {a.fifa} 
                                        fifa = {a.fifa}
                                        name = {a.name} 
                                        continent ={a.continents} 
                                        flag = {a.flags}/>
                                </NavLink> 
                            </div>
                        ))
                    }      
                    {one===true && 
                        actualCountries && actualCountries.map((c) => 
                        (   
                            <div class= 'contcard' className="country" key= {c.fifa}>
                                <NavLink to= {`/country/${c.fifa}`}> 
                                    <Country 
                                        key = {c.fifa} 
                                        fifa = {c.fifa}
                                        name = {c.name} 
                                        continent ={c.continents} 
                                        flag = {c.flags}/>
                                </NavLink> 
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </React.Fragment> 
    )  
}

export default Home
