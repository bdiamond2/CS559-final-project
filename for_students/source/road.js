import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let roadNum = 0;
const rw = 6;
const rh = 0.1;
export class CurvedRoad extends GrObject {
    constructor(params = {}) {
        let g = new T.Group();
        roadNum++;
        let name = params.name ? 'Road-' + params.name : `Road-${roadNum}`;
        super(name, g);
        this.roadGroup = g;
        this.curve = params.curvePath;

        let shape = new T.Shape();
        shape.moveTo(0, -rw / 2);
        shape.lineTo(rh, -rw / 2);
        shape.lineTo(rh, rw / 2);
        shape.lineTo(0, rw / 2);
        shape.lineTo(0, 0);
        let extrudeSettings = {
            steps: 20,
            extrudePath: this.curve,
        };
        let geometry = new T.ExtrudeGeometry(shape, extrudeSettings);

        let matAsphalt = new T.MeshStandardMaterial({
            color: '#4a4a4a',
        });

        let road = new T.Mesh(geometry, matAsphalt);

        this.start = new T.Mesh(
            new T.CylinderGeometry(rw / 2, rw / 2, rh * 2),
            matAsphalt
        );
        this.end = this.start.clone();
        let startPt = this.curve.getPoint(0);
        let endPt = this.curve.getPoint(1);
        this.start.position.set(startPt.x, startPt.y, startPt.z);
        this.end.position.set(endPt.x, endPt.y, endPt.z);

        road.scale.set(1, -1, 1);
        this.roadGroup.add(road);
        road.add(this.start);
        road.add(this.end);
    }

    // these make it much easier to link road pieces together
    getStartWorldCoords() {
        let startPos = new T.Vector3(0, 0, 0);
        this.start.localToWorld(startPos);
        return startPos;
    }
    getEndWorldCoords() {
        let endPos = new T.Vector3(0, 0, 0);
        this.end.localToWorld(endPos);
        return endPos;
    }
    getMidPtWorldCoords(t) {
        let ptLocal = this.curve.getPoint(t);
        let ptWorld = new T.Vector3(0, 0, 0).copy(ptLocal);
        this.roadGroup.localToWorld(ptWorld);
        return ptWorld;
    }

    // helper function to quickly link up road segments
    quickSet(startAfter, yRotation) {
        let nextPt = startAfter.getEndWorldCoords();
        this.setPos(nextPt.x, nextPt.y, nextPt.z);
        this.objects[0].rotateY(yRotation);
    }

}

export class CurvedRoadBezier extends CurvedRoad {
    constructor(x1, z1, x2, z2, x3, z3, x4, z4, params = {}) {
        let curve = new T.CubicBezierCurve3(
            new T.Vector3(x1, 0, z1),
            new T.Vector3(x2, 0, z2),
            new T.Vector3(x3, 0, z3),
            new T.Vector3(x4, 0, z4)
        );
        params.curvePath = curve;
        super(params);
    }
}

export class CurvedRoad90 extends CurvedRoadBezier {
    constructor() {
        super(
            0, 0,
            0, 8,
            4, 12,
            12, 12);
    }
}

export class StraightRoad extends CurvedRoadBezier {
    constructor(length, params = {}) {
        super(
            0, 0,
            0, 0,
            0, length,
            0, length,
            params
        );
    }
}
