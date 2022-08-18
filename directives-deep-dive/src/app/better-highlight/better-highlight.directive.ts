import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  
  //setting dinamic colors by using property binding
  @Input() defaultColor: string = 'transparent'
  @Input() highlightColor: string = 'blue'

  // Another alternative to the renderer method
  @HostBinding('style.backgroundColor') backgroundColor: string 
  @HostBinding('style.transition') transition: string

  

  constructor(private elRef : ElementRef, private renderer: Renderer2) { }

  //similar to useEffect hook with the empty dependency array
  ngOnInit(): void {
   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
   this.backgroundColor = this.defaultColor
  }


//the argument is the event listener you desire to attach the mouseover is the method name !!!
  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
    //this.renderer.setStyle(this.elRef.nativeElement, 'transition', '1s')
    this.backgroundColor = this.highlightColor
    this.transition = '1s'

  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    this.backgroundColor = this.defaultColor
  }

}
