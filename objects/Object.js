import { sign, dotProduct, magnitude, normalize } from "../util/Math.js";

class Sphere {
    constructor(x, y, z, radius, material) {
        this.position = {x: x, y: y, z: z};
        this.radius = radius;
        this.material = material;
    }

    calcHit(ray) {
        const rayOrigin = ray.position;
        const rayDirection = ray.direction;

        const sphereCenter = this.position;
        const sphereRadius = this.radius;
    
        // const rayToSphere = {
        //     x: rayOrigin.x - sphereCenter.x,
        //     y: rayOrigin.y - sphereCenter.y,
        //     z: rayOrigin.z - sphereCenter.z
        // };

        // // const projection = dotProduct(rayToSphere, normalize(rayDirection));

        // // const distanceToClosest = magnitude(rayToSphere) - projection;

        // // if (distanceToClosest > sphereRadius) {
        // //     return {
        // //         intersect: false,
        // //         distance: null,
        // //         position: null,
        // //         normal: null
        // //     };
        // // }
        // const a = dotProduct(rayDirection, rayDirection);
        // const b = 2 * dotProduct(rayDirection, rayToSphere);
        // const c = dotProduct(rayToSphere, rayToSphere) - sphereRadius * sphereRadius;

        // // Calculate discriminant
        // const discriminant = b * b - 4 * a * c;

        // if (discriminant < 0) {
        //     // No intersection
        //     return {
        //         intersect: false,
        //         position: null,
        //         normal: null,
        //         distance: null
        //     };
        // }
    
        // // Calculate distance to the intersection point
        // const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        // const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        // const distanceToIntersection = (t1>=0 && t2>=0)? Math.max(t1, t2) : Math.min(t1, t2);

        // // const distanceToIntersection = Math.sqrt(sphereRadius * sphereRadius - distanceToClosest * distanceToClosest);
    
        // // const distanceAlongRay = projection - distanceToIntersection;

        // const intersectionPoint = {
        //     x: rayOrigin.x + rayDirection.x * distanceToIntersection,
        //     y: rayOrigin.y + rayDirection.y * distanceToIntersection,
        //     z: rayOrigin.z + rayDirection.z * distanceToIntersection
        // };
    
        // const normal = {
        //     x: (intersectionPoint.x - sphereCenter.x) / sphereRadius,
        //     y: (intersectionPoint.y - sphereCenter.y) / sphereRadius,
        //     z: (intersectionPoint.z - sphereCenter.z) / sphereRadius
        // };
    
        // return {
        //     intersect: true,
        //     distance: distanceToIntersection,
        //     position: intersectionPoint,
        //     normal: normal
        // };

        let rayToSphere = {
            x: rayOrigin.x - sphereCenter.x,
            y: rayOrigin.y - sphereCenter.y,
            z: rayOrigin.z - sphereCenter.z
        };

        let distToCenter = magnitude(rayToSphere);
        // console.log(distToCenter);

        let rayDistToCenter = dotProduct(rayToSphere, ray.direction);

        // console.log(distToCenter + " : " + rayDistToCenter);    
        let rayDistFromCenterSquared = distToCenter ** 2 - rayDistToCenter ** 2;

        let radiusSquared = this.radius ** 2;

        let distToSurface = rayDistToCenter - Math.sqrt(Math.abs(radiusSquared - rayDistFromCenterSquared));

        let collide = true;

        if (rayDistToCenter < 0) { 
            collide = false;
        }
        if (rayDistFromCenterSquared > radiusSquared) { 
            collide = false;
        }

        if (!collide) { distToSurface = Infinity }

        let point = {
            x: ray.direction.x * distToSurface + ray.position.x,
            y: ray.direction.y * distToSurface + ray.position.y,
            z: ray.direction.z * distToSurface + ray.position.z,
        }

        // let point = Vector.add(Vector.scale(ray.direction, distToSurface), ray.origin)
        let normal = {
            x: point.x - this.position.x,
            y: point.y - this.position.y,
            z: point.z - this.position.z
        }

 

        return { intersect: collide, distance: distToSurface, position: point, normal: normalize(normal)};
    }
}

export{ Sphere };