import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultposts = [];
    for (const proveedor of value) {
      if (proveedor.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultposts.push(proveedor);
      }
    }
    return resultposts;
  }
}
