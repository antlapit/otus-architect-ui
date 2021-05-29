import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './redux/core.effects';
import {SigningModule} from "./signing/signing.module";

/** Core module.
 *  Ключевая функциональность, главным образом глобальные сервисы, используемые глобльно во всём приложении.
*/
@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    SigningModule,
    EffectsModule.forFeature([CoreEffects])
  ],
  exports: [
  ],
  declarations: []
})
export class CoreModule { }
