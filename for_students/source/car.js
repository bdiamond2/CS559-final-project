import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";

let carCount = 0;
export class Car extends GrObject {
    constructor(params = {}) {
        let carGroup = new T.Group();
        super(`Car-${++carCount}`, carGroup);

        // instance members
        this.color = params.color ? params.color : '#ffffff';
        this.lampOn = undefined;
        this.meshLamp = undefined;
        this.lamp = undefined;
        this.road = undefined;
        this.roadIx = 0;
        this.journey = undefined;
        this.dirIx = undefined;
        this.t = 0;

        this.car = new T.Group();
        carGroup.add(this.car);
        this.makeCar();
        this.makeLamp();
    }
    makeCar() {
        let carGeometry = new T.CylinderGeometry(0.2, 0.4, 3);
        let carMaterial = new T.MeshStandardMaterial({
            color: this.color,
            metalness: 0.5,
            roughness: 0.5,
        });
        let body = new T.Mesh(carGeometry, carMaterial);
        body.rotateX(Math.PI / 2);

        let wheelGeometry = new T.CylinderGeometry(0.3, 0.3, 0.1);
        let wheelMaterial = new T.MeshStandardMaterial({
            color: '#000000'
        });
        let wheel1 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel1.rotateZ(Math.PI / 2);
        wheel1.position.set(0.5, -0.2, 1);
        let wheel2 = wheel1.clone();
        wheel2.position.x = -0.5;
        let wheel3 = wheel1.clone();
        wheel3.position.z = -1;
        let wheel4 = wheel1.clone();
        wheel4.position.x = -0.5;
        wheel4.position.z = -1;

        let axleGeometry = new T.CylinderGeometry(0.05, 0.05, 1);
        let axleMaterial = wheelMaterial;
        let axle1 = new T.Mesh(axleGeometry, axleMaterial);
        axle1.rotateZ(Math.PI / 2);
        axle1.position.set(0, -0.2, 1);
        let axle2 = axle1.clone();
        axle2.position.set(0, -0.2, -1);

        let domeGeometry = new T.SphereGeometry(0.4);
        let domeMaterial = new T.MeshStandardMaterial({
            transparent: true,
            opacity: 0.9,
            color: '#b3fdff',
            metalness: 0.5,
            roughness: 0.1
        });
        let dome = new T.Mesh(domeGeometry, domeMaterial);
        this.rideable = dome;
        dome.position.set(0, 0.2, -0.5);
        this.car.add(body);
        this.car.add(wheel1);
        this.car.add(wheel2);
        this.car.add(wheel3);
        this.car.add(wheel4);
        this.car.add(axle1);
        this.car.add(axle2);
        this.car.add(dome);
        this.car.position.y = 0.85;
        this.car.scale.set(1.5, 1.5, 1.5);
    }
    makeLamp() {
        let lampGeometry = new T.ConeGeometry(1, 10,
            undefined,
            undefined,
            true);
        let lampMaterial = shaderMaterial(
            "./source/shaders/lamp_shader.vs",
            "./source/shaders/lamp_shader.fs",
            {
                transparent: true,
            });

        this.lampOn = true;
        this.meshLamp = new T.Mesh(lampGeometry, lampMaterial);
        this.lamp = new T.Group();
        this.lamp.add(this.meshLamp);
        this.lamp.rotateX(-Math.PI / 2);
        this.lamp.position.z = 4.7;
        this.car.add(this.lamp);
    }
    initJourney(roads, dirIx = []) {
        if (roads && roads.length > 0) {
            this.journey = [...roads];
            this.roadIx = 0;
            this.road = this.journey[0];
            if (dirIx) {
                this.dirIx = dirIx
            }
        }
    }
    toggleLamp() {
        this.lampOn = !this.lampOn;
        if (this.lampOn) {
            this.lamp.add(this.meshLamp);
        }
        else {
            this.lamp.remove(this.meshLamp);
        }
    }
    stepWorld(delta, timeOfDay) {
        if (!this.road) { return; }

        let lilDelta = delta / 10000;
        const roadLen = this.road.curve.getLength();
        const poorMansALP = Math.min(300 / roadLen, 3); // restrict to 3x
        lilDelta *= poorMansALP;
        this.t += lilDelta;

        if (this.t >= 1) {
            this.t = 0;
            if (this.journey.length > 0) {
                this.roadIx += 1;
                this.roadIx %= this.journey.length; // clamp
                this.road = this.journey[this.roadIx];
            }
        }
        else {
            // translate and steer the car
            let pt;
            let nextPt;
            let laneAdj;

            if (this.dirIx[this.roadIx]) { // if we're going forward
                pt = this.road.getMidPtWorldCoords(this.t);
                nextPt = this.road.getMidPtWorldCoords(this.t + lilDelta);
                laneAdj = -2;
            }

            else { // if we're going in reverse
                pt = this.road.getMidPtWorldCoords(1 - this.t);
                nextPt = this.road.getMidPtWorldCoords(1 - this.t - lilDelta);
                laneAdj = 2;
            }
            this.objects[0].position.set(pt.x + laneAdj, pt.y, pt.z);

            // steer (rotate) car
            this.objects[0].lookAt(
                new T.Vector3(
                    nextPt.x + laneAdj,
                    this.objects[0].position.y,
                    nextPt.z)
            );
        }
    }

}

