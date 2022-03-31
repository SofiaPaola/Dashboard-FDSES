import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormComponent } from './formulario/form.component';

const routes: Routes = [{
    path: '',
    component: ClientesComponent,
    children: [
        {
            path: 'Lista',
            component: ClientesComponent,
        },
        {
            path: 'Detalle',
            component: DetalleComponent,
        },
        {
            path: 'Formulario',
            component: FormComponent
        }
    ]
}];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})

export class ClientesRoutingModule { }

export const routedComponents = [
    ClientesComponent,
    FormComponent,
    DetalleComponent
];