import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
    ],
    providers: [],
    declarations: [InfoComponent],
    exports: [InfoComponent]
  })
  export class InfoModule {}
