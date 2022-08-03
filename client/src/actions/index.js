const axios = require('axios');
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_DETAIL_COUNTRY = 'GET_DETAIL_COUNTRY';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_COUNTRY_FOR_NAME = 'GET_COUNTRY_FOR_NAME'
export const ORDER_POPULATION = 'ORDER_POPULATION';
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER';
export const ALL_ACTIVITIES = 'ALL_ACTIVITIES';

export function getAllCountries(filter) {
    return async function(dispatch) {
            var response = await axios("http://localhost:3001/countries?filter=" + filter);
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: response.data
        });            
    };
}

export function createActivity(input) {
    return async (dispatch) => {
        const activity= await axios.post('http://localhost:3001/activities/new',input);
        return activity;
    };
}

export function getDetailCountry(countryId) {
    return async function (dispatch) {
        const response= await axios(`http://localhost:3001/countries/${countryId}`);
        return dispatch({
            type: 'GET_DETAIL_COUNTRY',
            payload: response.data
        });
    }
}

export function getCountryForName(name) {
    return async function (dispatch) {
        try {
        const response= await axios(`http://localhost:3001/countries?name=${name}`);        
            return dispatch({
            type: 'GET_COUNTRY_FOR_NAME',
            payload: response.data
        });
        } catch (error) {
            return alert("El País requerido no existe");
        }
    }
}

export function getAllActivities() {
    return async function(dispatch) {
        const response = await axios('http://localhost:3001/activities');
        return dispatch({
            type: 'ALL_ACTIVITIES',
            payload: response.data
        })
    }
}

export function filterForActivity(name) {
    return async function(dispatch) {
        const filter = await axios(`http://localhost:3001/activities?name=${name}`);
        return dispatch({
            type: 'GET_ACTIVITY',
            payload: filter.data
        });
    }
}

export function orderForPopulation(payload) {
    return{
        type: 'ORDER_POPULATION',
        payload
    }
}

export function alphabeticalOrder(payload) {
    return{
        type: 'ALPHABETICAL_ORDER',
        payload
    }
}