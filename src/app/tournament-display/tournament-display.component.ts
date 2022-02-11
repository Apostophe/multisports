import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

const refereeConnection = 'ws://warm-dusk-64603.herokuapp.com/create-match';


@Component({
  selector: 'app-tournament-display',
  templateUrl: './tournament-display.component.html',
  styleUrls: ['./tournament-display.component.scss']
})
export class TournamentDisplayComponent implements OnInit {

  equipeA:string="";
  equipeB:string="";
  constructor() { }

  ngOnInit(): void {
    let myWebSocket = webSocket(refereeConnection);
    myWebSocket.subscribe();
    console.log(myWebSocket);
    myWebSocket.next({
      equipeA: this.equipeA,
      equipeB: this.equipeB,
      tournamentID: "test",
    });
  }

  

}
