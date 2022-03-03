import { Alert, AlertTitle, Backdrop, Box, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { setLoadingIndicator } from "../common/actions/breedActions";
import { Context } from "../common/store";
import { GetImageAndBreed } from "../data-manager/dogbreed";

export default function BreedDisplay() {
    const [state, dispatch] = useContext(Context);
    const { breed } = state;
    const [breedDetails, setBreedDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [imageError, setImageError] = useState("");
    const NO_DATA = "Data Not Available";


    const handleImageLoaded = () => {
        dispatch(setLoadingIndicator(false));
    }


    useEffect(() => {
        try {
            GetImageAndBreed(breed.dogId, breed.name).then((data) => {
                setWarningMessage("")
                setImageError("")
                setErrorMessage("");
                if (data !== null) {
                    setBreedDetails(data);
                    if (data.url !== undefined) {
                        setImageUrl(data.url);
                    }
                    else {
                        setImageError("Image not found for this breed");
                        dispatch(setLoadingIndicator(false));
                    }
                }
                else {
                    setErrorMessage("Please select a breed to display");
                }
                setLoading(false);
            }).catch((error) => {
                setErrorMessage("No Records to display" + error);
            })
        }
        catch (error) {
            setErrorMessage("Something went wrong, Error is : " + error);
            dispatch(setLoadingIndicator(false));
        }
    }, [breed.dogId])

    return (
        <Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={breed.loadingIndicator}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container sx={{ py: 8 }} maxWidth="md">
                {
                    errorMessage !== "" ? <Alert variant="filled" severity="info">
                        {errorMessage}
                    </Alert> : <Fragment>{
                        warningMessage === "" ?
                            <Fragment>
                                {loading ? null :
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Card
                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <Typography gutterBottom variant="h3" component="h3" sx={{ my: 4 }}>
                                                    {breedDetails.name}
                                                </Typography>
                                                {
                                                    imageError === "" ? <CardMedia
                                                        component="img"
                                                        image={imageUrl}
                                                        alt="random"
                                                        onLoad={handleImageLoaded}

                                                    /> :
                                                        <Alert severity="warning">{imageError}</Alert>
                                                }
                                                <CardContent sx={{ flexGrow: 1 }}>

                                                    <Typography gutterBottom variant="subtitle2" component="h2" fontStyle="italic" sx={{ my: 4 }}>
                                                        {breedDetails.temperament !== undefined ? breedDetails.temperament : ""}
                                                    </Typography>
                                                    <Box
                                                        component="form"
                                                        sx={{
                                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                            my: 4

                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="Breed For"
                                                            value={breedDetails.bred_for !== undefined  ? breedDetails.bred_for : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="Breed Group"
                                                            value={breedDetails.breed_group !== undefined  ? breedDetails.breed_group : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="Average Life Span"
                                                            value={breedDetails.life_span !== undefined  ? breedDetails.life_span : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="weight in kg"
                                                            value={breedDetails.weight !== undefined ? breedDetails.weight.metric : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="height in cm"
                                                            value={breedDetails.height !== undefined  ? breedDetails.height.metric : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-read-only-input"
                                                            label="Country Code"
                                                            value={breedDetails.country_code !== undefined ? breedDetails.country_code : NO_DATA}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                }
                            </Fragment> :

                            <Alert variant="filled" severity="info">
                                {warningMessage}
                            </Alert>
                    }</Fragment>

                }


            </Container>

        </Fragment>
    )

}