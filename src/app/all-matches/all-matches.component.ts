import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss']
})
export class AllMatchesComponent implements OnInit {
  model:any;
  matches:any = [];
  fini;
  matchesfini:any=[];
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal) { }
  closeResult = '';
  ngOnInit(): void {
      let refereeConnection = 'https://warm-dusk-64603.herokuapp.com/get-live-match';
      this.http.get<any>(refereeConnection).subscribe(data=> {
        console.log(data);
        data.forEach(element => {
          if(!element.MatchValues.includes("END_MATCH")){
            this.matches.push(element);
          }
          else{this.matchesfini.push(element);}
        });
        console.log(this.matches);
        console.log(this.matchesfini);
      });
  }

  openDialog(content,game,id):void{
    this.modalService.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
         console.log(this.model);
         console.log(game);
         console.log(game.Status);
         if(game.MatchValues.Status.includes("END_MATCH")){
          this.router.navigateByUrl("/match/"+game.EquipeA+"/"+game.EquipeB+"/"+id+"/finished");
         }
         else{
          if(this.model == "Oui"){
            this.router.navigateByUrl("/match/"+game.EquipeA+"/"+game.EquipeB+"/"+id+"/referee");
           }
           else{
            this.router.navigateByUrl("/match/"+game.EquipeA+"/"+game.EquipeB+"/"+id);
           }
         }
       });
    
    //this.router.navigateByUrl("/match/"+equipeA+"/"+equipeB);
  }

}
