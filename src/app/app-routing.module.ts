import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatchDisplayComponent } from './match-display/match-display.component';


const routes: Routes = [
  { path: 'match', component: MatchDisplayComponent },
  { path: 'options', component: AppComponent },
  { path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
