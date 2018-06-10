// importar modulos necesarios para crear un modulo
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// importar components
import { GuardarEmailComponent } from './components/guardarEmail/guardarEmail.component';
import { MainEmailComponent } from './components/mainEmail/mainEmail.component';
import { MostrarEmailComponent} from './components/mostrarEmail/mostrarEmail.component';

// Declareacion ngModule para cargar los componentes y la configuracion de modulos 

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        GuardarEmailComponent,
        MostrarEmailComponent,
        MainEmailComponent
    ],
    exports: [MainEmailComponent]
})
export class ModuloEmailModule {};
