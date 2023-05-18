import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let garageCount = 0;
export class ParkingGarage extends GrObject {
    constructor() {
        let garage = new T.Group();
        let group = new T.Group();
        group.add(garage);
        super(`ParkingGarage-${++garageCount}`, group);
        let p1 = new T.Mesh(
            new T.BoxGeometry(10, 0.5, 10),
            new T.MeshStandardMaterial({ color: 'gray' }));
        let p2 = p1.clone();
        let p3 = p1.clone();
        let p4 = p1.clone();
        garage.add(p1);
        garage.add(p2);
        garage.add(p3);
        garage.add(p4);

        let c1 = new T.Mesh(
            new T.CylinderGeometry(1, 1, 10),
            new T.MeshStandardMaterial());
        let c2 = c1.clone();
        let c3 = c1.clone();
        let c4 = c1.clone();
        garage.add(c1);
        garage.add(c2);
        garage.add(c3);
        garage.add(c4);
        garage.position.set(0, 5, 0);

        c1.position.set(-4, 0, -4);
        c2.position.set(-4, 0, 4);
        c3.position.set(4, 0, -4);
        c4.position.set(4, 0, 4);
        p1.position.set(0, -2, 0);
        p2.position.set(0, 0, 0);
        p3.position.set(0, 2, 0);
        p4.position.set(0, 4, 0);
    }
}

