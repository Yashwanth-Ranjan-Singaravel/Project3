import { Sphere } from "./objects/Object.js";
import { Ray } from "./Ray.js"
import { Camera } from "./Camera.js";
import { sign, magnitude, normalize, rotateVector, dotProduct } from "./util/Math.js";

const canvas = document.getElementById('view');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let camera = new Camera({ x: 0, y: 0, z: -10 }, { x: 0, y: 0, z: 0}, { x: 0, y: 0, z: 0 }, 90, width/height, 0.1, 100);

let objects = [];
objects.push(new Sphere(0, 0, 10, 1, {color: {x: 0.5, y: 0.9, z: 0.6}, emissionColor: {x: 0, y: 0, z: 0}, emissionStrength: 0}));
objects.push(new Sphere(0, 0, 12, 1, {color: {x: 0.8, y: 0.2, z: 0.3}, emissionColor: {x: 0, y: 0, z: 0}, emissionStrength: 0}));
objects.push(new Sphere(0, 50, 11, 49.5, {color: {x: 0.6, y: 0.1, z: 0.4}, emissionColor: {x: 0, y: 0, z: 0}, emissionStrength: 0}));
objects.push(new Sphere(25, -5, 11, 10, {color: {x: 0, y: 0, z: 0}, emissionColor: {x: 1, y: 1, z: 1}, emissionStrength: 5}));

function simpleTrace() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let ray = new Ray(camera.position, calculateRayDirection(x, y));

            let toDraw = null;
            let minimum = null;
            objects.forEach((sphere) => {
                ray.direction = normalize(ray.direction);
                let current = sphere.calcHit(ray);
                if(current.intersect) {
                    if(minimum == null || minimum >= current.distance) {
                        minimum = current.distance;
                        toDraw = sphere;
                    }
                }
            });
        
            if(minimum == null) {
                
            }
            else {
                let color = toDraw.material.color;
                let red = color.x * 255;
                let green = color.y * 255;
                let blue = color.z * 255;

                context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}

function rayTrace() {
    // for(let s = 0; s <= 10; s++) {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
            // let x = 250;
            // let y = 250;
            // let s = 10;
                let averageColor = {x: 0, y: 0, z: 0};
                for(let s = 0; s <= 10; s++) {
                    let ray = new Ray(camera.position, calculateRayDirection(x, y));

                    let color = trace(ray, 5);
                    

                    averageColor.x += color.x;
                    averageColor.y += color.y;
                    averageColor.z += color.z;


                    // if(color) {
                    //     let red = color.x * 255;
                    //     let green = color.y * 255;
                    //     let blue = color.z * 255;

                    //     context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                    //     context.fillRect(x, y, 1, 1);
                    // }
                    // console.log(x + ", " + y + " : " + s);
                }

                // console.log(averageColor);

                let red = averageColor.x * 255 / 10;
                let green = averageColor.y * 255 / 10;
                let blue = averageColor.z * 255 / 10;

                context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                context.fillRect(x, y, 1, 1);
            }
        }
    // }
}

function trace(ray, bounce) {
    let light = {x: 0, y: 0, z: 0};
    let color = {x: 1, y: 1, z: 1};

    for(let i = 0; i < bounce; i++) {
        let toDraw = null;
        let minimum = null;
        objects.forEach((sphere) => {
            ray.direction = normalize(ray.direction);
            let current = sphere.calcHit(ray);
            if(current.intersect) {
                if(minimum == null || minimum.distance >= current.distance) {
                    minimum = current;
                    toDraw = sphere;
                }
            }
        });

        if(minimum == null) {
            break;
        }
        else {
            ray.position = minimum.position;
            ray.direction = normalize(randomDir(ray, normalize(minimum.normal)));

            let emittedLight = {
                x: toDraw.material.emissionColor.x * toDraw.material.emissionStrength,
                y: toDraw.material.emissionColor.y * toDraw.material.emissionStrength,
                z: toDraw.material.emissionColor.z * toDraw.material.emissionStrength, 
            }

            light = {
                x: light.x + emittedLight.x * color.x,
                y: light.y + emittedLight.y * color.y,
                z: light.z + emittedLight.z * color.z,
            }

            color = {
                x: color.x * toDraw.material.color.x,
                y: color.y * toDraw.material.color.y,
                z: color.z * toDraw.material.color.z,
            }
        }
    }

    return light;
}

function randomDir(ray, normal) {
    // let randomValue = Math.random();
    // let normalValue = (randomValue) => Math.cos(2 * Math.PI * randomValue) * Math.sqrt(-2 * Math.log(randomValue));

    // let randomNormalDirection = normalize({x: normalValue(Math.random()), y: normalValue(Math.random()), z: normalValue(Math.random())});

    let randomNormalDirection = normalize({
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
    });

    let s = sign(dotProduct(normal, randomNormalDirection));
    return {
        x: randomNormalDirection.x * s,
        y: randomNormalDirection.y * s,
        z: randomNormalDirection.z * s,
    }
    // normal = normalize(normal);
    // let direction = normalize(ray.direction); 
    // let s = dotProduct(normal, direction);
    // let newDirection = {
    //     x: direction.x - (normal.x * 2 * s),
    //     y: direction.y - (normal.y * 2 * s),
    //     z: direction.z - (normal.z * 2 * s)
    // }
    // // let newDirection = Vector.subtract(ray.direction, Vector.scale(normal, 2 * Vector.dot(ray.direction, normal)))
    // newDirection.x += (Math.random() - 0.5) * 1
    // newDirection.y += (Math.random() - 0.5) * 1
    // newDirection.z += (Math.random() - 0.5) * 1

    // return newDirection;
}


function calculateRayDirection(x, y) {
    const fovRadians = Math.PI * (camera.fov / 2) / 180;
    const aspectRatio = camera.aspectRatio;
    const near = camera.near;

    const viewportHeight = 2 * Math.tan(fovRadians / 2) * near;
    const viewportWidth = aspectRatio * viewportHeight;

    const u = (x + 0.5) / width;
    const v = (y + 0.5) / height;

    const direction = {
        x: (2 * u - 1) * viewportWidth / 2 - camera.rotation.y,
        y: (1 - 2 * v) * viewportHeight / 2 - camera.rotation.x,
        z: -near - camera.rotation.z
    };
    // return normalize(rotateVector(normalize(direction), camera.rotation));
    return direction;
}

let lastFrameTime = performance.now();
let currentFps = 0;
let count = 0;

function drawFps() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    
    if(count%5 == 0) {
        context.fillStyle = "yellow";
        currentFps = Math.round(1000/deltaTime);
        context.fillText(currentFps, 10, 20);
        count == 0;
    }
    else {
        context.fillStyle = "yellow";
        context.fillText(Math.round(currentFps), 10, 20);
    }

    count += 1;
}

let renderBtn = document.getElementById("render");
renderBtn.onclick =(e) => {
    render = !render;
    if(!render) {
        requestAnimationFrame(update);
    }
};

let render = false;

function update() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if(render) {
        rayTrace();
    }
    else {
        simpleTrace();
        camera.move();
        
        drawFps();

        requestAnimationFrame(update);
    }

}
requestAnimationFrame(update);
