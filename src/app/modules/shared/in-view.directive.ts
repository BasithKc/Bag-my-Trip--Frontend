import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
    selector : "[inView]"
})
export class InviewDirective implements AfterViewInit, OnDestroy{
    @Output() inView = new EventEmitter<boolean>()
    private observer!: IntersectionObserver
    constructor(private element: ElementRef) {}

    private createObserver(): void {
        const options = {
            root : null,  // Use the viewport as the container
            threshold : 0.1  // Trigger when 10% of the element is visible   
        }

        this.observer = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if ( entry.isIntersecting ) {
                    this.inView.emit(true)
                    this.observer.unobserve(this.element.nativeElement)
                }
            })
        }, options)

        this.observer.observe(this.element.nativeElement)
    }

    ngAfterViewInit(): void {
        this.createObserver()
    }

    ngOnDestroy(): void {
        if ( this.observer ) {
            this.observer.disconnect()  // Disconnect the observer when the directive is destroyed
        }
    }
}