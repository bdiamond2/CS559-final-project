import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";

export class CampFire extends GrObject {
    constructor() {
        let group = new T.Group();
        super('CampFire', group);

        this.fireMaterial = new T.MeshStandardMaterial({ color: 'red' });
        this.clock = 0;
        this.fireMaterial = shaderMaterial(
            "./source/shaders/fire_shader.vs",
            "./source/shaders/fire_shader.fs",
            {
                transparent: true,
                uniforms: {
                    clock: { value: 0 }
                }
            });

        this.smoke = [];
        this.initSmoke();

        let fireGeometry = new T.ConeGeometry(0.2, 1, 20, 20, true);
        let flame1 = new T.Mesh(fireGeometry, this.fireMaterial);
        flame1.position.y = 0.1;
        let flame2 = flame1.clone();
        flame2.translateX(-0.1);
        flame2.scale.set(0.5, 0.8, 0.5);

        let log1 = new T.Mesh(new T.CylinderGeometry(0.18, 0.18, 1),
            new T.MeshStandardMaterial({ color: '#633500' }));
        log1.rotateX(Math.PI / 2);
        log1.position.set(0, -0.45, 0);

        let log2 = log1.clone();
        log2.rotateZ(Math.PI / 2);

        this.fire = new T.Group();
        this.fire.add(flame1);
        this.fire.add(flame2);
        this.fire.add(log1);
        this.fire.add(log2);
        this.fire.position.y = 0.5;

        for (let sp of this.smoke) {
            this.fire.add(sp.mesh);
        }

        group.add(this.fire);
    }
    stepWorld(delta, timeOfDay) {
        let lilDelta = delta / 15;
        this.clock += lilDelta;
        this.fireMaterial.uniforms.clock.value = this.clock;

        for (let sp of this.smoke) {
            sp.age += lilDelta * sp.ageRate;

            if (sp.age > 100) {
                sp.reset();
            }
            sp.y += sp.dy * lilDelta;
            sp.mesh.position.set(sp.x, sp.y, sp.z);
            sp.mesh.material.opacity -= 0.002 * lilDelta;
        }
    }
    initSmoke() {
        for (let i = 0; i < 500; i++) {
            this.smoke.push(new SmokeParticle());
        }
    }
}

class SmokeParticle {
    constructor() {
        const spread = 0.1;
        this.x = spread * Math.random() - spread / 2;
        this.y = -10;
        this.z = spread * Math.random() - spread / 2;

        this.dy = 1 / 50 + Math.random() / 100;

        this.age = 50; // delayed release
        this.ageRate = 0.2 + Math.random();

        let pM = new T.MeshStandardMaterial({
            transparent: true,
            opacity: 0.2 + Math.random() * 0.8,
            color: 'gray'
        });
        let pG = new T.SphereGeometry(Math.random() * 0.1);
        this.mesh = new T.Mesh(pG, pM);
    }
    reset() {
        this.y = 0.6;
        this.age = 0 - 100 * Math.random(); // delayed release
        this.ageRate = 0.2 + Math.random();
        this.mesh.material.opacity = 0.2 + Math.random() * 0.8;
    }
}