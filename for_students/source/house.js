import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let houseOpenGableCount = 0;
let housePyramidHipCount = 0;

export class HouseOpenGable extends GrObject {
    constructor(params = {}) {
        let geometry = new T.BufferGeometry();
        let floorVerts = [
            0, 0, 0,
            3, 0, 0,
            3, 0, 3,

            0, 0, 0,
            3, 0, 3,
            0, 0, 3
        ];
        let wallFrontVerts = [
            0, 0, 0,
            3, 0, 0,
            3, 2, 0,

            0, 0, 0,
            3, 2, 0,
            0, 2, 0
        ];
        let wallBackVerts = [
            0, 0, 3,
            3, 0, 3,
            3, 2, 3,

            0, 0, 3,
            3, 2, 3,
            0, 2, 3
        ];
        let wallLeftVerts = [
            0, 0, 0,
            0, 2, 0,
            0, 2, 3,

            0, 0, 0,
            0, 2, 3,
            0, 0, 3,

            0, 2, 0,
            1.5, 3.5, 1.5,
            0, 2, 3
        ];
        let wallRightVerts = [
            3, 0, 0,
            3, 2, 0,
            3, 2, 3,

            3, 0, 0,
            3, 2, 3,
            3, 0, 3,

            3, 2, 0,
            1.5, 3.5, 1.5,
            3, 2, 3
        ];
        let roofFront = [
            0, 2, 0,
            3, 2, 0,
            1.5, 3.5, 1.5
        ];
        let roofBack = [
            0, 2, 3,
            3, 2, 3,
            1.5, 3.5, 1.5
        ];
        let vertsInner = [];
        vertsInner.push(...floorVerts);
        vertsInner.push(...wallFrontVerts);
        vertsInner.push(...wallBackVerts);
        vertsInner.push(...wallLeftVerts);
        vertsInner.push(...wallRightVerts);
        vertsInner.push(...roofFront);
        vertsInner.push(...roofBack);
        let verts = new Float32Array(vertsInner);

        geometry.setAttribute('position', new T.BufferAttribute(verts, 3));
        geometry.computeVertexNormals();

        let uvsRect = [
            // floor
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // front wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // back wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // left wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            0.5, 1,
            1, 0,

            // right wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            0.5, 1,
            1, 0,

            // front roof
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // back roof
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
        ]
        let uvsInner = [];
        uvsInner.push(...uvsRect);
        let uvs = new Float32Array(uvsInner);
        geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));

        let material = new T.MeshStandardMaterial({
            side: T.DoubleSide,
            color: params.color ? params.color : 'white'
        });
        let mesh = new T.Mesh(geometry, material);

        let group = new T.Group();
        group.add(mesh);
        mesh.position.set(-3, 0, -1.5)
        super(`HouseOpenGable-${++houseOpenGableCount}`, group);
    }
}

export class HousePyramidHip extends GrObject {
    constructor(params = {}) {
        let geometry = new T.BufferGeometry();
        let floorVerts = [
            0, 0, 0,
            6, 0, 0,
            6, 0, 3,

            0, 0, 0,
            6, 0, 3,
            0, 0, 3
        ];
        let wallFrontVerts = [
            0, 0, 0,
            6, 0, 0,
            6, 2, 0,

            0, 0, 0,
            6, 2, 0,
            0, 2, 0
        ];
        let wallBackVerts = [
            0, 0, 3,
            6, 0, 3,
            6, 2, 3,

            0, 0, 3,
            6, 2, 3,
            0, 2, 3
        ];
        let wallLeftVerts = [
            0, 0, 0,
            0, 2, 0,
            0, 2, 3,

            0, 0, 0,
            0, 2, 3,
            0, 0, 3,

            0, 2, 0,
            0, 3.5, 1.5,
            0, 2, 3
        ];
        let wallRightVerts = [
            6, 0, 0,
            6, 2, 0,
            6, 2, 3,

            6, 0, 0,
            6, 2, 3,
            6, 0, 3,

            6, 2, 0,
            6, 3.5, 1.5,
            6, 2, 3
        ];
        let roofFront = [
            0, 2, 0,
            6, 2, 0,
            6, 3.5, 1.5,

            0, 2, 0,
            6, 3.5, 1.5,
            0, 3.5, 1.5
        ];
        let roofBack = [
            0, 2, 3,
            6, 2, 3,
            6, 3.5, 1.5,

            0, 2, 3,
            6, 3.5, 1.5,
            0, 3.5, 1.5
        ];
        let vertsInner = [];
        vertsInner.push(...floorVerts);
        vertsInner.push(...wallFrontVerts);
        vertsInner.push(...wallBackVerts);
        vertsInner.push(...wallLeftVerts);
        vertsInner.push(...wallRightVerts);
        vertsInner.push(...roofFront);
        vertsInner.push(...roofBack);
        let verts = new Float32Array(vertsInner);

        geometry.setAttribute('position', new T.BufferAttribute(verts, 3));
        geometry.computeVertexNormals();

        let uvsRect = [
            // floor
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // front wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // back wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // left wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            0.5, 1,
            1, 0,

            // right wall
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            0.5, 1,
            1, 0,

            // front roof
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // back roof
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
        ]
        let uvsInner = [];
        uvsInner.push(...uvsRect);
        let uvs = new Float32Array(uvsInner);
        geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));

        // let tl = new T.TextureLoader().load(texturePath);

        let material = new T.MeshStandardMaterial({
            side: T.DoubleSide,
            color: params.color ? params.color : 'white'
        });
        let mesh = new T.Mesh(geometry, material);

        let group = new T.Group();
        group.add(mesh);
        mesh.position.set(-3, 0, -1.5)
        super(`HousePyramidHip-${++housePyramidHipCount}`, group);
    }
}