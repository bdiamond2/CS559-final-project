import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let planeNum = 0;
export class Airplane extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super(`Airplane-${++planeNum}`, group);
        this.color = params.color ? params.color : 'white';
        group.add(this.build());
        this.flying = false;
        this.clock = 0;

        if (params.loc) {
            this.loc = params.loc;
            group.position.set(this.loc[0], this.loc[1], this.loc[2]);
        }

        this.setScale(3, 3, 3);
        this.rideable = this.objects[0];
    }
    build() {
        let airplane = new T.Group();
        let material = new T.MeshStandardMaterial({
            color: this.color,
            metalness: 0.5,
            roughness: 0.2
        });

        let fuselage = new T.Mesh(new T.CylinderGeometry(1, .5, 5), material);
        fuselage.rotateX(Math.PI / 2);

        let fin = new T.Mesh(new T.CylinderGeometry(1, 1, 0.05,
            undefined, undefined, undefined,
            0, Math.PI), material);
        fin.rotateZ(Math.PI / 2);
        fin.position.set(0, 0, -3);

        let wing = new T.Mesh(new T.BoxGeometry(12, 0.1, 1.5), material);
        wing.position.set(0, 0, 1);
        let wingBack = new T.Mesh(new T.BoxGeometry(3, 0.1, 1), material);
        wingBack.position.set(0, 0, -3);

        let nose = new T.Mesh(
            new T.SphereGeometry(1, 20, 20, 0, 2 * Math.PI, Math.PI / 2),
            material
        );
        nose.position.set(0, 0, 2.5);
        nose.rotateX(-Math.PI / 2);

        let butt = new T.Mesh(
            new T.SphereGeometry(.5, 20, 20, 0, 2 * Math.PI, Math.PI / 2),
            material
        );
        butt.position.set(0, 0, -2.5);
        butt.rotateX(Math.PI / 2);

        let blade1 = new T.Mesh(new T.BoxGeometry(2, 0.03, .1), material);
        blade1.rotateX(Math.PI / 2);
        let blade2 = blade1.clone();
        blade2.rotateY(Math.PI / 2);

        let prop1 = new T.Group();
        prop1.position.set(3, 0, 1.8);
        prop1.add(blade1);
        prop1.add(blade2);

        let prop2 = prop1.clone();
        prop2.position.set(-3, 0, 1.8);

        this.prop1 = prop1;
        this.prop2 = prop2;

        airplane.add(fuselage);
        airplane.add(fin);
        airplane.add(nose);
        airplane.add(butt);
        airplane.add(wing);
        airplane.add(wingBack);
        airplane.add(prop1);
        airplane.add(prop2);
        return airplane;
    }
    stepWorld(delta, timeOfDay) {
        const lilDelta = delta / 100;
        const amp = 100;
        const freq = 0.1;
        this.clock += lilDelta;
        this.prop1?.rotateZ(lilDelta);
        this.prop2?.rotateZ(lilDelta);

        if (this.flying) {
            this.setPos(
                this.loc[0] + amp * Math.sin(freq * this.clock),
                this.loc[1],
                this.loc[2] + amp * Math.cos(freq * this.clock));
            this.objects[0].rotation.set(0, freq * this.clock + Math.PI / 2, -Math.PI / 8);
        }
    }
}

export class AirportTerminal extends GrObject {
    constructor() {
        let group = new T.Group();
        super('AirportTerminal', group);

        let mainBuilding = new T.Mesh(
            new T.BoxGeometry(30, 8, 100),
            new T.MeshStandardMaterial({ color: '#ffee9c' }));
        mainBuilding.position.y = 5;

        this.clock = 0;

        this.gate1 = new T.Group();
        this.gate1.position.set(15, 0, 0);


        let jetway = new T.Mesh(
            new T.BoxGeometry(10, 2, 2),
            new T.MeshStandardMaterial({ color: 'gray' }));
        jetway.position.x = 3;
        this.gate1.add(jetway);

        this.gate2 = this.gate1.clone();
        this.gate2.position.z = 20;
        this.gate3 = this.gate1.clone();
        this.gate3.position.z = -20;

        mainBuilding.add(this.gate1)
        mainBuilding.add(this.gate2)
        mainBuilding.add(this.gate3);
        group.add(mainBuilding);
    }
    stepWorld(delta, timeOfDay) {
        let lilDelta = delta / 500;
        this.clock += lilDelta;
        this.gate1.rotation.y = Math.sin(this.clock) / 2;
        this.gate2.rotation.z = Math.sin(this.clock * 2) / 2;
        this.gate3.position.x = 15 + 2 * Math.sin(this.clock);
    }
}