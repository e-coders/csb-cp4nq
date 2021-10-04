/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Maze extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Maze/costumes/1.png", { x: 480, y: 360 }),
      new Costume("2", "./Maze/costumes/2.png", { x: 480, y: 360 }),
      new Costume("Maze3", "./Maze/costumes/Maze3.png", { x: 480, y: 360 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Level Completed" },
        this.whenIReceiveLevelCompleted
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveLevelCompleted() {
    this.stage.vars.level += 1;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.level = 1;
    while (true) {
      this.costume = this.stage.vars.level;
      yield;
    }
  }
}
