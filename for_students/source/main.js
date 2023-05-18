
import * as T from "../../libs/CS559-Three/build/three.module.js";
import { WorldUI } from "../../libs/CS559-Framework/WorldUI.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { Person, Pacer, randPersonParams } from "./person.js";
import { Car } from "./car.js";
import { CurvedRoadBezier, StraightRoad } from "./road.js";
import { CapitolBuilding } from "./capitol.js";
import { LakeMendota, LakeMonona, LakeWingra } from "./lake.js";
import { Airplane, AirportTerminal } from "./airplane.js";
import { OBJLoader } from "../../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { PineTree } from "./tree.js";
import { BascomHall, CampRandall } from "./uw.js";
import { HouseOpenGable, HousePyramidHip } from "./house.js";
import { ParkingGarage } from "./parking.js";
import { CampFire } from "./campfire.js";


const buildingColors = [
    '#f49389',
    '#8cb3d9',
    '#e1d299',
    '#79c2af',
    '#bf8cbf',
    '#9bcfa2',
    '#e0a6b5',
    '#84bfc3',
    '#d09088',
    '#9dbb6b',
    '#a88abf',
    '#c7c495',
    '#95a877',
    '#cf8d94',
    '#84a8c3',
];

let loader = new OBJLoader();
let promise = loader.loadAsync('../../for_students/assets/LibertStatue.obj');
let objs = [];

export function main(world) {
    promise.then(
        function (obj) {
            objs.push(obj);
            mainCore(world);
        }
    );
}

function mainCore(world) {

    placeObjects(world);

    world.scene.background = new T.CubeTextureLoader()
        .setPath('../../for_students/assets/')
        .load([
            'sky.jpg',
            'sky.jpg',
            'sky.jpg',
            'sky.jpg',
            'sky.jpg',
            'sky.jpg',
        ]);

    function highlight(obName) {
        const toHighlight = world.objects.find(ob => ob.name === obName);
        if (toHighlight) {
            toHighlight.highlighted = true;
        } else {
            throw `no object named ${obName} for highlighting!`;
        }
    }
    highlight("BascomHall");
    highlight("CampFire");
    highlight("LakeWingra");
    highlight("CampRandall");
    highlight("CapitolBuilding");
    highlight("AirportTerminal");
    highlight("Airplane-1");
    highlight("StatueOfLiberty");
    highlight("Car-1");
    highlight("Road-JohnNolen-2");
    highlight("Person-1");

    world.ui = new WorldUI(world);
    world.go();
}

function placeObjects(world) {
    // add airplane
    makeAirport(world);

    // add statue of liberty
    let liberty = new GrObject('StatueOfLiberty', objs[0]);
    liberty.objects[0].traverse(a => {
        if (a instanceof T.Mesh) {
            a.material = new T.MeshStandardMaterial({
                color: '#1ee3b8',
                metalness: 0.5,
                roughness: 1
            });
        }
    });
    liberty.setScale(25, 25, 25);
    liberty.setPos(-200, -20, 50);
    world.add(liberty);

    // put people in the park
    putPeople(world);

    // create roads and cars
    makeRoadsCars(world);

    // add the capitol
    let cap = new CapitolBuilding();
    cap.setPos(-110, 0, 110);
    cap.setScale(0.4);
    world.add(cap);

    // add the lakes
    let mendota = new LakeMendota();
    let monona = new LakeMonona();
    let wingra = new LakeWingra();
    world.add(mendota);
    mendota.setPos(0, 0, 850);
    world.add(monona);
    monona.setPos(200, 0, 850);
    monona.objects[0].rotateY(Math.PI / 16);
    world.add(wingra);
    wingra.setPos(-280, 0, 600);
    wingra.setScale(0.5, 1, 0.5);

    // add the arboretum
    makeArboretum(world);

    // UW-Madison
    makeUW(world);

    // some houses
    makeBuildings(world);
}

function makeUW(world) {
    // Bascom Hall
    let bascom = new BascomHall();
    world.add(bascom);
    bascom.setPos(-300, 0, 100);
    bascom.objects[0].rotateY(Math.PI / 2);

    let randall = new CampRandall();
    randall.objects[0].rotateY(Math.PI / 2);
    randall.setPos(-300, 0, 160);
    world.add(randall);
}

