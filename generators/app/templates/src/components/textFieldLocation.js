/*
    Example:
        <TextFieldLocation
            label="Место"
            margin='normal'
            variant="outlined"
            name="place"
            placeName=''
            value={place}
            zoom={17}
            onChange={(e) => {
                setPlace(e.target.value);
            }}
    />
*/
import React from 'react';
import { TextField, CircularProgress, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };
const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const template = {
    description: "Поблизости",
    id: "near",
    matched_substrings: [{ length: 1, offset: 0 }],
    place_id: "near",
    reference: "near",
    structured_formatting: {
        main_text: "Поблизости",
        main_text_matched_substrings: [{ length: 1, offset: 0 }],
        secondary_text: "",
    },
    terms: [
        { offset: 0, value: "Поблизости" },
        { offset: 1, value: "" }
    ],
    types: [
        "locality",
        "political",
        "geocode"
    ]
}

export default function TextFieldLocation(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.placeName);
    const [loading, setLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState(navigator.geolocation ? [template] : []);

    if (typeof window !== 'undefined') {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&language=ru`,
                document.querySelector('head'),
                'google-maps',
            );
        }
    }

    const fetchA = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {

        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : [template]);
            return undefined;
        }

        fetchA({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };

    }, [value, inputValue, fetchA]);

    return (
        <Autocomplete
            name={props.name}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            freeSolo
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={async (event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);

                if (newValue && newValue.id === 'near') {
                    setLoading(true);
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;
                            getGeocode({ address: `${lat},${lng}` }).then(geocode => {
                                var ans = geocode[0].address_components[1].long_name;
                                newValue.description = ans;
                                newValue.structured_formatting.main_text = ans;
                                newValue.structured_formatting.secondary_text = ans;
                                setOptions([newValue]);
                                setValue(newValue);
                                setLoading(false);
                                props.onChange !== undefined && props.onChange({
                                    target:
                                        { id: props.name, value: [lat.toString(), lng.toString(), newValue.description] }
                                });
                            });
                        },
                        (error) => {
                            setLoading(false);
                            alert('Неудалось определить местороложение');
                        }
                    );
                } else {
                    if (newValue) {
                        if (props.onChange !== undefined) {
                            const address = newValue.description ? newValue.description : newValue
                            const geocode = await getGeocode({ address });
                            const { lat, lng } = await getLatLng(geocode[0]);
                            props.onChange !== undefined && props.onChange({
                                target: {
                                    id: props.name, value: [lat.toString(), lng.toString(), address ]
                                }
                            });
                        }
                    }
                }

            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (<React.Fragment>
                <TextField {...params}
                    label={props.label}
                    variant={props.variant}
                    fullWidth
                    margin={props.margin}
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
            </React.Fragment>
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting ? option.structured_formatting.main_text_matched_substrings : '';
                const parts = parse(
                    option.structured_formatting.main_text ? option.structured_formatting.main_text : '',
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}
                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
