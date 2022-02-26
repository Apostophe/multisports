import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss']
})
export class AllMatchesComponent implements OnInit {

  matches:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      let refereeConnection = 'http://warm-dusk-64603.herokuapp.com/get-live-match';
      this.http.get<any>(refereeConnection).subscribe(data=> {
        console.log(data);
        this.matches = data;
      });
  }

}
