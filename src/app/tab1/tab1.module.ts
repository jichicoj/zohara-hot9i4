import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SharedDirectivesModule} from "../directives/shared-directives.module";
import {LogoutPageModule} from "../pages/logout/logout.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ScrollingModule,
    SharedDirectivesModule,
    LogoutPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
