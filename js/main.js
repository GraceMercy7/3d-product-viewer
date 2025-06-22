// Main application entry point
let scene, camera, renderer, controls, product;

document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'block';
    
    // Initialize your scene
    scene = initScene();
    product = createProduct();
    scene.add(product);
    addLighting(scene);
    
    // Set up controls and interaction
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    setupInteraction(scene, camera, product);
    
    // Hide loading indicator when ready
    loadingIndicator.style.display = 'none';
    
    animate();
});

function animate() {
    requestAnimationFrame(animate);
    
    // Update camera animation
    updateCameraAnimation();
    
    // Update controls
    controls.update();
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});