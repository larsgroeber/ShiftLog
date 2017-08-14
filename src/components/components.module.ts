import { NgModule } from '@angular/core';
import { ShiftListComponent } from './shift-list/shift-list';
import { ShiftListItemComponent } from './shift-list-item/shift-list-item';
import {MyApp} from "../app/app.component";
import {IonicModule} from "ionic-angular";
import {PipesModule} from "../pipes/pipes.module";
import { OptionsComponent } from './options/options';
@NgModule({
	declarations: [
	  ShiftListComponent,
    ShiftListItemComponent,
    OptionsComponent,
  ],
	imports: [
    IonicModule.forRoot(MyApp),
    PipesModule,
  ],
	exports: [ShiftListComponent,
    ShiftListItemComponent,
    OptionsComponent]
})
export class ComponentsModule {}
