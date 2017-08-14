import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShiftProvider } from '../providers/shift/shift';
import {IonicStorageModule} from "@ionic/storage";
import {ComponentsModule} from "../components/components.module";
import {PipesModule} from "../pipes/pipes.module";
import {OptionsPage} from "../pages/options/options";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ListPage,
    OptionsPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShiftProvider,
  ]
})
export class AppModule {}
