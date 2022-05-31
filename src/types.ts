export type NullableRecord = Record<"Int32" | "String" | "Valid", string | number | boolean>;
export type Nullable = null | NullableRecord;

export interface TimeInfo {
    trip_id: number;
    arrival_time: string;
    departure_time: string;
    stop_id: number;
    stop_sequence: Nullable;
    pickup_type: Nullable;
    drop_off_type: Nullable;
    trips: Trip[];
    routes: Route[];
}

export interface Route {
    route_id: string;
    agency_id: Nullable;
    route_short_name: Nullable;
    route_long_name: Nullable;
    route_type: Nullable;
    route_color: Nullable;
}

export interface Trip {
    route_id: string;
    service_id: number;
    trip_id: number;
    trip_headsign: Nullable;
    trip_long_name: Nullable;
    direction_code: Nullable;
    wheelchair_accessible: Nullable;
}
