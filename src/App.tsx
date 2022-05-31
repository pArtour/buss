import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Header from "components/header/Header";
import Main from "components/main/Main";
import { FormContext, FormValues } from "FormContext";
import { ProgressContext } from "ProgressContext";
import { TimesContext } from "TimesContext";
import { TimeInfo } from "types";

const App: React.FC = () => {
    const [values, setValues] = useState<FormValues>({ place: null, station: null });
    const [progressValue, setProgressValue] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [times, setTimes] = useState<TimeInfo[]>([]);

    const setFormValue = (key: string, value: string): void => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const resetForm = () => {
        setValues({ place: null, station: null });
        setProgressValue(33);
        setCurrentStep(0);
        setTimes([]);
    };

    const setTimesValue = (times: TimeInfo[]): void => {
        setTimes(times);
    };

    return (
        <FormContext.Provider value={{ values, setFormValue, resetForm }}>
            <ProgressContext.Provider value={{ progressValue, currentStep, setCurrentStep, setProgressValue }}>
                <TimesContext.Provider value={{ times, setTimesValue }}>
                    <Stack spacing={4}>
                        <Header />
                        <Main />
                    </Stack>
                </TimesContext.Provider>
            </ProgressContext.Provider>
        </FormContext.Provider>
    );
};

export default App;
