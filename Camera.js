class Camera {
    constructor(position, rotation, target, fov, aspectRatio, near, far) {
        this.position = position;
        this.rotation = rotation;
        this.target = target;
        this.fov = fov;
        this.aspectRatio = aspectRatio;
        this.near = near;
        this.far = far;

        // Camera movement
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.space = false;
        this.shift = false;

        this.setupCameraListeners();
    }

    setupCameraListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.left = true;
                this.right = false;
            }
            if (event.key === 'ArrowRight') {
                this.right = true;
                this.left = false;
            }
            if (event.key === 'ArrowUp') {
                this.up = true;
                this.down = false;
            }
            if (event.key === 'ArrowDown') {
                this.down = true;
                this.up = false;
            }
            if(event.key === 'w') {
                this.w = true;
                this.s = false;
            }
            if(event.key === 'a') {
                this.a = true;
                this.d = false;
            }
            if(event.key === 's') {
                this.s = true;
                this.w = false;
            }
            if(event.key === 'd') {
                this.d = true;
                this.a = false;
            }
            if(event.key === ' ') {
                this.space = true;
                this.shift = false;
            }
            if(event.key === 'Shift') {
                this.shift = true;
                this.space = false;
            }
        });
    
        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft') {
                this.left = false;
            }
            if (event.key === 'ArrowRight') {
                this.right = false;
            }
            if (event.key === 'ArrowUp') {
                this.up = false;
            }
            if (event.key === 'ArrowDown') {
                this.down = false;
            }
            if(event.key === 'w') {
                this.w = false;
            }
            if(event.key === 'a') {
                this.a = false;
            }
            if(event.key === 's') {
                this.s = false;
            }
            if(event.key === 'd') {
                this.d = false;
            }
            if(event.key === ' ') {
                this.space = false;
            }
            if(event.key === 'Shift') {
                this.shift = false;
            }
        });
    }

    move() {
        if(this.left) {
            this.rotation.y += 0.03;
        }
        if(this.right) {
            this.rotation.y -= 0.03;
        }
        if(this.up) {
            this.rotation.x += 0.03;
        }
        if(this.down) {
            this.rotation.x -= 0.03;
        }
        if(this.w) {
            const direction = {
                x: Math.sin(this.rotation.y),
                y: Math.cos(this.rotation.y) * Math.sin(this.rotation.z),
                z: Math.cos(this.rotation.y) * Math.cos(this.rotation.z)
            };

            this.position.x += direction.x * 0.5;
            this.position.y += direction.y * 0.5;
            this.position.z += direction.z * 0.5;
        }
        if(this.a) {
            const direction = {
                x: Math.sin(this.rotation.y + Math.PI/2),
                y: Math.cos(this.rotation.y + Math.PI/2) * Math.sin(this.rotation.z),
                z: Math.cos(this.rotation.y + Math.PI/2) * Math.cos(this.rotation.z)
            };

            this.position.x += direction.x * 0.5;
            this.position.y += direction.y * 0.5;
            this.position.z += direction.z * 0.5;
        }
        if(this.s) {
            const direction = {
                x: Math.sin(this.rotation.y),
                y: Math.cos(this.rotation.y) * Math.sin(this.rotation.z),
                z: Math.cos(this.rotation.y) * Math.cos(this.rotation.z)
            };

            this.position.x -= direction.x * 0.5;
            this.position.y -= direction.y * 0.5;
            this.position.z -= direction.z * 0.5;
        }
        if(this.d) {
            const direction = {
                x: Math.sin(this.rotation.y + Math.PI/2),
                y: Math.cos(this.rotation.y + Math.PI/2) * Math.sin(this.rotation.z),
                z: Math.cos(this.rotation.y + Math.PI/2) * Math.cos(this.rotation.z)
            };

            this.position.x -= direction.x * 0.5;
            this.position.y -= direction.y * 0.5;
            this.position.z -= direction.z * 0.5;
        }
        if(this.space) {
            this.position.y -= 0.5;
        }
        if(this.shift) {
            this.position.y += 0.5;
        }
    }
}

export {Camera};