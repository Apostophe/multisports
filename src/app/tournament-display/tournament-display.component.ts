import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const refereeConnection = 'ws://warm-dusk-64603.herokuapp.com/create-match';


@Component({
  selector: 'app-tournament-display',
  templateUrl: './tournament-display.component.html',
  styleUrls: ['./tournament-display.component.scss']
})
export class TournamentDisplayComponent implements OnInit {
  id:Number;
  name:string;
  equipeA:string="";
  private routeSub: Subscription;
  equipeB:string="";
  games;
  constructor(private route:ActivatedRoute,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
    });
    this.refreshData();
    console.log(this.games);
  }

  refreshData(){
    let params = new HttpParams().set("tournamentID",this.id.toString()); //Create new HttpParams
    this.http.get<any>('https://warm-dusk-64603.herokuapp.com/get-live-match-for-tournament', {params: params}).subscribe(data=>{
      console.log(data);
      this.games =data;
    });
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
    this.http.get('https://warm-dusk-64603.herokuapp.com/create-match',{params:params,responseType: 'text'}).subscribe(data=>{
      console.log(data);
      this.refreshData();
    });
  }
  

}
