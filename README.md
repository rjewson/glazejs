# glazeJS

A 2D WebGL game engine built with TypeScript.  The goal of the project to enable the development of large, open multiplayer 2D worlds for in-browser gaming.  Close attention has been paid to all performance aspects.

Live: [https://rjewson.github.io/glazejs/](https://rjewson.github.io/glazejs/)

- Fully designed around the Entity-Component-System archectural pattern
- Custom WebGL renderer with special attention to:
    - Sprites
    - Particles
    - Tilemaps
- Custom 2D physics engine
    - Optimized for large numbers of bodies
    - Hybrid ray/AABB collision scheme ensures correct contact point calculation and 0% chance of penetration
- Desisgned to manage massive concurent game worlds with large numbers of entities
- Steering behaviours
- AI
    - Behaviour Tree
    - FSM's
- and more!

## Install and run

1. clone this repo
2. `npm install`
3. `npm run dev`

TODO
- Write force to buffer and apply there (for particles)