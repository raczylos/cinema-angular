import { Time } from "@angular/common";
import { movie } from "./movie";
import { room } from "./room";

export interface screening {
    id: string;
    film: movie;
    date: Date | any;
    time: Time;
    room: room;
    soldTickets: number;
    availableTickets: number;
    takenSeats: string[]; //albo Array<> ?
}