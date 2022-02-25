import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchDisplayComponent } from './match-display/match-display.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TournamentHomeComponent } from './tournament-home/tournament-home.component';
import { TournamentDisplayComponent } from './tournament-display/tournament-display.component';
import { TournamentCreationComponent } from './tournament-creation/tournament-creation.component';
import { HttpClientModule } from '@angular/common/http';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    MatchDisplayComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TournamentHomeComponent,
    TournamentDisplayComponent,
    TournamentCreationComponent,
    AllMatchesComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  exports:[MatchDisplayComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