function makeAirport(world) {
    // terminal
    let term = new AirportTerminal();
    world.add(term);
    term.setPos(150, 0, -500);

    let airplane1 = new Airplane({ loc: [300, 100, -300] });
    airplane1.flying = true;
    let airplane2 = new Airplane({ loc: [180, 3, -515] });
    airplane2.objects[0].rotateY(-Math.PI / 2);
    airplane2.objects[0].rotateX(-Math.PI / 16);

    world.add(airplane1);
    world.add(airplane2);

    let airportGarage = new ParkingGarage();
    airportGarage.setPos(100, 0, -500);
    airportGarage.setScale(6, 1, 2);
    airportGarage.objects[0].rotateY(Math.PI / 2);
    world.add(airportGarage);

    let rw1 = new StraightRoad(200);
    let rw2 = new StraightRoad(200);
    let rw3 = new StraightRoad(250);
    let rw4 = new StraightRoad(250);
    let rw5 = new StraightRoad(250);

    rw1.setPos(200, 0, -600);
    rw2.setPos(220, 0, -600);
    rw3.setPos(350, 0, -600);
    rw4.setPos(340, 0, -610);
    rw5.setPos(170, 0, -600);
    rw3.objects[0].rotateY(-Math.PI / 4);
    rw4.objects[0].rotateY(-Math.PI / 4);
    rw5.objects[0].rotateY(Math.PI / 4);
    world.add(rw1);
    world.add(rw2);
    world.add(rw3);
    world.add(rw4);
    world.add(rw5);
}

function putPeople(world) {
    // James Madison Park
    putPacers(10, 5, -100, 30, world);
    putPacers(10, 5, -110, 35, world);

    // UW
    putPacers(25, 15, -270, 100, world);
    putPacers(25, 15, -250, 80, world);

    // Camp Randall
    putPacers(50, 3, -290, 185, world);

    // Capitol
    putPacers(20, 5, -120, 120, world);

    // Picnic Point
    const cx = -500;
    const cz = -22;
    const cf = new CampFire();
    const d = 2;
    const num = 10;
    cf.setPos(cx, 0, cz);
    world.add(cf);
    for (let i = 0; i < num; i++) {
        let angle = i * 2 * Math.PI / num;
        let person = new Person(randPersonParams());
        person.setPos(
            cx + d * Math.sin(angle),
            0,
            cz + d * Math.cos(angle));
        person.objects[0].rotateY(angle);
        world.add(person);
    }

}

function putPacers(num, spread, cx, cz, world) {
    for (let i = 0; i < num; i++) {
        let person = new Pacer(randPersonParams());
        person.paceDistance = 1 + Math.random() * spread;
        person.setPos(
            cx + (Math.random() * spread - spread / 2),
            0,
            cz + (Math.random() * spread - spread / 2));
        person.objects[0].rotateY(Math.random() * Math.PI * 2);

        world.add(person);
    }
}

function makeArboretum(world) {
    const xMin = -520;
    const xMax = -300;
    const zMin = 420;
    const zMax = 520;
    const numTrees = 300;

    for (let i = 0; i < numTrees; i++) {
        let x = Math.random() * (xMax - xMin) + xMin;
        let z = Math.random() * (zMax - zMin) + zMin;
        let scale = Math.random() + 0.2;
        let tree = new PineTree();
        tree.setScale(scale, scale, scale);
        tree.setPos(x, 0, z);
        world.add(tree);
    }
}

function makeBuildings(world) {
    makeHomes(world);
    let garageCampus = new ParkingGarage();
    garageCampus.setPos(-240, 0, 110);
    world.add(garageCampus);

    let garageGorham = new ParkingGarage();
    garageGorham.setPos(50, 0, -100);
    garageGorham.objects[0].rotateY(-Math.PI / 4);
    world.add(garageGorham);

    function makeHomes(world) {
        const xMin = -1100;
        const xMax = -500;
        const zMin = 150;
        const zMax = 350;
        const numHomes = 100;

        for (let i = 0; i < numHomes; i++) {
            let x = Math.random() * (xMax - xMin) + xMin;
            let z = Math.random() * (zMax - zMin) + zMin;
            let scaleX = Math.random() * 0.5 + 1;
            let scaleY = Math.random() * 0.5 + 1;
            let scaleZ = Math.random() * 0.5 + 1;
            let home;
            let color = buildingColors[Math.floor(Math.random() * buildingColors.length)];
            if (Math.random() > 0.5) {
                home = new HouseOpenGable({ color: color });
            }
            else {
                home = new HousePyramidHip({ color: color });
            }
            home.setScale(scaleX, scaleY, scaleZ);
            home.setPos(x, 0, z);
            if (Math.random() > 0.5) {
                home.objects[0].rotateY(Math.PI / 2);
            }
            world.add(home);
        }
    }

}

