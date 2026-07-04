// 8th Wall custom A-Frame components

// Component that positions a 2D HTML element over a 3D A-Frame entity
AFRAME.registerComponent('ui-tracker', {
  schema: {
    elementId: { type: 'string' }
  },
  
  init: function () {
    this.uiElement = document.getElementById(this.data.elementId);
    this.camera = document.getElementById('camera').getObject3D('camera');
    
    // We only show the UI elements once the dish is placed
    this.el.sceneEl.addEventListener('dish-placed', () => {
      if (this.uiElement) {
        this.uiElement.classList.remove('hidden');
      }
    });
  },
  
  tick: function () {
    if (!this.uiElement || this.uiElement.classList.contains('hidden') || !this.camera) return;
    
    // Get world position of the target entity
    const position = new THREE.Vector3();
    this.el.object3D.getWorldPosition(position);
    
    // Project the 3D position to 2D screen coordinates
    position.project(this.camera);
    
    // Convert normalized device coordinates (-1 to +1) to screen pixels
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;
    
    const x = (position.x * widthHalf) + widthHalf;
    const y = -(position.y * heightHalf) + heightHalf;
    
    // Update the HTML element position
    // If it's behind the camera (z > 1), hide it
    if (position.z > 1) {
      this.uiElement.style.opacity = '0';
    } else {
      this.uiElement.style.opacity = '1';
      this.uiElement.style.left = `${x}px`;
      this.uiElement.style.top = `${y}px`;
    }
  }
});

// Component that allows placing the dish on the ground by tapping
AFRAME.registerComponent('tap-to-place', {
  init: function() {
    const ground = document.getElementById('ground');
    this.hasPlaced = false;

    // The user taps the ground to place the model
    ground.addEventListener('click', (event) => {
      if (this.hasPlaced) return; // Only allow placing once for this demo

      // Get the intersection point
      const intersection = event.detail.intersection;
      if (!intersection) return;

      // Move the dish group to the intersection point
      this.el.setAttribute('position', intersection.point);
      
      // Make the model visible and cast shadows
      this.el.setAttribute('visible', 'true');
      
      this.hasPlaced = true;
      
      // Emit event so ui-tracker can show annotations
      this.el.sceneEl.emit('dish-placed');
    });
    
    // Initialize dish as invisible until placed
    this.el.setAttribute('visible', 'false');
  }
});

// Close AR View logic
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-ar-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
});
