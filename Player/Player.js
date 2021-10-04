/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Right", "./Player/costumes/Right.svg", {
        x: 33.80282899980915,
        y: 35.349351560910236
      }),
      new Costume("Right2", "./Player/costumes/Right2.svg", {
        x: 37.137238999809114,
        y: 35.34935173751296
      })
    ];

    this.sounds = [new Sound("pop", "./Player/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.resetPlayerPosition();
    this.stage.vars.forceWalk = 3;
    this.stage.vars.forceGravity = -1.5;
    this.stage.vars.forceJump = 20;
    this.stage.vars.playerSpeedX = 0;
    while (true) {
      yield* this.checkPlayerGravity();
      yield* this.checkPlayerWalk();
      yield* this.checkPlayerTouching();
      yield;
    }
  }

  *checkPlayerWalk() {
    if (this.keyPressed("left arrow")) {
      this.stage.vars.playerSpeedX += -1 * this.stage.vars.forceWalk;
    }
    if (this.keyPressed("right arrow")) {
      this.stage.vars.playerSpeedX += 1 * this.stage.vars.forceWalk;
    }
    this.stage.vars.playerSpeedX = this.stage.vars.playerSpeedX * 0.7;
    this.x += this.stage.vars.playerSpeedX;
    if (this.stage.vars.playerSpeedX > 0) {
      this.warp(this.moveOut)(-1, 0);
    } else {
      this.warp(this.moveOut)(1, 0);
    }
  }

  *checkPlayerGravity() {
    this.stage.vars.playerSpeedY += this.stage.vars.forceGravity;
    this.y += this.stage.vars.playerSpeedY;
    if (this.touching(Color.rgb(0, 0, 0))) {
      if (this.stage.vars.playerSpeedY > 0) {
        this.warp(this.moveOut)(0, -1);
        this.stage.vars.playerSpeedY = 0;
      } else {
        this.warp(this.moveOut)(0, 1);
        if (this.keyPressed("up arrow")) {
          this.stage.vars.playerSpeedY = this.stage.vars.forceJump;
        } else {
          this.stage.vars.playerSpeedY = 0;
        }
      }
    }
  }

  *resetPlayerPosition() {
    this.effects.clear();
    this.goto(-196, 46);
  }

  *moveOut(dx, dy) {
    while (!!this.touching(Color.rgb(0, 0, 0))) {
      this.x += dx;
      this.y += dy;
    }
  }

  *checkPlayerTouching() {
    if (this.touching(Color.rgb(9, 255, 0))) {
      this.warp(this.resetPlayerPosition)();
      yield* this.broadcastAndWait("Level Completed");
    }
    if (this.touching(Color.rgb(255, 0, 0))) {
      this.warp(this.resetPlayerPosition)();
    }
  }

  *whenGreenFlagClicked2() {
    this.costume = "Right";
    while (true) {
      if (this.keyPressed("left arrow")) {
        this.costume = "Right2";
      } else {
        this.costume = "Right";
      }
      yield;
    }
  }
}
