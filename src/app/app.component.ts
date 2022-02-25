import { Component } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

import {v4 as uuidv4} from 'uuid';

const refereeConnection = 'ws://127.0.0.1:8000/referee?refereeID=';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
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
