import { Client } from "../client/client"
import { Hotel } from "../hotel/hotel"

export class Reservation {
    id?:number
    client?:Client
    hotel?:Hotel
    datedeb?:Date
    datefin?:Date
    numChambre?:number

    /*public constructor( _id : number , _client : Client , _hotel : Hotel , _datedeb : Date , _datefin : Date , _numChambre : number  ){
        this.id = _id;
        this.client = _client;
        this.hotel = _hotel;        
        this.datedeb = _datedeb;
        this.datefin = _datefin;
        this.numChambre = _numChambre;
    }*/
}
