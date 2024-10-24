import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInBottom = trigger("slideInBottom", [
    state("hidden", style({
        opacity : 0.2,
        transform: 'translateY(30px) scale(.97)',
        zIndex: '999'    })),
    state("visible", style({
        opacity : 1,
        transform : 'translateY(0)',
        zIndex: '999'    })),
    transition("hidden => visible", [
        animate("1s ease-out")
    ])
])

export const slideInLeft = trigger("slideInLeft", [
    state("hidden", style({
        opacity : 0.2,
        transform: 'translateX(-30px) scale(.97)'
    })),
    state("visible", style({
        opacity : 1,
        transform : '*'
    })),
    transition("hidden => visible", [
        animate("1s ease-out")
    ])
])

export const fadeIn = trigger("fadeIn", [
    state("hidden", style({
        opacity : 0.2,
        transform: 'scale(.95)'
    })),
    state("visible", style({
        opacity : 1,
        transform : '*'
    })),
    transition("hidden => visible", [
        animate('1s ease-out')
    ])
])