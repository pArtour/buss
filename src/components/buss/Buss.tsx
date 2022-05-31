import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { TimesContext } from "TimesContext";
import { ProgressContext } from "ProgressContext";

const groupBy = function (xs: any[], key: string) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const filterByTime = (route: any) => {
    const [h, m] = route.time.split(":");
    const nowMs = new Date().valueOf();
    const date = new Date();
    date.setHours(parseInt(h, 10));
    date.setMinutes(parseInt(m, 10));
    const dateMs = date.valueOf();

    return nowMs <= dateMs;
};

const getRequiredRoutes = (routes: any[], amount: number) => {
    const uniqueTimeRoutes = [...(new Map(routes.map((item) => [item["time"], item])).values() as any)];

    const filteredRoutes = uniqueTimeRoutes.filter(filterByTime);
    if (amount > uniqueTimeRoutes.length) {
        return uniqueTimeRoutes;
    }

    if (filteredRoutes.length >= amount) {
        return [...filteredRoutes].slice(0, amount);
    }

    return [...filteredRoutes, ...uniqueTimeRoutes.slice(0, amount - filteredRoutes.length)];
};

const sortTime = (prev: any, curr: any) => {
    const [prevHours, prevMinutes] = prev.time.split(":");
    const [currHours, currMinutes] = curr.time.split(":");

    if (parseInt(prevHours, 10) === parseInt(currHours, 10)) {
        return parseInt(prevMinutes, 10) - parseInt(currMinutes, 10);
    }

    return parseInt(prevHours, 10) - parseInt(currHours, 10);
};

const Buss: React.FC = () => {
    const isTablet = useMediaQuery("(min-width:768px)");
    const { times } = useContext(TimesContext);
    const { setProgressValue, setCurrentStep } = useContext(ProgressContext);

    const flattenTimes: any[] = times?.map((item) => {
        const routes = item.routes.map((route) => ({
            id: route.route_id,
            name: route.route_short_name?.String || "",
            longName: route.route_long_name?.String || "",
            time: item.arrival_time,
        }));
        return routes;
    });

    const groupedByNameRoutesMap = groupBy([].concat(...flattenTimes), "name") || [];

    const onAccordionClick = () => {
        setProgressValue(100);
        setCurrentStep(3);
    };

    return (
        <Stack
            spacing={1}
            direction={isTablet ? "row" : "column"}
            justifyContent={isTablet ? "space-between" : "center"}
        >
            <Box>
                <Typography variant="h6" component="h6" sx={{ marginBottom: 1, lineHeight: 1 }}>
                    Buss
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
                    Select suitable buss
                </Typography>
            </Box>

            {times.length > 0 && Object.keys(groupedByNameRoutesMap).length > 0 ? (
                <Box sx={{ width: isTablet ? "50%" : "100%" }}>
                    {Object.keys(groupedByNameRoutesMap)
                        .sort((a, b) => {
                            const numA = a.replace(/\D/g, "");
                            const numB = b.replace(/\D/g, "");
                            return parseInt(numA, 10) - parseInt(numB, 10);
                        })
                        .map((bussName) => (
                            <Accordion key={bussName} onClick={onAccordionClick}>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>{bussName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>Route: {groupedByNameRoutesMap[bussName][0].longName}</Typography>
                                    {getRequiredRoutes(groupedByNameRoutesMap[bussName].sort(sortTime), 5).map(
                                        (route: any) => (
                                            <Typography key={route.id + "_" + bussName + "_" + route.time}>
                                                {route.time}
                                            </Typography>
                                        )
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </Box>
            ) : null}
        </Stack>
    );
};

export default Buss;
