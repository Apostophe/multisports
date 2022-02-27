import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatchDisplayFinishComponent } from './match-display-finish/match-display-finish.component';
import { MatchDisplayRefereeComponent } from './match-display-referee/match-display-referee.component';
import { MatchDisplayComponent } from './match-display/match-display.component';
import { RegisterComponent } from './register/register.component';
import { TournamentCreationComponent } from './tournament-creation/tournament-creation.component';
import { TournamentDisplayComponent } from './tournament-display/tournament-display.component';
import { TournamentHomeComponent } from './tournament-home/tournament-home.component';


const routes: Routes = [
  { path: 'match/:equipeA/:equipeB/:id/referee', component: MatchDisplayRefereeComponent },
  { path: 'match/:equipeA/:equipeB/:id/finished', component: MatchDisplayFinishComponent },
  { path: 'match/:equipeA/:equipeB/:id', component: MatchDisplayComponent },
  { path: 'all-matches', component: AllMatchesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creation-tournament', component: TournamentCreationComponent },
  { path: 'display-tournament/:id/:name', component: TournamentDisplayComponent },
  { path: 'tournament-home', component: TournamentHomeComponent },
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
