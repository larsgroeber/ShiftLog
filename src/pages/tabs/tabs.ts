import { Component } from '@angular/core';

import {Tab1Root, Tab2Root, Tab3Root} from "../pages";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Tab1Root;
  tab2Root = Tab2Root;
  tab3Root = Tab3Root;

  constructor() {

  }
}
