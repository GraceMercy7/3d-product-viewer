let autoRotateEnabled = true;
let rotationSpeed = 25; // degrees per second
let currentAngle = 0;
const radius = 5;
const height = 2;

function updateCameraAnimation() {
    if (autoRotateEnabled) {
        // Calculate new angle based on time
        const time = Date.now() * 0.001; // seconds
        currentAngle = time * rotationSpeed * (Math.PI / 180);
        
        // Update camera position in a circular path
        camera.position.x = radius * Math.sin(currentAngle);
        camera.position.z = radius * Math.cos(currentAngle);
        camera.position.y = height;
        
        // Make camera look at the center
        camera.lookAt(0, height * 0.5, 0);
    }
}