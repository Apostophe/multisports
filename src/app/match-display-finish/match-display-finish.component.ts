import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-match-display-finish',
  templateUrl: './match-display-finish.component.html',
  styleUrls: ['./match-display-finish.component.scss']
})
export class MatchDisplayFinishComponent implements OnInit {

  equipeA;
  equipeB;
  nbSetA=0;
  nbSetB=0;
  pointA=0;
  pointB=0;
  id;
  interval: any;
  refereeConnection;



  constructor(private route: ActivatedRoute,private router: Router,private elementRef: ElementRef) { }
  myWebSocketreferee

  ngOnInit(): void {

    this.equipeA = this.route.snapshot.paramMap.get('equipeA');
    this.equipeB = this.route.snapshot.paramMap.get('equipeB');
    this.id = this.route.snapshot.paramMap.get('id')
    this.refereeConnection= 'wss://warm-dusk-64603.herokuapp.com/referee?IdMatch='+this.id;
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
    }, 40000);
  }
  refreshData():void{
    this.startWS();
    this.blankStart();
  }

  startWS(){
    this.myWebSocketreferee = webSocket({
      url:this.refereeConnection,
      deserializer:({data})=>data.replace(/\'/g, '"')
    });
    
    this.myWebSocketreferee.subscribe(msg => {
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
          if(element.Status=="SET_IN_PROGRESS"){
            this.pointA = element.EquipeA.Score;
            this.pointB = element.EquipeB.Score;
          }
        });
      }
    });
    this.blankStart();
  }

  blankStart(){
    this.myWebSocketreferee.next(
      {"IdMatch": this.id,
      "Equipe": "EQUIPEA",
      "EventType": "POINT",
      "EventValue": "{\"Point\":0}"});
  }
  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }
}
