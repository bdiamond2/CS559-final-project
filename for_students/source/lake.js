import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";

class Lake extends GrObject {
    constructor(name, shape) {
        let lakeGroup = new T.Group();
        super(name, lakeGroup);

        let geometry = new T.ExtrudeGeometry(shape, { depth: 0.01 });
        this.clock = 0;
        this.material = shaderMaterial(
            "./source/shaders/lake_shader.vs",
            "./source/shaders/lake_shader.fs",
            {
                uniforms: {
                    clock: { value: 0 }
                }
            });
        let lakeMesh = new T.Mesh(geometry, this.material);
        lakeMesh.rotateX(-Math.PI / 2);
        let g = new T.Group();
        g.add(lakeMesh);
        g.scale.set(100, 0.3, 100);
        lakeGroup.add(g);
    }
    stepWorld(delta, timeOfDay) {
        let lilDelta = delta / 15;
        this.clock += lilDelta;
        this.material.uniforms.clock.value = this.clock;
    }
}

export class LakeMendota extends Lake {
    constructor() {
        // made with help from the https://geojson.io/
        // path tool and Excel
        let shape = new T.Shape();
        shape.moveTo(-0.66, 8.74)
        shape.lineTo(0.2, 10.51)
        shape.lineTo(-0.33, 11.32)
        shape.lineTo(-1.1, 11.32)
        shape.lineTo(-1.35, 11.56)
        shape.lineTo(-0.55, 12.29)
        shape.lineTo(-1.24, 12.99)
        shape.lineTo(-2.93, 12.75)
        shape.lineTo(-4.01, 13.03)
        shape.lineTo(-4.12, 14.16)
        shape.lineTo(-3.59, 14.75)
        shape.lineTo(-3.65, 15.19)
        shape.lineTo(-3.9, 14.75)
        shape.lineTo(-5.17, 14.4)
        shape.lineTo(-6.58, 12.65)
        shape.lineTo(-8.34, 10.94)
        shape.lineTo(-10.25, 10.79)
        shape.lineTo(-11.27, 10.43)
        shape.lineTo(-11.14, 9.32)
        shape.lineTo(-9.95, 8.27)
        shape.lineTo(-8.76, 8.09)
        shape.lineTo(-6.22, 9.22)
        shape.lineTo(-5.55, 8.72)
        shape.lineTo(-4.56, 8.98)
        shape.lineTo(-4.56, 8.8)
        shape.lineTo(-4.56, 8.7)
        shape.lineTo(-5.64, 8.35)
        shape.lineTo(-5.08, 7.85)
        shape.lineTo(-3.34, 7.79)
        shape.lineTo(-1.6, 8.09)
        shape.lineTo(-0.66, 8.72)

        super('LakeMendota', shape);

        this.setPos(300, 0, 1000);
    }
}

export class LakeMonona extends Lake {
    constructor() {
        // made with help from the https://geojson.io/ path tool
        let shape = new T.Shape();
        shape.moveTo(-0.58, 7.51)
        shape.lineTo(-1.76, 6.65)
        shape.lineTo(-2.15, 6.31)
        shape.lineTo(-2.57, 6.43)
        shape.lineTo(-2.97, 6.27)
        shape.lineTo(-2.93, 5.79)
        shape.lineTo(-1.96, 5.69)
        shape.lineTo(-1.76, 5.88)
        shape.lineTo(-1, 5.78)
        shape.lineTo(-0.14, 5.22)
        shape.lineTo(0.23, 5.18)
        shape.lineTo(-0.12, 4.73)
        shape.lineTo(0.26, 4.45)
        shape.lineTo(0.78, 4.84)
        shape.lineTo(1.24, 4.75)
        shape.lineTo(1.56, 5.03)
        shape.lineTo(2.74, 5.1)
        shape.lineTo(3.21, 5.41)
        shape.lineTo(3.06, 5.77)
        shape.lineTo(2.66, 5.63)
        shape.lineTo(2.48, 5.39)
        shape.lineTo(2.18, 5.5)
        shape.lineTo(1.8, 5.81)
        shape.lineTo(2.17, 6.59)
        shape.lineTo(3.14, 7.2)
        shape.lineTo(3.75, 7.26)
        shape.lineTo(4.45, 7.9)
        shape.lineTo(4.4, 8.42)
        shape.lineTo(3.73, 8.93)
        shape.lineTo(2.98, 9.1)
        shape.lineTo(2.06, 8.92)
        shape.lineTo(1.07, 8.17)
        shape.lineTo(0.24, 7.75)
        shape.lineTo(-0.58, 7.51)

        super('LakeMonona', shape);
    }
}

export class LakeWingra extends Lake {
    constructor() {
        let shape = new T.Shape();
        shape.moveTo(-0.428, 5.678)
        shape.lineTo(-0.723, 5.818)
        shape.lineTo(-1.033, 5.752)
        shape.lineTo(-1.175, 5.812)
        shape.lineTo(-1.391, 5.785)
        shape.lineTo(-1.69, 5.826)
        shape.lineTo(-1.724, 5.897)
        shape.lineTo(-1.769, 5.919)
        shape.lineTo(-1.832, 5.84)
        shape.lineTo(-1.784, 5.752)
        shape.lineTo(-1.933, 5.722)
        shape.lineTo(-2.109, 5.613)
        shape.lineTo(-2.396, 5.526)
        shape.lineTo(-2.733, 5.504)
        shape.lineTo(-2.979, 5.406)
        shape.lineTo(-3.114, 5.264)
        shape.lineTo(-3.192, 5.108)
        shape.lineTo(-3.084, 4.963)
        shape.lineTo(-3.058, 4.9)
        shape.lineTo(-2.748, 4.87)
        shape.lineTo(-2.415, 5.018)
        shape.lineTo(-2.21, 5.048)
        shape.lineTo(-2.146, 5.015)
        shape.lineTo(-2.146, 4.982)
        shape.lineTo(-1.832, 4.98)
        shape.lineTo(-1.459, 5.042)
        shape.lineTo(-1.321, 5.023)
        shape.lineTo(-1.085, 5.037)
        shape.lineTo(-0.936, 5.264)
        shape.lineTo(-0.951, 5.496)
        shape.lineTo(-0.839, 5.717)
        shape.lineTo(-0.611, 5.744)
        shape.lineTo(-0.573, 5.659)
        shape.lineTo(-0.499, 5.624)
        shape.lineTo(-0.416, 5.673)

        super('LakeWingra', shape);

    }
}