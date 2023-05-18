import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

export class CapitolBuilding extends GrObject {
    constructor() {
        let group = new T.Group();
        super('CapitolBuilding', group);
        let cap = new T.Group();

        let material = new T.MeshStandardMaterial();
        let cyl = new T.Mesh(new T.CylinderGeometry(12, 12, 40), material);
        let dome = new T.Mesh(new T.SphereGeometry(12), material);
        let spire1 = new T.Mesh(new T.CylinderGeometry(2, 2, 15), material);
        let spire2 = new T.Mesh(new T.CylinderGeometry(1, 1, 8), material);

        this.rideable = spire2;

        let box1 = new T.Mesh(new T.BoxGeometry(70, 20, 20), material);
        let box2 = box1.clone();

        cap.add(cyl);
        cyl.add(dome);
        dome.add(spire1);
        spire1.add(spire2);
        cap.add(box1);
        cap.add(box2);

        dome.position.y = 20;
        spire1.position.y = 12;
        spire2.position.y = 10;
        box1.position.y = -8;
        box2.position.y = -8;
        box2.rotateY(Math.PI / 2);

        cap.position.y = 15;

        group.add(cap);

    }
}