import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './../Components/Header'
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import { TextField, FormControlLabel, Checkbox, Button, FormControl,InputLabel,NativeSelect } from '@mui/material'
import Typography from '@mui/material/Typography/Typography';
import bg from './../car_bg.jpg'


let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "ind" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function Home() {
    const userToken = localStorage.getItem('authtoken');
    const navigate = useNavigate();

    const [query, setQuery] = React.useState("");
  const autoCompleteRef = React.useRef(null);

    React.useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyByW_Aub5_HWF95VhImjC-ayxQNU8pPH8s&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
      }, []);

    React.useEffect(() => {

        if (!userToken || userToken === 'undefined') {
            return navigate('/login');
        }
    }, [])
    const [loading, setloading] = React.useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')

        setloading(true)

            .then(res => {
                localStorage.setItem('authtoken', res.data.token)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                setloading(false)

            })

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
                                autoFocus
                               inputRef={autoCompleteRef}
                                ref={autoCompleteRef}
                                onChange={(event) => setQuery(event.target.value)}
                                value={query}
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
                                autoComplete="destination"
                            />
                                <FormControl fullWidth
                                style={{marginTop: '10px'}}
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
                                >
                                    <option value={"Driving"}>Driving</option>
                                    <option value={"Walking"}>Walking</option>
                                    <option value={"Transist"}>Public Transport</option>
                                </NativeSelect>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                <i class="fas fa-map-signs"></i> &nbsp; RIDE
                            </Button>
                        </Box>
                    </div>
                </div>
                <div class="container-fluid">
            <div id="googleMap">

            </div>
        </div>
            </Box>
        </Box>
    )
}

export default Home