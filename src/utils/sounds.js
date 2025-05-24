// import { Howl } from "howler";

// export const clickSound = new Howl({ src: ["/sounds/click.mp3"], volume: 0.4 });
// export const placeSound = new Howl({ src: ["/sounds/place.mp3"], volume: 0.5 });
// export const winSound = new Howl({ src: ["/sounds/win.mp3"], volume: 0.7 });

// export const playSound = (sound, muted) => {
//   if (!muted) sound.play();
// };


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
