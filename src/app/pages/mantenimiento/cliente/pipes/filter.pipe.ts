import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filtrar'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultposts = [];
    for(const cliente of value){
      if(cliente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         resultposts.push(cliente);
      } else {
        (cliente.docuemto.indexOf(arg) > -1)
        resultposts.push(cliente);
      }
    };
    return resultposts;
  }

}