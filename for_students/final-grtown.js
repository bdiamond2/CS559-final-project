/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

// import { main } from "../examples/main.js";
import { main } from './source/main.js';

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 1000,
    lookfrom: new T.Vector3(-400, 100, 600),
    lookat: new T.Vector3(-110, 0, 110),
    far: 10000,
    // renderparams: { logarithmicDepthBuffer: true },
});
// center everything better
world.groundplane.objects[0].position.x = -300;

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment

main(world);

// while making your objects, be sure to identify some of them as "highlighted"


///////////////////////////////////////////////////////////////
// build and the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
// world.ui = new WorldUI(world);
// // now make it go!

// world.go();

