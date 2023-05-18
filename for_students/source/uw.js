import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class BascomHall extends GrObject {
    constructor() {
        let group = new T.Group();
        super('BascomHall', group);
        this.group = group;

        let bodyShape = new T.Shape();
        bodyShape.moveTo(-5, 0);
        bodyShape.lineTo(5, 0);
        bodyShape.lineTo(5, -2);
        bodyShape.lineTo(8, -2);
        bodyShape.lineTo(8, 8);
        bodyShape.lineTo(4, 8);
        bodyShape.lineTo(4, 3);
        bodyShape.lineTo(-4, 3);
        bodyShape.lineTo(-4, 8);
        bodyShape.lineTo(-8, 8);
        bodyShape.lineTo(-8, -2);
        bodyShape.lineTo(-5, -2);
        bodyShape.lineTo(-5, 0);
        let bodyMaterial = new T.MeshStandardMaterial({ color: '#dec890' });
        let bodyGeometry = new T.ExtrudeGeometry(bodyShape, { depth: 3 });
        let body = new T.Mesh(bodyGeometry, bodyMaterial);
        body.rotateX(-Math.PI / 2);
        body.scale.set(2, 2, 2);

        let peakMaterial = new T.MeshStandardMaterial({
            color: '#4f4f4f',
            metalness: 0.5,
            roughness: 0.5,
            side: T.DoubleSide,
        });
        let peakGeometry = new T.BufferGeometry();
        let peakVerts = [
            1, 0, 1,
            0, 1, 0,
            -1, 0, 1,

            1, 0, -1,
            0, 1, 0,
            1, 0, 1,

            -1, 0, -1,
            0, 1, 0,
            -1, 0, 1,

            1, 0, -1,
            0, 1, 0,
            -1, 0, -1,
        ];
        peakGeometry.setAttribute(
            'position',
            new T.BufferAttribute(new Float32Array(peakVerts), 3)
        );
        peakGeometry.computeVertexNormals();
        let peak = new T.Mesh(peakGeometry, peakMaterial);
        peak.position.set(0, 4, 0);
        peak.scale.set(4, 2, 4);

        let centerGeometry = new T.BoxGeometry(8, 8, 8);
        let center = new T.Mesh(centerGeometry, bodyMaterial);
        center.position.set(0, 3, -3);

        let front = new T.Group();
        let columnMaterial = new T.MeshStandardMaterial();
        let columnGeometry = new T.CylinderGeometry(0.15, 0.15, 3);

        let col1 = new T.Mesh(columnGeometry, columnMaterial);
        col1.position.set(-2, 4, 1.2);
        let col2 = col1.clone();
        col2.position.x = -1.5;
        let col3 = col1.clone();
        col3.position.x = -0.5;
        let col4 = col1.clone();
        col4.position.x = 0.5;
        let col5 = col1.clone();
        col5.position.x = 1.5;
        let col6 = col1.clone();
        col6.position.x = 2;

        let eveGeometry = new T.BufferGeometry();
        let eveVerts = [
            1, 0, 1,
            1, 0, 0,
            0, 1, 1,

            1, 0, 0,
            0, 1, 1,
            0, 1, 0,

            -1, 0, 1,
            -1, 0, 0,
            0, 1, 1,

            -1, 0, 0,
            0, 1, 1,
            0, 1, 0,
        ];
        eveGeometry.setAttribute(
            'position',
            new T.BufferAttribute(new Float32Array(eveVerts), 3)
        );
        eveGeometry.computeVertexNormals();
        let eve = new T.Mesh(eveGeometry, peakMaterial);
        eve.position.set(0, 5.5, 0);
        eve.scale.set(2.2, 1, 1.6);

        let eveFaceGeometry = new T.BufferGeometry();
        eveFaceGeometry.setAttribute(
            'position',
            new T.BufferAttribute(
                new Float32Array([
                    -1, 0, 1,
                    1, 0, 1,
                    0, 1, 1
                ]), 3
            )
        );
        eveFaceGeometry.computeVertexNormals();
        let eveFace = new T.Mesh(eveFaceGeometry, columnMaterial);
        eveFace.position.set(0, 5.5, 0);
        eveFace.scale.set(2.2, 1, 1.4);

        let pedestal = new T.Mesh(
            new T.BoxGeometry(5, 3, 4),
            bodyMaterial
        );
        pedestal.position.set(0, 1, 0);

        let bannerTex = new T.TextureLoader().load('../../for_students/assets/lilah.jpg');
        let bannerGeometry = new T.PlaneGeometry(4, 3);
        let bannerMaterial = new T.MeshStandardMaterial({ map: bannerTex });
        let banner = new T.Mesh(bannerGeometry, bannerMaterial);
        banner.position.set(0, 4, 0.5);

        front.add(col1);
        front.add(col2);
        front.add(col3);
        front.add(col4);
        front.add(col5);
        front.add(col6);
        front.add(eve);
        front.add(eveFace);
        front.add(pedestal);
        front.add(banner);
        front.position.z = 1;

        this.group.add(body);
        center.add(peak);
        this.group.add(center);
        this.group.add(front);

    }

}

