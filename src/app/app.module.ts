import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchDisplayComponent } from './match-display/match-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  exports:[MatchDisplayComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
