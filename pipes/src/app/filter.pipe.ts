import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // this will make the pipe being reaplied everytime any data on the page changes. Carefull with this , can lead to performance issues 
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propToFilter : string): any {
    if(value.length === 0) {
      return value
    }
   
    if(filterString !== ""){
      return (value as []).filter(item => item[`${propToFilter}`] === filterString)
    }

    return value
  }

}