export class CampRandall extends GrObject {
    constructor() {
        let group = new T.Group();
        super('CampRandall', group);

        let stadium = new T.Group();
        group.add(stadium);

        let seatingGeometry = new T.CylinderGeometry(15, 10, 5, undefined, undefined, true);
        let seatingMaterial = new T.MeshStandardMaterial({ side: T.BackSide, color: 'gray' });
        let seating = new T.Mesh(seatingGeometry, seatingMaterial);

        let outerGeometry = new T.CylinderGeometry(15, 15, 7, undefined, undefined, true);
        let outerMaterial = new T.MeshStandardMaterial({ color: 'gray' });
        let outer = new T.Mesh(outerGeometry, outerMaterial);
        outer.position.y = -1;

        let fieldGeometry = new T.CylinderGeometry(10);
        let fieldMaterial = new T.MeshStandardMaterial({ color: '#47664f' });
        let field = new T.Mesh(fieldGeometry, fieldMaterial);
        field.rotateX(-Math.PI / 2);
        field.position.y = -3;
        field.rotateX(Math.PI / 2);

        let fieldImageTex = new T.TextureLoader().load('../../for_students/assets/camp_randall.jpg');
        let fieldImageGeometry = new T.PlaneGeometry(15, 10);
        let fieldImageMaterial = new T.MeshStandardMaterial({ map: fieldImageTex });
        let fieldImage = new T.Mesh(fieldImageGeometry, fieldImageMaterial);
        fieldImage.rotateX(-Math.PI / 2);
        fieldImage.position.y = -2.4;

        let houseGeometry = this.getHouseGeometry();
        let houseMaterial = new T.MeshStandardMaterial({ side: T.DoubleSide, color: '#f5d698' });
        let house = new T.Mesh(houseGeometry, houseMaterial);
        house.position.set(-1.5, 0, -1.5);

        let roofGeometry = this.getRoofGeometry();
        let roofMaterial = new T.MeshStandardMaterial({ side: T.DoubleSide, color: '#e2725b' });
        let roof = new T.Mesh(roofGeometry, roofMaterial);
        roof.position.set(-1.5, 0, -1.5);

        let houseGroup = new T.Group();
        houseGroup.add(house);
        houseGroup.add(roof);
        houseGroup.position.set(-18, -4, 0);
        houseGroup.scale.set(2.5, 1.5, 3);

        stadium.add(seating);
        stadium.add(outer);
        stadium.add(field);
        stadium.add(fieldImage);
        stadium.add(houseGroup);
        stadium.scale.set(1.5, 1, 1);
        stadium.position.y = 4;
    }
    getHouseGeometry() {
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
            0, 3.5, 1.5,
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
            3, 3.5, 1.5,
            3, 2, 3
        ];
        let vertsInner = [];
        vertsInner.push(...floorVerts);
        vertsInner.push(...wallFrontVerts);
        vertsInner.push(...wallBackVerts);
        vertsInner.push(...wallLeftVerts);
        vertsInner.push(...wallRightVerts);
        let verts = new Float32Array(vertsInner);

        geometry.setAttribute('position', new T.BufferAttribute(verts, 3));
        geometry.computeVertexNormals();
        return geometry;
    }
    getRoofGeometry() {
        let geometry = new T.BufferGeometry();

        let roofFront = [
            0, 2, 0,
            3, 2, 0,
            0, 3.5, 1.5,

            3, 2, 0,
            3, 3.5, 1.5,
            0, 3.5, 1.5,
        ];
        let roofBack = [
            0, 2, 3,
            3, 2, 3,
            0, 3.5, 1.5,

            3, 2, 3,
            3, 3.5, 1.5,
            0, 3.5, 1.5,
        ];
        let vertsInner = [];
        vertsInner.push(...roofFront);
        vertsInner.push(...roofBack);
        let verts = new Float32Array(vertsInner);

        geometry.setAttribute('position', new T.BufferAttribute(verts, 3));
        geometry.computeVertexNormals();
        return geometry;
    }
}