import { TimeInfo } from "./types";
import React from "react";

export const TimesContext = React.createContext<{ times: TimeInfo[]; setTimesValue: (times: TimeInfo[]) => void }>({
    times: [],
    setTimesValue: (times: TimeInfo[]) => {},
});
