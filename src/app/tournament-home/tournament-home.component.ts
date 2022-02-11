import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss']
})

export class TournamentHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let refereeConnection = 'ws://warm-dusk-64603.herokuapp.com/get-live-tournament';
    let myWebSocket = webSocket(refereeConnection);
    myWebSocket.subscribe();
    console.log(myWebSocket);
  }

}
