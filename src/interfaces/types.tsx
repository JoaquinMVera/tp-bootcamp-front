export type Category =
	| "musical"
	| "theather"
	| "concert";

export interface Venue{
    id:number;
    name:string;
}

export interface Show {
    id: number;
    name:string;
    category:string;
    venueId:number;
}

export interface Performance{
    id: number;
    date: string;
    showId:number;
    active: boolean;
}

export interface Zone {
    id:number;
    name:string;
    showId:number;
    price:number;
}

export interface RemainingTickets{
    id:number;
    remaining:number;
    zoneId: number;
    performanceId:number;
}

export interface ShowInfo{
    show: Show;
    performances: Performance[];
    zones: Zone[];
    remainingTickets: RemainingTickets[];
    soldOut: boolean;
}


export interface User{
    id:number;
    name:string;
    email:string;
    balance:number;
}

export interface Booking{
    id:number;
    ticketAmount:number;
    purcharseDate: string;
    performanceId: number;
    zoneID: number;
    userId: number;
}
//el getAllShows nos devuelve un show, un array de performances, y un array de zonas, asi como el boolean para saber si se vendio todo