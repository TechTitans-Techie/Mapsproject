import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './../Components/Header'
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import { TextField, FormControlLabel, Checkbox, Button, FormControl, InputLabel, NativeSelect, Select, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography/Typography';
import bg from './../car_bg.jpg'

function Home() {
    const userToken = localStorage.getItem('authtoken');
    const navigate = useNavigate();
    const [distance, setDistance] = useState("")
    const [state, setstate] = useState("")
    const [mode, setMode] = useState("DRIVING")
    const [destination, setdestination] = useState("");
    const [duration, setDuration] = useState("")
    const [car, setCar] = useState("")
    const [cars, setCars] = useState([])


    useEffect(() => {
        const input = document.getElementById("from");
        const options = {
            types: ["(cities)"],
        };
        const geoAutocomplete = new window.google.maps.places.Autocomplete(input, options);
        geoAutocomplete.addListener("place_changed", () => {
            const selectedPlace = geoAutocomplete.getPlace();
            console.log(selectedPlace);
            setstate({ value: selectedPlace.formatted_address });
        });
    }, []);

    useEffect(() => {
        const input = document.getElementById("to");
        const options = {
            types: ["(cities)"],
        };
        const geoAutocomplete = new window.google.maps.places.Autocomplete(input, options);
        geoAutocomplete.addListener("place_changed", () => {
            const selectedPlace = geoAutocomplete.getPlace();
            console.log(selectedPlace);
            setdestination({ value: selectedPlace.formatted_address });
        });
    }, []);

    useEffect(() => {
        var myLatLng = { lat: 38.3460, lng: -0.4907 };
        var mapOptions = {
            center: myLatLng,
            zoom: 7,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP

        };
        var map = new window.google.maps.Map(document.getElementById('googleMap'), mapOptions);
        // var directionsService = new window.google.maps.DirectionsService();

        //create a DirectionsRenderer object which we will use to display the route
        var directionsDisplay = new window.google.maps.DirectionsRenderer();

        //bind the DirectionsRenderer to the map
        directionsDisplay.setMap(map);
    }, [])

    const calcRoute = () => {

        var myLatLng = { lat: 38.3460, lng: -0.4907 };
        var mapOptions = {
            center: myLatLng,
            zoom: 7,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP

        };
        var map = new window.google.maps.Map(document.getElementById('googleMap'), mapOptions);

        var directionsService = new window.google.maps.DirectionsService();
        var directionsDisplay = new window.google.maps.DirectionsRenderer();
        console.log(mode)

        var request = {
            origin: state.value,
            destination: destination.value,
            travelMode: window.google.maps.TravelMode[mode], //WALKING, BYCYCLING, TRANSIT
            unitSystem: window.google.maps.UnitSystem.IMPERIAL
        }

        directionsService.route(request, function (result, status) {
            if (status == window.google.maps.DirectionsStatus.OK) {
                console.log("success")
                directionsDisplay.setDirections(result);
                directionsDisplay.setMap(map);
                setDistance(result.routes[0].legs[0].distance.text)
                setDuration(result.routes[0].legs[0].duration.text)
                //  distance = result.routes[0].legs[0].distance.text
            }
            else {
                directionsDisplay.setDirections({ routes: [] });
                map.setCenter(myLatLng);
            }
        })
    }

    const handleChange = (event) => setstate({ value: event.target.value })
    const handleDestinationChanage = (event) => setdestination({ value: event.target.value })
    const scollToRef = useRef();


    React.useEffect(() => {

        if (!userToken || userToken === 'undefined') {
            return navigate('/login');
        }
    }, [])
    const [loading, setloading] = React.useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setloading(true)
        scollToRef.current.scrollIntoView()
        calcRoute()

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Box component="main" sx={{ p: 3 }} style={{
                backgroundImage: `url(${bg})`,
                width: "100%",
                backgroundPosition: "50% 0%",
                backgroundSize: "cover",
                height: "750px"
            }}>
                <Toolbar />

                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{


                            alignItems: "left",
                            position: "absolute",
                            top: "40%",
                            left: "8%",
                            transform: "translate(0, -50 %)"
                        }}
                    >
                        <Typography
                            variant="h1"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            style={{
                                color: "white"
                            }}
                        >
                            Drive With Us
                        </Typography>
                    </div>
                    <div

                        style={{
                            alignItems: "left",
                            position: "absolute",
                            top: "35%",
                            right: "10%",
                            transform: "translate(0, -50 %)",
                            height: "300px",
                            backgroundColor: "white",
                            width: "30%",
                            borderRadius: "10%",
                            padding: "10px"
                        }}>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="from"
                                label="Origin"
                                name="origin"
                                variant='standard'
                                value={state.value}
                                autoFocus

                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="to"
                                name="destination"
                                label="Destination"
                                type="text"
                                variant='standard'
                                autoComplete="off"
                                value={destination.value}


                                onChange={handleDestinationChanage}
                            />
                            <FormControl fullWidth
                                style={{ marginTop: '10px' }}
                            >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native"

                                >
                                    Select Mode
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={(event) => { setMode(event.target.value) }}


                                >
                                    <option value={"DRIVING"}>Driving</option>
                                    <option value={"WALKING"}>Walking</option>
                                    <option value={"TRANSIT"}>Public Transport</option>
                                </NativeSelect>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                <i className="fas fa-map-signs"></i> &nbsp; RIDE
                            </Button>
                        </Box>
                    </div>
                </div>
                <div className="container-fluid">
                    <div id="googleMap" ref={scollToRef}>
                    </div>
                </div>

                {
                    distance !== "" && duration !== "" &&
                    <div
                        style={{ width: "100%", alignItems: "center", margin: "auto", textAlign: "center" }}
                    >
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Select Car</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={car}
                                    label="Car"
                                    onChange={(event) => setCar(event.target.value)}
                                    variant='standard'
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <table style={{ border: "1px solid black", marginTop: "10px", width: "100%" }}>
                            <tr>
                                <th>
                                    <td style={{width: "50%"}}>Distance: </td>
                                    <td>{distance}</td>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <td>Duration: </td>
                                    <td>{duration}</td>
                                </th>
                            </tr>
                        </table>
                    </div>
                }
            </Box>
        </Box>
    )
}

export default Home