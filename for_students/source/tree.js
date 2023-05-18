import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let treeCount = 0;
export class PineTree extends GrObject {
    constructor() {
        let group = new T.Group();
        super(`Tree-${++treeCount}`, group);

        let leafGeometry = new T.ConeGeometry(2, 8);
        let leafMaterial = new T.MeshStandardMaterial({ color: '#00994a' });
        let trunkGeometry = new T.CylinderGeometry(0.5, 0.5, 4);
        let trunkMaterial = new T.MeshStandardMaterial({ color: '#875c00' });

        let needles = new T.Mesh(leafGeometry, leafMaterial);
        needles.position.y = 5;

        let tree = new T.Group();
        tree.add(new T.Mesh(trunkGeometry, trunkMaterial));
        tree.add(needles);
        tree.position.y = 1;
        group.add(tree);

        group.position.y = 2;
    }
}