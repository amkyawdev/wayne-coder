/**
 * Three.js Particle Manager
 * Handles particle creation, updates, and neural network connections
 */
import * as THREE from 'three';

export class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.lines = [];
        this.particleCount = 500;
        this.connectionDistance = 80;
        this.bounds = { x: 800, y: 600, z: 400 };
        
        this.initParticles();
        this.initConnections();
    }

    initParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);

        // Color palette for particles
        const colorPalette = [
            new THREE.Color(0x00F5FF), // Neon cyan
            new THREE.Color(0x5B8CFF), // Electric blue
            new THREE.Color(0x8B5CF6), // Purple
            new THREE.Color(0xFF00FF), // Neon pink
        ];

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Random position within bounds
            positions[i3] = (Math.random() - 0.5) * this.bounds.x;
            positions[i3 + 1] = (Math.random() - 0.5) * this.bounds.y;
            positions[i3 + 2] = (Math.random() - 0.5) * this.bounds.z;

            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random size
            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create shader material for glowing particles
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: window.devicePixelRatio }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                uniform float pixelRatio;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Pulsing size animation
                    float pulse = sin(time * 0.001 + position.x * 0.01) * 0.3 + 1.0;
                    gl_PointSize = size * pixelRatio * 3.0 * pulse;
                    
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    // Circular gradient falloff
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha *= 0.6;
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    initConnections() {
        const maxConnections = 100;
        const positions = this.points.geometry.attributes.position.array;
        
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(maxConnections * 6);
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00F5FF,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });

        this.lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.lineMesh);
        
        this.positions = positions;
        this.maxConnections = maxConnections;
    }

    updateConnections(mouseX = 0, mouseY = 0) {
        const positions = this.positions;
        const linePositions = this.lineMesh.geometry.attributes.position.array;
        let lineIndex = 0;
        
        // Find nearby particles and create connections
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            const x1 = positions[i3];
            const y1 = positions[i3 + 1];
            const z1 = positions[i3 + 2];

            for (let j = i + 1; j < this.particleCount && lineIndex < this.maxConnections * 6 - 6; j++) {
                const j3 = j * 3;
                const x2 = positions[j3];
                const y2 = positions[j3 + 1];
                const z2 = positions[j3 + 2];

                const dx = x1 - x2;
                const dy = y1 - y2;
                const dz = z1 - z2;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < this.connectionDistance) {
                    linePositions[lineIndex++] = x1;
                    linePositions[lineIndex++] = y1;
                    linePositions[lineIndex++] = z1;
                    linePositions[lineIndex++] = x2;
                    linePositions[lineIndex++] = y2;
                    linePositions[lineIndex++] = z2;
                }
            }
        }

        // Fill remaining with zeros
        for (let i = lineIndex; i < linePositions.length; i++) {
            linePositions[i] = 0;
        }

        this.lineMesh.geometry.attributes.position.needsUpdate = true;
    }

    update(deltaTime) {
        this.points.material.uniforms.time.value += deltaTime;

        // Subtle particle drift
        const positions = this.points.geometry.attributes.position.array;
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += Math.sin(Date.now() * 0.0001 + i) * 0.02;
            positions[i3 + 1] += Math.cos(Date.now() * 0.00015 + i) * 0.015;
        }

        this.points.geometry.attributes.position.needsUpdate = true;
        this.updateConnections();
    }

    dispose() {
        this.scene.remove(this.points);
        this.scene.remove(this.lineMesh);
        this.points.geometry.dispose();
        this.points.material.dispose();
        this.lineMesh.geometry.dispose();
        this.lineMesh.material.dispose();
    }
}