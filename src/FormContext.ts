import React from "react";

export type FormName = "place" | "station";

export type FormValues = Record<FormName, null | { id: number; label: string }>;

export const FormContext = React.createContext<{
    values: FormValues;
    setFormValue: (name: string, value: string) => void;
    resetForm: () => void;
}>({
    values: {
        place: null,
        station: null,
    },

    setFormValue: (name: string, value: string) => {},
    resetForm: () => {},
});
