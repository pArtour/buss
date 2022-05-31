import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import useMediaQuery from "@mui/material/useMediaQuery";

interface StepsProps {
    steps: string[];
    currentStep: number;
}

const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
    const isTablet = useMediaQuery("(min-width:768px)");

    return (
        <Stepper
            activeStep={currentStep}
            sx={{ width: isTablet ? "66%" : "100%", paddingLeft: isTablet ? 2 : 1, paddingRight: isTablet ? 2 : 1 }}
        >
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                return (
                    <Step key={label} {...stepProps} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default Steps;
