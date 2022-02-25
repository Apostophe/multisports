import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
@Component({
  selector: 'app-match-display',
  templateUrl: './match-display.component.html',
  styleUrls: ['./match-display.component.scss']
})
export class MatchDisplayComponent implements OnInit {
  
  equipeA;
  equipeB;
  nbSetA=0;
  nbSetB=0;
  pointA=0;
  pointB=0;

  constructor() { }
  myWebSocketreferee

  ngOnInit(): void {
    let refereeConnection = 'ws://127.0.0.1:8000/referee';
    this.myWebSocketreferee = webSocket(refereeConnection);
    this.myWebSocketreferee.subscribe();
    console.log(this.myWebSocketreferee);


    let specConnection = 'ws://127.0.0.1:8000/spectateur';
    let myWebSocketspec = webSocket(refereeConnection);
    //myWebSocketspec.subscribe();
    console.log(myWebSocketspec);
  }

  increment(value) {
    if(value == "A"){
      if (this.pointA>=21 && this.pointA-this.pointB<2){
        this.pointA++;
      }
      if (this.pointA<21){
        this.pointA++;
      }
      if(this.pointA==21 && this.pointB<=19){
        this.nbSetA++;
        this.pointA=0;
        this.pointB=0;
      }
      else if (this.pointA>=21 && this.pointA-this.pointB==2){
        this.nbSetA++;
        this.pointA=0;
        this.pointB=0;
      }
    }
    if(value == "B"){
      if (this.pointB>=21 && this.pointB-this.pointA<2){
        this.pointB++;
      }
      if (this.pointB<21){
        this.pointB++;
      }
      if(this.pointB==21 && this.pointA<=19){
        this.nbSetB++;
        this.pointA=0;
        this.pointB=0;
      }
      else if (this.pointB>=21 && this.pointB-this.pointA==2){
        this.nbSetB++;
        this.pointA=0;
        this.pointB=0;
      }
    }
    if(this.nbSetA ==2 || this.nbSetB == 2){
      this.myWebSocketreferee.subscribe();
    }
  };

  decrement (value) {
    if(value =="A" && this.pointA!=0){
      this.pointA--
    }
    else if (value =='B' &&this.pointB !=0){
      this.pointB--;
    }
  };
}
