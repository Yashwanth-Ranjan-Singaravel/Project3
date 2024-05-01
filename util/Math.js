function sign(n) {
    return (n < 0)? -1:1
}

function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function magnitude(v) {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

function normalize(v) {
    let mag = magnitude(v);
    return {x: v.x/mag, y: v.y/mag, z: v.z/mag};
}

function rotateVector(vector, rotation) {
    const { x, y, z } = vector;
    const { x: alpha, y: beta, z: gamma } = rotation;

    const rotatedX = x * Math.cos(gamma) * Math.cos(beta) +
                     y * (Math.cos(gamma) * Math.sin(beta) * Math.sin(alpha) - Math.sin(gamma) * Math.cos(alpha)) +
                     z * (Math.cos(gamma) * Math.sin(beta) * Math.cos(alpha) + Math.sin(gamma) * Math.sin(alpha));

    const rotatedY = x * Math.sin(gamma) * Math.cos(beta) +
                     y * (Math.sin(gamma) * Math.sin(beta) * Math.sin(alpha) + Math.cos(gamma) * Math.cos(alpha)) +
                     z * (Math.sin(gamma) * Math.sin(beta) * Math.cos(alpha) - Math.cos(gamma) * Math.sin(alpha));

    const rotatedZ = -x * Math.sin(beta) +
                     y * Math.cos(beta) * Math.sin(alpha) +
                     z * Math.cos(beta) * Math.cos(alpha);

    return { x: rotatedX, y: rotatedY, z: rotatedZ };
}

export{sign, dotProduct, magnitude, normalize, rotateVector};