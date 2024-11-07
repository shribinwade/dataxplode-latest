import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReadMore]'
})
export class ReadMoreDirective implements AfterViewInit {
  
  @Input() limit: number = 50; // to get the custom text limit
  @Input() toggle: boolean = false; // true: 'Read Less' button will be present

  fullText!: string;
  truncatedText!: string;

  listeners: any[] = []; // add event listeners to unsubscribe all at the end

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // step 1 ---> change the text in HTML DOM element (<p>, <div>, <span>, <h1>, etc)
    this.fullText = this.el.nativeElement.innerHTML;

    if (this.fullText.length > this.limit) { // perform below logic only when text length exceeds limit
      this.truncatedText = this.fullText.substring(0, this.limit);

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);

      // step 2 ---> add a class to the element for animation
      this.renderer.addClass(this.el.nativeElement, 'read-more-animation');

      // step 3 ---> add onMouseEnter and onMouseLeave handlers for the element
      this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.fullText);
      }));

      this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);
      }));
    }
  }

  ngOnDestroy(): void {
    this.listeners.forEach(val => val());
  }
}



