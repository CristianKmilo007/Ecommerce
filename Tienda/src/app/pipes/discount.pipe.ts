import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let discount = Math.round(value - (value*args[0])/100)
    
    
    return discount;
  }

}
