# 8th Wall WebXR App Implementation Plan

We are building a premium, dark-themed menu application that allows users to view a dish (e.g., Grilled Chicken Salad) and transition into an AR view using 8th Wall. In AR, the 3D model of the dish will be placed on the user's table, complete with floating UI annotations for its ingredients.

> [!WARNING]
> **8th Wall Requirement**: To run 8th Wall WebAR, you will need a valid 8th Wall App Key. I will provide a placeholder `YOUR_8THWALL_APP_KEY` in the code, which you will need to replace with your actual key from the 8th Wall Console. Also, 8th Wall requires the project to be served over HTTPS or `localhost` to access the camera.

## Open Questions

> [!IMPORTANT]
> 1. **Navigation Flow**: Should the AR experience be on a separate page (e.g., `ar.html`) that the user navigates to after clicking "View on your table", or should it be a single page where the camera launches dynamically behind the menu? (I propose using a separate `ar.html` page for the cleanest 8th Wall integration).
> 2. **3D Assets**: I will use a placeholder 3D model (an avocado or similar free food model). Do you have a specific `.glb` or `.gltf` model URL you'd like me to use?
> 3. **UI Floating Labels**: In 8th Wall, floating labels can be done using 2D HTML elements mapped to 3D coordinates, or 3D text. I propose using 2D HTML overlays that track 3D positions for the best visual quality matching your screenshot. Is this acceptable?

## Proposed Changes

### UI & Styling
- Create a beautiful, glassmorphism-based dark theme menu in `index.html`.
- Style the typography with elegant fonts (Playfair Display for headings, Inter for body).
- Build the product details view with tags, price, and the "VIEW ON YOUR TABLE" button.

### 8th Wall AR Integration
- Create `ar.html` which sets up an A-Frame scene with `<a-scene xrweb>`.
- Add 8th Wall scripts (8frame, xrextras, xrweb).
- Implement a custom A-Frame component to handle the floating UI annotations (calculating 3D positions to 2D screen coordinates to move HTML elements over the 3D model).
- Implement tap-to-place functionality so the user can place the dish on a detected surface.

#### [NEW] index.html
Will serve as the 2D menu application.

#### [NEW] ar.html
Will serve as the 8th Wall AR experience.

#### [NEW] src/style.css
Will contain the premium CSS styling for both the menu and the AR overlays.

#### [NEW] src/main.js
Will handle the UI logic for the menu.

#### [NEW] src/ar-components.js
Will contain the custom A-Frame components for the 8th Wall AR view (surface placement, 3D-to-2D UI tracking).

## Verification Plan

### Manual Verification
- Run the Vite dev server (`npm run dev`).
- Open the local server on a mobile device (requires local network access and HTTPS/localhost forwarding, which 8th Wall supports via their dev environment or tools like ngrok).
- Verify the menu UI looks premium.
- Click "View on your table", enter the AR view, grant camera permissions, place the object, and verify the UI labels float correctly above the model.
