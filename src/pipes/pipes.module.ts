
import {NgModule} from "@angular/core";
import {HhmmssPipe} from "./hhmmss/hhmmss";
import {FilterByContractPipe} from "./filter-by-contract/filter-by-contract";

@NgModule({
	declarations: [
    HhmmssPipe,
    FilterByContractPipe
  ],
	imports: [
  ],
	exports: [
	  HhmmssPipe,
    FilterByContractPipe
  ]
})
export class PipesModule {}
