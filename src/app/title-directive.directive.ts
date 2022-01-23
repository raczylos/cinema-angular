import { Directive, Input, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleDirective]'
})
export class TitleDirectiveDirective {
  @Input() title!: string;
  @Input() color!: string;
  @Input() font!: string;
  oldColor = '';
  oldFont = '';

  constructor(private element: ElementRef) { }
  ngAfterViewInit(): void {
    console.log(this.title);

    this.element.nativeElement.innerText = this.title;
  }

  changeLook(old: boolean): void {
    let element =  this.element.nativeElement
    if (!old) {
      this.oldColor = element.style.color
      this.oldFont = element.style.fontFamily
      
      
      element.setAttribute('style', 'text-decoration: underline;');
      element.style.color = this.color
      element.style.fontFamily = this.font
    
    } else {
      element.style.color = this.oldColor
      element.style.fontFamily = this.oldFont
      element.setAttribute('style', 'text-decoration: none;');
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeLook(false);
  }

  @HostListener('mouseleave') onMouseleave() {
    this.changeLook(true);
  }

}
