import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input('tooltip') tooltipText: string = '';
  @Input('tooltip-position') tooltipPosition:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right' = 'top';
  @Input('tooltip-disabled') tooltipDisabled: 'true' | 'false' | true | false =
    false;
  private tooltip: HTMLElement | null = null;
  private offset = 10;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (
      (!this.tooltip && !this.tooltipDisabled) ||
      this.tooltipDisabled === 'false'
    ) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.createTooltip();
    this.setPosition();
    this._renderer.addClass(this.tooltip, 'tooltip-show');
  }

  hide() {
    if (this.tooltip) {
      this._renderer.removeClass(this.tooltip, 'tooltip-show');
      this._renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

  createTooltip() {
    this.tooltip = this._renderer.createElement('span');
    this._renderer.appendChild(
      this.tooltip,
      this._renderer.createText(this.tooltipText)
    );

    this._renderer.appendChild(document.body, this.tooltip);
    this._renderer.addClass(this.tooltip, 'tooltip');
    this._renderer.addClass(this.tooltip, `tooltip-${this.tooltipPosition}`);
  }

  setPosition() {
    if (!this.tooltip) return;

    const hostPos = this._el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top, left;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - this.offset;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + this.offset;
        break;
    }

    this._renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this._renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
