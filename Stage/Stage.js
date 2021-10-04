/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.old = 3;
    this.vars.forceGravity = -1.5;
    this.vars.playerSpeedY = 0;
    this.vars.forceJump = 20;
    this.vars.forceWalk = 3;
    this.vars.playerSpeedX = 0;
    this.vars.level = 1;
    this.vars.oldX = [];
    this.vars.oldY = [];
    this.vars.tileInfoX = [];
    this.vars.tileInfoY = [];
  }
}
