import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  //name here must the same as the selector
  @Input () set appUnless (condition: boolean){
    if(!condition){
      //create 
      this.vcRef.createEmbeddedView(this.templateRef)
    }else{
      //remove
      this.vcRef.clear()
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
