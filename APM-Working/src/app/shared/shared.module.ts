import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    StarComponent,
    FilterComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
