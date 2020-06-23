import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import MemoryService from '../../services/memory.service';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [MemoryService],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
