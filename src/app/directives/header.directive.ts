import {AfterViewInit, Directive, HostListener, Input, Renderer2} from '@angular/core';
import {DomController, isPlatform} from "@ionic/angular";

@Directive({
  selector: '[appHeader]'
})
export class HeaderDirective implements AfterViewInit {
  @Input('appHeader') header: any;
  private heightHeader = isPlatform('ios') ? 44 : 56
  private children: any

  constructor(
    private renderer: Renderer2,
    private domCtrlr: DomController
  ) { }

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;

    if (scrollTop < 0) {
      return;
    }

    let newPosition = - scrollTop / 2;

    if (newPosition < - this.heightHeader) {
      newPosition = - this.heightHeader;
    }

    let newOpacity = 1 - (newPosition / - this.heightHeader)

    this.domCtrlr.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px',)

      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity)
      }
    })
  }

}
