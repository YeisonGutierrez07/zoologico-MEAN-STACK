import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

// IMPORTAR NUESTRO NUEVO MODULO
import { ModuloEmailModule } from './moduloEmail/moduloEmail.module';
import { AdminModule } from './admin/admin.module';

// COMPONENTES
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { KeepersComponent } from './components/keeper/keeper.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { HomeComponent } from './components/home/home.component';
import { LogginComponent } from './components/loggin/loggin.component';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    ContactComponent,
    KeepersComponent,
    AnimalsComponent,
    HomeComponent,
    LogginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ModuloEmailModule,
    AdminModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
