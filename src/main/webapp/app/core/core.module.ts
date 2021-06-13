import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './redux/core.effects';

/** Core module.
 *  Ключевая функциональность, главным образом глобальные сервисы, используемые глобльно во всём приложении.
*/
@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    EffectsModule.forFeature([CoreEffects])
  ],
  exports: [
  ],
  declarations: []
})
export class CoreModule { }
