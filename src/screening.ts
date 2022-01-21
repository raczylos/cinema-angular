import { Time } from "@angular/common";
import { movie } from "./Movie";
import { room } from "./room";

export interface screening {
    id: number;
    film: movie;
    date: Date | any;
    time: Time;
    room: room;
    soldTickets: number;
    availableTickets: number;
    takenSeats: string[]; //albo Array<> ?
}