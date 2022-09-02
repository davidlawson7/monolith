import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTheme } from '../configuration/store/configuration.selectors';
import { Theme } from '../configuration/configuration.models';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit {
  private unsubscribe = new Subject();

  constructor(
    private _elementRef: ElementRef,
    private store: Store,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.store
      .select(selectTheme)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  updateTheme(theme: Theme) {
    this.renderer.setAttribute(
      this._elementRef.nativeElement,
      'data-theme',
      theme
    );
  }
}
