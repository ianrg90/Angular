import { Directive, ElementRef, OnInit } from "@angular/core";

//similar to React custom hooks concept 

@Directive({
    selector: '[appHighlight]'
})

export class BasicHighlightDirective implements OnInit{
    constructor( private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green'
    }
}