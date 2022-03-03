import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import * as React from 'react';
import { setLoadingIndicator, setSelectedDogId, setSelectedDogName } from '../common/actions/breedActions';
import { Context } from '../common/store';
import { GetAllDogs, GetImageAndBreed } from '../data-manager/dogbreed';
import debounce from './debounced';


export default function SearchComponent() {
    const [state, dispatch] = React.useContext(Context);
    const { dog } = state;
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        GetAllDogs(value).then((data) => {
            if (data.ListOfBreeds.length <= 0) {
                setOptions([{
                    title: "",
                    id: 0
                }]);

            }
            else {
                setOptions(data.ListOfBreeds);
            }

            console.log(data);
        })
    };

    const selectionChange = (event, value) => {
        if (value !== null) {
            dispatch(setSelectedDogId(value.id));
            dispatch(setSelectedDogName(value.title));
            dispatch(setLoadingIndicator(true));
        }
        else {
            dispatch(setSelectedDogId(0));
        }

    }


    const debnounceResult = React.useCallback(debounce(handleChange, 1000));

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '70%' }}
            onChange={selectionChange}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    onChange={debnounceResult}
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
