import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import Form from "components/form/Form";
import Buss from "components/buss/Buss";
import { FormContext } from "FormContext";

const Main: React.FC = () => {
    const isTablet = useMediaQuery("(min-width:768px)");
    const { resetForm } = React.useContext(FormContext);

    return (
        <Stack spacing={4} sx={{ padding: isTablet ? 4 : 2, paddingTop: 0 }}>
            <Box>
                <Typography variant="h4" component="h2">
                    Welcome
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="button" display="block" onClick={() => resetForm()}>
                    Clear all
                </Typography>
            </Box>
            <Form />
            <Buss />
        </Stack>
    );
};

export default Main;
