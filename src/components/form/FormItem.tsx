import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormContext, FormName } from "FormContext";

interface FormItemProps {
    name: FormName;
    label: string;
    hint: string;
    options: any[];
    disabled: boolean;
    getOptionLabel: (option: any) => string;
    onChangeCallback?: (value?: any) => void;
    onClearCallback?: () => void;
    groupBy?: (option: any) => string;
}

const FormItem: React.FC<FormItemProps> = ({
    label,
    hint,
    name,
    options,
    disabled,
    getOptionLabel,
    onChangeCallback,
    onClearCallback,
    groupBy,
}) => {
    const isTablet = useMediaQuery("(min-width:768px)");
    const [inputValue, setInputValue] = useState("");
    const { values, setFormValue } = useContext(FormContext);
    return (
        <Box>
            <Stack direction={isTablet ? "row" : "column"} justifyContent={isTablet ? "space-between" : "center"}>
                <Box>
                    <Typography variant="h6" component="h6" sx={{ marginBottom: 1, lineHeight: 1 }}>
                        {label}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
                        {hint}
                    </Typography>
                </Box>
                <Autocomplete
                    value={values[name]}
                    onChange={(event: any, newValue: any) => {
                        if (newValue === null && onClearCallback) {
                            onClearCallback();
                        }
                        setFormValue(name, newValue);
                        if (onChangeCallback && newValue) {
                            onChangeCallback(newValue);
                        }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    disablePortal
                    getOptionLabel={getOptionLabel}
                    groupBy={groupBy}
                    id={name}
                    options={options}
                    disabled={disabled}
                    sx={{ width: isTablet ? "50%" : "100%" }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </Stack>
            <Divider component="div" sx={{ marginTop: isTablet ? 3 : 4 }} />
        </Box>
    );
};

export default FormItem;
