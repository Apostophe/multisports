import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

import {v4 as uuidv4} from 'uuid';

const refereeConnection = 'ws://warm-dusk-64603.herokuapp.com/referee?refereeID=';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
    let myuuid = uuidv4();
    console.log('Your UUID is: ' + myuuid);
    let myWebSocket = webSocket(refereeConnection+myuuid);
    myWebSocket.subscribe();
    console.log(myWebSocket);
    myWebSocket.next({
      Referee : myuuid,
      Event : 'match created'
    });
  }

}
