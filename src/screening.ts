import { Time } from "@angular/common";

export interface screening {
    id: number;
    film: string;
    date: Date;
    time: Time;
    room: string;
    soldTickets: number;
    availableTickets: number;
    takenSeats: Object; //albo Array<> ?
}