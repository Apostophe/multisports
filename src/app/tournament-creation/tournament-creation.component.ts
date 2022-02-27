import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

import {v4 as uuidv4} from 'uuid';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const refereeConnection = 'https://warm-dusk-64603.herokuapp.com/create-tournament';
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


  onSubmit(){
    let params = new HttpParams().set("tournamentName",this.tournament_name).set("sport",this.tournament_sport);
    this.http.get(refereeConnection,{params:params,responseType: 'text'}).subscribe(data => {
      console.log(data);
    });
  }

}
