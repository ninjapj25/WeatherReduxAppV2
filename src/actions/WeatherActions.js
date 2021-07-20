import {
    GET_WEATHER_ERROR,
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
} from "../constants";

export const getWeather = (search) => async (dispatch, getState) => {
    dispatch({
        type: GET_WEATHER_REQUEST,
        payload: {
            loading: true,
        },
    });
    const checkFetch = (response) => {
        if (!response.ok) {
            dispatch({
                type: GET_WEATHER_ERROR,
                payload: {
                    loading: false,
                    error: "Please enter and existing city.",
                },
            });
        }
        return response;
    };
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${[search]}&appid=${
            process.env.REACT_APP_API_KEY
        }`
    )
        .then(checkFetch)
        .then((res) => res.json())
        .then((data) => {
            dispatch({
                type: GET_WEATHER_SUCCESS,
                payload: {
                    loading: false,
                    weather: data,
                    error: null,
                },
            });
        });
};

export const getWeatherByLatLong = (lat, long) => (dispatch) => {
    dispatch({
        type: GET_WEATHER_REQUEST,
        payload: {
            loading: true,
        },
    });
    const checkFetch = (response) => {
        if (!response.ok) {
            dispatch({
                type: GET_WEATHER_ERROR,
                payload: {
                    loading: false,
                    error: "Please enter and existing city.",
                },
            });
        }
        return response;
    };
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
    )
        .then(checkFetch)
        .then((res) => res.json())
        .then((data) => {
            dispatch({
                type: GET_WEATHER_SUCCESS,
                payload: {
                    loading: false,
                    weather: data,
                    error: null,
                },
            });
        });
};
