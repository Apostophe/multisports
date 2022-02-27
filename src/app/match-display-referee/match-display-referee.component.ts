import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
@Component({
  selector: 'app-match-display-referee',
  templateUrl: './match-display-referee.component.html',
  styleUrls: ['./match-display-referee.component.scss']
})
export class MatchDisplayRefereeComponent implements OnInit {
  
  equipeA;
  equipeB;
  nbSetA=0;
  nbSetB=0;
  pointA=0;
  pointB=0;
  id:string;
  refereeConnection;
  stopbouncing=false;

  constructor(private route: ActivatedRoute,private router: Router,private elementRef: ElementRef) { }
  myWebSocketreferee;

  ngOnInit(): void {
    this.equipeA = this.route.snapshot.paramMap.get('equipeA');
    this.equipeB = this.route.snapshot.paramMap.get('equipeB');
    this.id = this.route.snapshot.paramMap.get('id');
    this.refereeConnection = 'ws://warm-dusk-64603.herokuapp.com/referee?IdMatch='+this.id;
    this.beginMatch();

  }


   findDiff(str1, str2){ 
    let diff= "";
    str2.split('').forEach(function(val, i){
      if (val != str1.charAt(i))
        diff += val ;         
    });
    return diff;
  }

  startWS(){
    this.myWebSocketreferee = webSocket({
      url:this.refereeConnection,
      deserializer:({data})=>data.replace(/\'/g, '"')
    });
    
    this.myWebSocketreferee.subscribe(msg => {
      console.log(msg);
      if(msg.trim() != "Connection succeed !"){
        let data = JSON.parse(msg);
        console.log(data);
        if(data.Status == "NOT_BEGN"){
          this.myWebSocketreferee.next(
            {"IdMatch": this.id,
            "Equipe": "",
            "EventType": "BEGIN_MATCH",
            "EventValue": "BEGIN_MATCH"});
        }
        this.nbSetA=0;
        this.nbSetB=0;
        data.Sets.forEach(element => {
          if(element.Status=="END_SET"){
            if(element.EquipeA.Score>element.EquipeB.Score)
              this.nbSetA++;
            else if(element.EquipeB.Score>element.EquipeA.Score)
              this.nbSetB++;
          }
          if(this.nbSetA ==2 || this.nbSetB == 2){
            this.endMatch();
            this.router.navigateByUrl("/tournament-home");
          }
          if(element.Status=="SET_IN_PROGRESS"){
            this.pointA = element.EquipeA.Score;
            this.pointB = element.EquipeB.Score;
            this.checkSet();
          }
        });
      }
    })
     ;
    this.blankStart();
    console.log(this.myWebSocketreferee);
  }

  beginMatch(){
    this.startWS();
  }

  checkSet(){
    if((this.pointA==21 && this.pointB<=19)|| (this.pointB==21 && this.pointA<=19) ||(this.pointA>=21 && this.pointA-this.pointB==2)||(this.pointB>=21 && this.pointB-this.pointA==2)){
      this.endSet();
      this.newSet();
    }
  }

  increment(value) {
    if(value == "A"){
      if (this.pointA>=21 && this.pointA-this.pointB<2){
        this.addPoint("A");
      }
      if (this.pointA<21){
        this.addPoint("A");
      }
      if (this.pointA>=21 && this.pointA-this.pointB==2){

      }
    }
    if(value == "B"){
      if (this.pointB>=21 && this.pointB-this.pointA<2){
        this.addPoint("B");
      }
      if (this.pointB<21){
        this.addPoint("B");
      }
    }
  };
  blankStart(){
    this.startWS();

    this.myWebSocketreferee.next(
      {"IdMatch": this.id,
      "Equipe": "EQUIPEA",
      "EventType": "POINT",
      "EventValue": "{\"Point\":0}"});
  }

  addPoint(equipe){
    this.startWS();

      this.myWebSocketreferee.next(
        {"IdMatch": this.id,
        "Equipe": "EQUIPE"+equipe,
        "EventType": "POINT",
        "EventValue": "{\"Point\":1}"});
  }
removePoint(equipe)
{
  this.startWS();

    this.myWebSocketreferee.next(
      {"IdMatch": this.id,
      "Equipe": "EQUIPE"+equipe,
      "EventType": "POINT",
      "EventValue": "{\"Point\":-1}"});
  }

  endMatch(){
    this.startWS();

    this.stopbouncing = true;
    this.myWebSocketreferee.next(
    {"IdMatch": this.id,
    "Equipe": "",
    "EventType": "END_MATCH",
    "EventValue": "END_MATCH"
    });
  }

  endSet(){
    this.startWS();

    this.myWebSocketreferee.next(
    {"IdMatch": this.id,
    "Equipe": "",
    "EventType": "END_SET",
    "EventValue": "END_SET"
    });
  }

  newSet(){
    this.startWS();

    this.myWebSocketreferee.next(
    {"IdMatch": this.id,
    "Equipe": "",
    "EventType": "NEW_SET",
    "EventValue": "NEW_SET"
    });
  }

  decrement (value) {
    if(value =="A" && this.pointA!=0){
      this.pointA--
    }
    else if (value =='B' &&this.pointB !=0){
      this.pointB--;
    }
  };
}
