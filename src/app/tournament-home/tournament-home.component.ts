import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss']
})

export class TournamentHomeComponent implements OnInit {

  tournaments;
  interval: any;
  searchText;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 5000);
  }

  refreshData():void{
    let refereeConnection = 'https://warm-dusk-64603.herokuapp.com/get-live-tournament';
    this.http.get<any>(refereeConnection).subscribe(data=> {
      this.tournaments = data;
    });
  }

}
