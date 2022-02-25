import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const refereeConnection = 'ws://127.0.0.1:8000/create-match';


@Component({
  selector: 'app-tournament-display',
  templateUrl: './tournament-display.component.html',
  styleUrls: ['./tournament-display.component.scss']
})
export class TournamentDisplayComponent implements OnInit {
  id:Number;
  equipeA:string="";
  private routeSub: Subscription;
  equipeB:string="";
  games;
  constructor(private route:ActivatedRoute,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    let params = new HttpParams().set("tournamentID",this.id.toString()); //Create new HttpParams
    this.http.get<any>('http://127.0.0.1:8000/get-live-match-for-tournament', {params: params}).subscribe(data=>{
      console.log(data);
      this.games =data;
    });
    console.log(this.games);

  }

  createGame():void{
    let data = {
      "equipeA": this.equipeA,
      "equipeB": this.equipeB,
      "tournamentID":this.id.toString(),
      "sport":"BADMINTON"
    }
    const headers = { 'content-type': 'application/json','Access-Control-Allow-Origin': '*'};

    let params = new HttpParams().set("tournamentID",this.id.toString()).set("equipeA",this.equipeA).set("equipeB",this.equipeB).set("sport","BADMINTON"); //Create new HttpParams
    console.log(params);
    this.http.get('http://127.0.0.1:8000/create-match',{params:params,responseType: 'text'}).subscribe(data=>{
      console.log(data);
    });
  }
  

}
