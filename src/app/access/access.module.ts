import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    AccessRoutingModule,
    ReactiveFormsModule,
    RegisterComponent,
],
})
export class AccessModule {}
