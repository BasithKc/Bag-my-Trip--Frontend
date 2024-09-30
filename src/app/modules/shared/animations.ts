import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInBottom = trigger("slideInBottom", [
    state("hidden", style({
        opacity : 0,
        transform: 'translateY(100px); margin-right(1px)'
    })),
    state("visible", style({
        opacity : 1,
        transform : 'translateY(0) margin-right(1px)'
    })),
    transition("hidden => visible", [
        animate("1s ease-out")
    ])
])