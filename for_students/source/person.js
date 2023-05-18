import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let personCount = 0;
export class Person extends GrObject {
    constructor(params = {}) {
        let person = new T.Group();
        super(`Person-${++personCount}`, person);

        // attributes
        this.torsoColor = '#ffffff';
        this.skinColor = '#ffffff';
        this.state = STATES.WALKING;

        // torso
        if (params.clothingColor) {
            this.torsoColor = params.clothingColor;
        }
        let torso = new T.Mesh(new T.CylinderGeometry(0.25, 0.25, 1),
            new T.MeshStandardMaterial({ color: this.torsoColor }));

        if (params.skinColor) {
            this.skinColor = params.skinColor;
        }
        let head = new T.Mesh(new T.SphereGeometry(0.25),
            new T.MeshStandardMaterial({ color: this.skinColor }));

        let leftArm = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.5),
            new T.MeshStandardMaterial({ color: this.skinColor }));
        let rightArm = leftArm.clone();

        person.add(torso);
        torso.add(head);
        torso.add(leftArm);
        torso.add(rightArm);

        this.rideable = head;

        head.position.y = 0.75;
        leftArm.position.set(0.25, 0.1, 0);
        rightArm.position.set(-0.25, 0.1, 0);
        torso.position.y = 0.5;
    }

    walkForward(distance) {
        this.objects[0].translateZ(distance);
    }
}

const skinColors = [
    '#8d5524',
    '#c68642',
    '#e0ac69',
    '#f1c27d',
    '#ffdbac',
    '#5e3613',];

const clothingColors = [
    '#a51c30',
    '#b35d50',
    '#ccac93',
    '#e89c78',
    '#8f5933',
    '#d69c2e',
    '#7885ab',
    '#3e5a99',
    '#1e4d2b',
    '#004225',
    '#8e6bbd',
    '#e07fc2',
    '#d9a7c7',
    '#2e2d88',
    '#8c3d31',
    '#0d3b66'];

export function randPersonParams() {
    return {
        skinColor: skinColors[Math.floor(Math.random() * skinColors.length)],
        clothingColor: clothingColors[Math.floor(Math.random() * clothingColors.length)],
    };
}

export class Pacer extends Person {
    constructor(params = {}) {
        super(params);
        this.state = STATES.WALKING;
        this.dz = 0;
        this.dtheta = 0;
        this.waitClock = 0;
        this.paceDistance = params.paceDistance ? params.paceDistance : 10;
    }
    stepWorld(delta, timeOfDay) {
        super.stepWorld();

        const lilDelta = delta / 1000;
        if (this.state === STATES.WALKING) {
            if (this.dz >= this.paceDistance) {
                this.state = STATES.WAITING;
                this.dz = 0;
            }
            else {
                this.walkForward(lilDelta);
                this.dz += lilDelta;
            }
        }
        else if (this.state === STATES.WAITING) {
            this.waitClock += delta;
            if (this.waitClock > 1000) {
                this.state = STATES.TURN_LEFT;
                this.waitClock = 0;
            }
        }
        else if (this.state === STATES.TURN_LEFT) {
            this.objects[0].rotateY(lilDelta);
            if (this.dtheta >= Math.PI - 0.1) {
                this.state = STATES.WALKING;
                this.dtheta = 0;
            }
            this.dtheta += lilDelta;
        }

    }
}

const STATES = {
    WALKING: 0,
    WAITING: 1,
    TURN_LEFT: 2
}
