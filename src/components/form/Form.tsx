import React, { useEffect, useState, useContext, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import FormItem from "./FormItem";
import useMediaQuery from "@mui/material/useMediaQuery";

import { FormContext } from "FormContext";
import { ProgressContext } from "ProgressContext";
import { TimeInfo } from "types";
import { TimesContext } from "TimesContext";

async function getData<T>(url: string, options?: { body: any; method: string }): Promise<T> {
    const response = await fetch(
        "http://ec2co-ecsel-tvnnznwrodus-918320290.eu-north-1.elb.amazonaws.com:8000" + url,
        options
    );
    const data = await response.json();
    return data;
}

const Form: React.FC = () => {
    const isTablet = useMediaQuery("(min-width:768px)");
    const { values, resetForm } = useContext(FormContext);
    const { setProgressValue, setCurrentStep } = useContext(ProgressContext);
    const { setTimesValue } = useContext(TimesContext);

    const [placeOptions, setPlaceOptions] = useState<any[]>([]);
    const [stationOptions, setStationOptions] = useState<any[]>([]);

    const getPlaces = useCallback(async () => {
        const places = await getData<{ id: number; name: string }[]>("/places");
        setPlaceOptions(places);
    }, []);

    const getStations = async ({ name: place }: { name: string }) => {
        setCurrentStep(1);
        setProgressValue(33);
        if (place) {
            const stations = await getData<any[]>("/stops?place=" + place);
            setStationOptions(
                stations
                    .map((item) => ({ id: item.stop_id, ...item }))
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
            );
        }
    };

    const getRouteInfo = async ({ id }: { id: number }) => {
        const info = await getData<{ times: TimeInfo[] }>("/route-info?stop=" + id);
        setCurrentStep(2);
        setProgressValue(66);
        setTimesValue(info.times);
    };

    useEffect(() => {
        getPlaces();
    }, []);

    const onPlaceClear = () => {
        resetForm();
    };

    const onStationClear = () => {
        setTimesValue([]);
        setProgressValue(66);
        setCurrentStep(1);
    };

    return (
        <Box component="form" sx={{ marginTop: 4 }}>
            <Stack spacing={isTablet ? 4 : 3}>
                <FormItem
                    name="place"
                    label="Region"
                    hint="Write or select your region"
                    options={placeOptions}
                    getOptionLabel={(option) => option.name}
                    disabled={false}
                    onChangeCallback={getStations}
                    onClearCallback={onPlaceClear}
                />
                <FormItem
                    name="station"
                    label="Station"
                    hint="Write or select your station"
                    options={stationOptions}
                    getOptionLabel={(option) => {
                        const stations = stationOptions
                            .map((item) => ({ id: item.id, name: item.name }))
                            .filter((item) => item.name === option.name);

                        if (stations.length > 2) {
                            return 1 + stations.map((item) => item.id).indexOf(option.id) + ". " + option.name;
                        }

                        return stations.length === 1
                            ? option.name
                            : stations.map((item) => item.id).indexOf(option.id) === 0
                            ? option.name + " (A > B)"
                            : option.name + " (B > A)";
                    }}
                    disabled={values.place ? false : true}
                    onChangeCallback={getRouteInfo}
                    onClearCallback={onStationClear}
                    groupBy={(option) => option.name}
                />
            </Stack>
        </Box>
    );
};

export default Form;
