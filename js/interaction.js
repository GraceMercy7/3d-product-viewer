let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let intersectedObject = null;
const infoPanel = document.getElementById('info-panel');

function setupInteraction(scene, camera, product) {
    window.addEventListener('click', onClick, false);
    window.addEventListener('mousemove', onMouseMove, false);
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        // Find the first intersect that's part of our product
        const productIntersect = intersects.find(intersect => 
            intersect.object.userData.name !== undefined
        );
        
        if (productIntersect) {
            // If we have a new intersection, highlight it
            if (intersectedObject !== productIntersect.object) {
                if (intersectedObject) {
                    // Reset previous intersection
                    intersectedObject.material.emissive.setHex(intersectedObject.currentHex);
                }
                
                // Store reference and highlight
                intersectedObject = productIntersect.object;
                intersectedObject.currentHex = intersectedObject.material.emissive.getHex();
                intersectedObject.material.emissive.setHex(0x888800);
                
                // Show info panel
                infoPanel.textContent = intersectedObject.userData.name;
                infoPanel.style.display = 'block';
            }
        } else {
            resetIntersection();
        }
    } else {
        resetIntersection();
    }
}

function onClick(event) {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const productIntersect = intersects.find(intersect => 
            intersect.object.userData.name !== undefined
        );
        
        if (productIntersect) {
            // Animate the clicked object
            const clickedObject = productIntersect.object;
            
            // Scale animation
            const originalScale = clickedObject.scale.clone();
            clickedObject.scale.set(
                originalScale.x * 1.2,
                originalScale.y * 1.2,
                originalScale.z * 1.2
            );
            
            // Reset after delay
            setTimeout(() => {
                clickedObject.scale.copy(originalScale);
            }, 300);
        }
    }
}

function resetIntersection() {
    if (intersectedObject) {
        intersectedObject.material.emissive.setHex(intersectedObject.currentHex);
        intersectedObject = null;
        infoPanel.style.display = 'none';
    }
}