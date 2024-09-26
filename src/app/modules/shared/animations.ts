import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInBottom = trigger("slideInBottom", [
    state("hidden", style({
        opacity : 0,
        transform: 'translateY(100px)'
    })),
    state("visible", style({
        opacity : 1,
        transform : 'translateY(0)'
    })),
    transition("hidden => visible", [
        animate("1s ease-out")
    ])
])