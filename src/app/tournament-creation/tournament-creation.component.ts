import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

import {v4 as uuidv4} from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const refereeConnection = 'http://warm-dusk-64603.herokuapp.com/create-tournament';
@Component({
  selector: 'app-tournament-creation',
  templateUrl: './tournament-creation.component.html',
  styleUrls: ['./tournament-creation.component.scss']
})


export class TournamentCreationComponent implements OnInit {

  tournament_name:string='';
  tournament_sport:string='';
  eachProduct = {
    "tournamentName": this.tournament_name,
    "sport": this.tournament_sport,
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  setNumber:number=0;

  points:number=0;
  title = 'multisports';

  increment(value) {
    if(value == "setNumber")
      this.setNumber++;
    else
      this.points++;
  };
  decrement (value) {
    if(value == "setNumber")
      this.setNumber--;
    else
      this.points--;
  };

  onSubmit(){
    const headers = { 'content-type': 'application/json','Access-Control-Allow-Origin': '*'};
    this.http.post(refereeConnection,this.eachProduct,{'headers':headers}).subscribe(data => {
      console.log(data);
    });
  }

}
