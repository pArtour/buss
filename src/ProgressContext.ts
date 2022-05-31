import React from "react";

export const ProgressContext = React.createContext({
    progressValue: 33,
    currentStep: 0,
    setProgressValue: (value: number) => {},
    setCurrentStep: (value: number) => {},
});
