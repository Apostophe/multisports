import { Component, ElementRef, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { clearInterval } from 'timers';


@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss']
})

export class TournamentHomeComponent implements OnInit {

  tournaments;
  interval:any;
  searchText;

  constructor(private http: HttpClient, private elementRef:ElementRef) { }
  
  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 60000);
  }

  refreshData():void{
    let refereeConnection = 'https://warm-dusk-64603.herokuapp.com/get-live-tournament';
    this.http.get<any>(refereeConnection).subscribe(data=> {
      this.tournaments = data;
    });
  }
  ngOndestroy() {
    clearInterval(this.interval);
    this.elementRef.nativeElement.remove();
  }

}
