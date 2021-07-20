import {
    Grid,
    Card,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getWeather, getWeatherByLatLong } from "./actions/WeatherActions";

function App() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(getWeather(search));
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        navigator.geolocation
            ? navigator.geolocation.getCurrentPosition((position) => {
                  dispatch(
                      getWeatherByLatLong(
                          position.coords.latitude,
                          position.coords.longitude
                      )
                  );
              })
            : alert("Please enter an existing city");
    }, [dispatch]);

    const { loading, weather, error } = useSelector((state) => state.weather);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error, weather, loading]);
    console.log(error);
    return (
        <Grid
            container={true}
            justifyContent="center"
            style={styles.mainContainer}
        >
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                >
                    {weather.message && "City not found!!"}
                </MuiAlert>
            </Snackbar>
            <Grid container={true} item={true} lg={9} md={12} sm={12} xs={12}>
                <Grid
                    container={true}
                    justifyContent="center"
                    item={true}
                    xs={12}
                    style={{ padding: "0 1rem", marginBottom: "2rem" }}
                >
                    <Card style={styles.headerCardContainer}>
                        {loading ? (
                            <CircularProgress disableShrink />
                        ) : (
                            <React.Fragment>
                                <div style={styles.headerCardRow}>
                                    <Typography component="h2" variant="h6">
                                        {weather.name
                                            ? `${weather.name} - ${weather.sys.country}`
                                            : "Please search a city name below."}
                                    </Typography>
                                </div>
                                <div style={styles.headerCardRow}>
                                    <Typography component="h2" variant="h6">
                                        {weather.main
                                            ? `${Math.floor(
                                                  weather.main.temp - 273.15
                                              )}  °C`
                                            : ""}
                                    </Typography>
                                </div>
                            </React.Fragment>
                        )}
                    </Card>
                </Grid>
                <Grid
                    container={true}
                    justifyContent="center"
                    item={true}
                    lg={4}
                    xs={12}
                    style={{ padding: "0 1rem" }}
                >
                    <Card
                        style={styles.cardContainer}
                        className={"card-container"}
                    >
                        {loading ? (
                            <CircularProgress disableShrink />
                        ) : (
                            <React.Fragment>
                                <div>
                                    {weather.weather ? (
                                        <img
                                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                            alt="weather icon"
                                        />
                                    ) : (
                                        <img
                                            src={`http://openweathermap.org/img/wn/10d@2x.png`}
                                            alt="weather icon"
                                        />
                                    )}
                                </div>
                                <div style={styles.weatherDescription}>
                                    {weather.weather
                                        ? weather.weather[0].description
                                        : "Sunny Day"}
                                </div>
                            </React.Fragment>
                        )}
                    </Card>
                </Grid>
                <Grid
                    container={true}
                    justifyContent="center"
                    item={true}
                    lg={4}
                    xs={12}
                    style={{ padding: "0 1rem" }}
                >
                    <Card
                        style={styles.cardContainer}
                        className={"card-container"}
                    >
                        {loading ? (
                            <CircularProgress disableShrink />
                        ) : (
                            <React.Fragment>
                                <div style={styles.cardRow}>
                                    <Typography>Wind Speed</Typography>
                                </div>
                                <div style={styles.cardRow}>
                                    <Typography>
                                        {" "}
                                        {weather.wind
                                            ? weather.wind.deg
                                            : 0}{" "}
                                        &deg;
                                    </Typography>{" "}
                                    <Typography>
                                        {" "}
                                        {weather.wind
                                            ? ` - ${Math.ceil(
                                                  (weather.wind.speed / 1000) *
                                                      3600
                                              )}`
                                            : ` 0`}{" "}
                                        kph
                                    </Typography>
                                </div>
                            </React.Fragment>
                        )}
                    </Card>
                </Grid>
                <Grid
                    container={true}
                    justifyContent="center"
                    item={true}
                    lg={4}
                    xs={12}
                    style={{ padding: "0 1rem" }}
                >
                    <Card
                        style={styles.cardContainer}
                        className={"card-container"}
                    >
                        {loading ? (
                            <CircularProgress disableShrink />
                        ) : (
                            <React.Fragment>
                                <div style={styles.cardRow}>
                                    <Typography>Clouds Count</Typography>
                                </div>
                                <div style={styles.cardRow}>
                                    <Typography>
                                        {" "}
                                        {weather.clouds
                                            ? weather.clouds.all
                                            : 0}
                                    </Typography>
                                </div>
                            </React.Fragment>
                        )}
                    </Card>
                </Grid>
                <Grid container={true} justifyContent="center">
                    <Card style={styles.footerCard}>
                        <div style={styles.headerCardRow}>
                            <TextField
                                variant="outlined"
                                name="search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div style={styles.headerCardRow}>
                            <Button
                                variant="contained"
                                style={{
                                    background: !search ? "#E5E5E5" : "#009ef6",
                                    color: "#ffffff",
                                    marginTop: "1rem",
                                }}
                                onClick={handleSubmit}
                                disabled={!search}
                            >
                                {" "}
                                Search{" "}
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

const styles = {
    mainContainer: {
        marginTop: "3rem",
        marginBottom: "3rem",
    },
    cardContainer: {
        minHeight: "25rem",
        width: "100%",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column wrap",
        marginBottom: "1rem",
    },
    cardRow: {
        display: "flex",
        justifyContent: "center",
        margin: "2rem 0",
    },
    headerCardContainer: {
        width: "100%",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column wrap",
    },
    headerCardRow: {
        display: "flex",
        justifyContent: "center",
    },
    weatherDescription: {
        margin: "1rem 0 2rem",
    },
    footerCard: {
        padding: "2rem",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column wrap",
    },
};

export default App;
