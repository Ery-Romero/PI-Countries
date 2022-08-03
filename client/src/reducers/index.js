import { GET_COUNTRIES, CREATE_ACTIVITY, ALL_ACTIVITIES, GET_ACTIVITY, GET_COUNTRY_FOR_NAME, ORDER_POPULATION, GET_DETAIL_COUNTRY, ALPHABETICAL_ORDER } from "../actions";

const initialState= {
    countriesLoaded: [],
    countriesDetail: [],
    activity: [],
    filterActivities: []
};

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                 ...state,
                countriesLoaded: action.payload,
                //allCountries: action.payload
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
            }  
        case GET_DETAIL_COUNTRY:
            return {
                ...state,
                countriesDetail: action.payload
            } 
        case ALL_ACTIVITIES:
            return {
                ...state,
                activity: action.payload
            }
        case GET_ACTIVITY:
            return {
                ...state,
                filterActivities: action.payload
            }
        case GET_COUNTRY_FOR_NAME:
            return {
                ...state,
                countriesLoaded: action.payload
            } 
        case ORDER_POPULATION:
            const popOrder = (action.payload === 'menor')? 
                state.countriesLoaded.sort((a, b) => a.population-b.population):state.countriesLoaded.sort((a, b) => b.population-a.population)
            return {
                ...state,
                countriesLoaded: popOrder
            }
        case ALPHABETICAL_ORDER:
            const alphaOrder = (action.payload === 'ASC')? 
                state.countriesLoaded.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)) : state.countriesLoaded.sort((a, b) => (b.name > a.name ? 1 : b.name < a.name ? -1 : 0))
            return {
                ...state,
                countriesLoaded: alphaOrder
            }    
        default:
            return state;
    }
}
