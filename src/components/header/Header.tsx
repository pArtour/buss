import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Steps from "components/steps/Steps";
import { ProgressContext } from "ProgressContext";

const steps = ["Region", "Station", "Buss"];

const Header: React.FC = () => {
    const isTablet = useMediaQuery("(min-width:768px)");
    const { currentStep, progressValue } = useContext(ProgressContext);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }} component="header">
            <Stack
                sx={{ width: "100%", color: "black", padding: isTablet ? 4 : 2, paddingTop: 2, paddingBottom: 2 }}
                spacing={isTablet ? 4 : 2}
                direction={isTablet ? "row" : "column"}
                justifyContent={isTablet ? "space-between" : "center"}
            >
                <Typography variant="h5" component="h1">
                    bustation
                </Typography>
                {isTablet && <Steps steps={steps} currentStep={currentStep} />}
            </Stack>
            <LinearProgress sx={{ marginBottom: 2 }} variant="determinate" value={progressValue} />
            {!isTablet && <Steps steps={steps} currentStep={currentStep} />}
        </Box>
    );
};

export default Header;
