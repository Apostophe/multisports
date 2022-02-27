import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  fini;

  equipeA:string="";
  private routeSub: Subscription;
  equipeB:string="";
  model:any;

  games= [];
  gamesFini = [];
  constructor(private route:ActivatedRoute,private http: HttpClient,private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
    });
    this.refreshData();
  }

  refreshData(){
    let params = new HttpParams().set("tournamentID",this.id.toString()); //Create new HttpParams
    this.http.get<any>('https://warm-dusk-64603.herokuapp.com/get-live-match-for-tournament', {params: params}).subscribe(data=>{
      data.forEach(element => {
        {
          element.MatchValues = JSON.parse(element.MatchValues);

          if(!element.MatchValues.Status.includes("END_MATCH")){
            
            this.games.push(element);
          }
          else{this.gamesFini.push(element);}
        }
      });
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

  openDialog(content,equipeA,equipeB,id):void{
    this.modalService.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
         console.log(this.model);
         if(this.model == "Oui"){
          this.router.navigateByUrl("/match/"+equipeA+"/"+equipeB+"/"+id+"/referee");
         }
         else{
          this.router.navigateByUrl("/match/"+equipeA+"/"+equipeB+"/"+id);
         }
       });
    //this.router.navigateByUrl("/match/"+equipeA+"/"+equipeB);
  }
  

}
