import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortAscend : string): any {
    if(sortAscend === 'descending'){
      return (value as []).sort((a,b) => a['name'] > b['name'] ? 1 : -1)
    }

    return (value as []).sort((a,b) => a['name'] > b['name'] ? -1 : 1)
  }

}