function makeRoadsCars(world) {
    let eastWash1 = new StraightRoad(300, { name: 'EastWashington-1' });
    eastWash1.setPos(150, 0, -150);
    eastWash1.objects[0].rotateY(-Math.PI / 4);

    let packers = new StraightRoad(400, { name: 'PackersAve' });
    packers.setPos(120, 0, -120);
    packers.objects[0].rotateY(Math.PI);
    world.add(packers);

    let nextPt = eastWash1.getEndWorldCoords();

    let eastWash2 = new StraightRoad(45, { name: 'EastWashington-2' });
    eastWash2.quickSet(eastWash1, -Math.PI / 4);

    let blair = new StraightRoad(50, { name: 'Blair' });
    blair.setPos(nextPt.x, 0, nextPt.z);
    blair.objects[0].rotateY(Math.PI / 4);
    nextPt = blair.getEndWorldCoords();

    let johnNolen1 = new StraightRoad(150, { name: 'JohnNolen-1' });
    johnNolen1.setPos(nextPt.x, nextPt.y, nextPt.z);
    johnNolen1.objects[0].rotateY(-Math.PI / 4);
    nextPt = johnNolen1.getEndWorldCoords();

    let johnNolen2 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 20, nextPt.z + 40,
        nextPt.x - 20, nextPt.z + 60,
        nextPt.x + 20, nextPt.z + 100,
        { name: 'JohnNolen-2' }
    );

    let jn3 = new StraightRoad(200, { name: 'JohnNolen-3' });
    jn3.quickSet(johnNolen2, Math.PI / 4.5);

    let shoreDr1 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 40, nextPt.z,
        nextPt.x - 20, nextPt.z + 20,
        nextPt.x - 50, nextPt.z + 30,
        { name: 'ShoreDrive-1' }
    );
    nextPt = shoreDr1.getEndWorldCoords();

    let shoreDr2 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 10, nextPt.z,
        nextPt.x - 10, nextPt.z,
        nextPt.x - 20, nextPt.z - 10,
        { name: 'ShoreDrive-2' }
    );
    nextPt = shoreDr2.getEndWorldCoords();

    let proudfit = new StraightRoad(30, { name: 'Proudfit' });
    proudfit.setPos(nextPt.x, nextPt.y, nextPt.z);
    proudfit.objects[0].rotateY(5 * Math.PI / 4);

    let regent1 = new StraightRoad(100, { name: 'Regent-1' });
    regent1.quickSet(proudfit, -Math.PI / 2);

    let monroe = new StraightRoad(470, { name: 'Monroe' });
    monroe.quickSet(regent1, -Math.PI / 4);
    world.add(monroe);

    let pinckney1 = new StraightRoad(43 / 2, { name: 'Pinckney-1' });
    pinckney1.setPos(-110, 0, 80);
    pinckney1.objects[0].rotateY(Math.PI / 4);

    let pinckney2 = new StraightRoad(43 / 2, { name: 'Pinckney-2' });
    pinckney2.quickSet(pinckney1, Math.PI / 4);

    let main = new StraightRoad(43, { name: 'Main' });
    main.quickSet(pinckney2, -Math.PI / 4);

    let carroll1 = new StraightRoad(43 / 2, { name: 'Carroll-1' });
    carroll1.quickSet(main, - 3 * Math.PI / 4);

    let carroll2 = new StraightRoad(43 / 2, { name: 'Carroll-2' });
    carroll2.quickSet(carroll1, -3 * Math.PI / 4);

    let mifflin = new StraightRoad(43, { name: 'Mifflin' });
    mifflin.quickSet(carroll2, 3 * Math.PI / 4);

    let state = new StraightRoad(100, { name: 'State' });
    state.quickSet(carroll2, -Math.PI / 2);

    let westWash = new StraightRoad(220, { name: 'WestWashington' });
    westWash.quickSet(carroll1, -Math.PI / 4);

    let park1 = new StraightRoad(50, { name: 'Park-1' });
    park1.quickSet(westWash, 0);
    nextPt = park1.getEndWorldCoords();

    let park2 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x, nextPt.z + 100,
        nextPt.x + 50, nextPt.z + 100,
        nextPt.x + 30, nextPt.z + 200,
        { name: 'Park-2' }
    );

    let fishHatch = new StraightRoad(200, { name: 'FishHatchery' });
    fishHatch.quickSet(park1, 0);
    world.add(fishHatch);

    let gorham = new StraightRoad(330, { name: 'Gorham' });
    gorham.setPos(50, 0, -100);
    gorham.objects[0].rotateY(-Math.PI / 4);
    world.add(gorham);

    let univ1 = new StraightRoad(100, { name: 'University-1' });
    univ1.quickSet(gorham, -Math.PI / 2);
    world.add(univ1);

    nextPt = univ1.getEndWorldCoords();
    let campusDrive = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 40, nextPt.z - 20,
        nextPt.x - 40, nextPt.z + 20,
        nextPt.x - 120, nextPt.z,
        { name: 'CampusDrive' }
    );
    world.add(campusDrive);

    nextPt = campusDrive.getEndWorldCoords();

    let univ2 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 40, nextPt.z - 20,
        nextPt.x - 120, nextPt.z - 20,
        nextPt.x - 120, nextPt.z - 20,
        { name: 'University-2' }
    );
    world.add(univ2);

    let univ3 = new StraightRoad(450, { name: 'University-3' });
    univ3.quickSet(univ2, -Math.PI / 2);
    world.add(univ3);

    let univ4 = new StraightRoad(335, { name: 'University-4' });
    univ4.quickSet(univ3, -3 * Math.PI / 4);
    world.add(univ4);

    // beltline
    let belt1 = new StraightRoad(278, { name: 'Beltline-1' });
    belt1.quickSet(jn3, -Math.PI / 2.42);
    world.add(belt1);

    nextPt = park2.getEndWorldCoords();
    let belt2 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 40, nextPt.z + 10,
        nextPt.x - 20, nextPt.z,
        nextPt.x - 70, nextPt.z + 2, { name: 'Beltine-2' }
    );
    world.add(belt2);

    let belt3 = new StraightRoad(330, { name: 'Beltline-3' });
    belt3.quickSet(belt2, -Math.PI / 2);
    world.add(belt3);

    let belt4 = new StraightRoad(300, { name: 'Beltline-4' });
    belt4.quickSet(belt3, -2 * Math.PI / 3);
    world.add(belt4);

    let belt5 = new StraightRoad(200, { name: 'Beltline-5' });
    belt5.quickSet(belt4, -Math.PI / 2);
    world.add(belt5);

    nextPt = belt5.getEndWorldCoords();
    let belt6 = new CurvedRoadBezier(
        nextPt.x, nextPt.z,
        nextPt.x - 100, nextPt.z,
        nextPt.x - 100, nextPt.z - 100,
        nextPt.x - 100, nextPt.z - 100, { name: 'Beltline-6' }
    )
    world.add(belt6);

    let belt7 = new StraightRoad(410, { name: 'Beltline-7' });
    belt7.quickSet(belt6, Math.PI);
    world.add(belt7);

    let eastWash3 = new StraightRoad(400, { name: 'EastWashington-3' });
    nextPt = eastWash1.getStartWorldCoords();
    eastWash3.setPos(nextPt.x, nextPt.y, nextPt.z);
    eastWash3.objects[0].rotateY(3 * Math.PI / 4);
    world.add(eastWash3);

    // downtown
    world.add(eastWash1);
    world.add(eastWash2);
    world.add(blair);
    world.add(johnNolen1);
    world.add(johnNolen2);
    world.add(shoreDr1);
    world.add(shoreDr2);
    world.add(proudfit);
    world.add(westWash);
    world.add(regent1);

    // square
    world.add(pinckney1);
    world.add(pinckney2);
    world.add(main);
    world.add(carroll1);
    world.add(carroll2);
    world.add(mifflin);
    world.add(state);

    // south side
    world.add(jn3);
    world.add(park1);
    world.add(park2);

    const journey1 = [
        johnNolen2,
        jn3,
        belt1,
        belt2,
        belt3,
        monroe,
        regent1,
        proudfit,
        shoreDr2,
        shoreDr1];
    const dirs1 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

    const journey2 = [
        gorham, univ1, campusDrive, univ2, univ3, univ4,
        belt7, belt6, belt5, belt4, monroe, regent1, proudfit,
        shoreDr2, shoreDr1, johnNolen2, johnNolen1, blair, eastWash2,
        pinckney1, mifflin, state
    ];
    const dirs2 = [
        1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
        0, 0, 1
    ];

    staggeredJourneys(journey1, dirs1);
    staggeredJourneys(journey2, dirs2);

    // assumes roads.length == dirs.length
    function staggeredJourneys(roads, dirs) {
        const carColors = [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'indigo',
            'violet',
            'black',
            'white',
            'gray',
        ]
        for (let i = 0; i < roads.length; i++) {
            let car = new Car({ color: carColors[Math.floor(Math.random() * carColors.length)] });
            // copy arrays
            let roadsCpy = [...roads];
            let dirsCpy = [...dirs];

            // have each car start one ahead of the last one
            for (let j = 0; j < i; j++) {
                let first = roadsCpy.shift();
                roadsCpy.push(first);
                first = dirsCpy.shift();
                dirsCpy.push(first);
            }
            car.initJourney(roadsCpy, dirsCpy);
            world.add(car);
        }
    }
}