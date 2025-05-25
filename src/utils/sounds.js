import { Howl } from 'howler';

export const placeSound = new Howl({
  src: ['/sounds/place.mp3'],
});

export const winSound = new Howl({
  src: ['/sounds/win.mp3'],
});

export const clickSound = new Howl({
  src: ['/sounds/click.mp3'],
});

export const errorSound = new Howl({
  src: ['/sounds/error.mp3'],
});
