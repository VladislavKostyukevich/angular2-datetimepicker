import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    private listening: boolean;
    private globalClick;

    @Output('clickOutside') clickOutside: EventEmitter<Object>;

    constructor(private _elRef: ElementRef) {
        this.listening = false;
        this.clickOutside = new EventEmitter();
    }

    ngOnInit() {
        this.globalClick = Observable
            .fromEvent(document, 'click')
            .delay(1)
            .do(() => {
                this.listening = true;
            }).subscribe((event: MouseEvent) => {
                this.onGlobalClick(event);
            });
    }

    ngOnDestroy() {
        this.globalClick.unsubscribe();
    }

    onGlobalClick(event: MouseEvent) {
        if (event instanceof MouseEvent && this.listening === true) {
            if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: false
                });
            } else {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: true
                });
            }
        }
    }

    isDescendant(parent, child) {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            } else {
                node = node.parentNode;
            }
        }
        return false;
    }
}