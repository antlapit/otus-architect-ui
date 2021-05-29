import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {reducer} from './redux/signing.reducer';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SigningEffects} from "./redux/signing.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('signing', reducer),
    EffectsModule.forFeature([SigningEffects]),
  ]
})
export class SigningModule { }
