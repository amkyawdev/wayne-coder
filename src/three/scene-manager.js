/**
 * Three.js Scene Manager
 * Controls the main Three.js scene, renderer, and animation loop
 */
import * as THREE from 'three';
import { ParticleManager } from './particle-manager.js';

export class SceneManager {
    constructor(container) {
        this.container = container;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLights();
        this.initManagers();
        this.bindEvents();
        
        this.startAnimation();
    }

    initScene() {
        this.scene = new THREE.Scene();
        // Subtle fog for depth
        this.scene.fog = new THREE.FogExp2(0x0B1020, 0.0008);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.1,
            1000
        );
        this.camera.position.z = 300;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0B1020, 1);
        
        this.container.appendChild(this.renderer.domElement);
    }

    initLights() {
        // Ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Point lights for accent
        const pointLight1 = new THREE.PointLight(0x00F5FF, 0.5, 500);
        pointLight1.position.set(100, 100, 100);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x5B8CFF, 0.5, 500);
        pointLight2.position.set(-100, -100, 100);
        this.scene.add(pointLight2);
    }

    initManagers() {
        this.particleManager = new ParticleManager(this.scene);
    }

    bindEvents() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('touchmove', (e) => this.onTouchMove(e));
    }

    onResize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX / this.width) * 2 - 1;
        this.mouseY = -(event.clientY / this.height) * 2 + 1;
    }

    onTouchMove(event) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.mouseX = (touch.clientX / this.width) * 2 - 1;
            this.mouseY = -(touch.clientY / this.height) * 2 + 1;
        }
    }

    startAnimation() {
        this.clock = new THREE.Clock();
        
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            
            const deltaTime = this.clock.getDelta();
            const elapsedTime = this.clock.getElapsedTime() * 1000;
            
            // Smooth mouse interpolation
            this.targetMouseX += (this.mouseX - this.targetMouseX) * 0.05;
            this.targetMouseY += (this.mouseY - this.targetMouseY) * 0.05;
            
            // Camera parallax effect
            this.camera.position.x += (this.targetMouseX * 30 - this.camera.position.x) * 0.02;
            this.camera.position.y += (this.targetMouseY * 30 - this.camera.position.y) * 0.02;
            this.camera.lookAt(0, 0, 0);
            
            // Update particle manager
            this.particleManager.update(deltaTime * 1000);
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    dispose() {
        this.stopAnimation();
        this.particleManager.dispose();
        this.renderer.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}