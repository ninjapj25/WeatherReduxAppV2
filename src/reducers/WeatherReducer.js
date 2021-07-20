import {
    GET_WEATHER_ERROR,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_REQUEST,
} from "../constants";

const initialState = {
    loading: false,
    weather: {},
    error: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER_REQUEST:
        case GET_WEATHER_ERROR:
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}
