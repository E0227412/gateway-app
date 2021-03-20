import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { carRoute } from './car.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(carRoute)],
  declarations: [CarComponent, CarDetailComponent],
})
export class CarsappCarModule {}
