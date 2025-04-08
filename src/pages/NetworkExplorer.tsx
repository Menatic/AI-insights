import React, { useEffect, useRef } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';
import { Network, ZoomIn, ZoomOut, RotateCcw, Box, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import { toast } from 'sonner';

// Neural Network Visualization Component
const NeuralNetworkVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const linksRef = useRef<THREE.Line[]>([]);
  const tesseractRef = useRef<THREE.Group | null>(null);
  const rotationSpeedRef = useRef(0.001);
  const zoomLevelRef = useRef(1);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0A1128);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 20;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x3A86FF, 2, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);
    
    // Create tesseract-like neural network structure
    createTesseractNetwork();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire scene
      if (sceneRef.current) {
        sceneRef.current.rotation.y += rotationSpeedRef.current;
        sceneRef.current.rotation.x += rotationSpeedRef.current * 0.2;
      }
      
      // Rotate the tesseract
      if (tesseractRef.current) {
        tesseractRef.current.rotation.y += rotationSpeedRef.current * 0.5;
        tesseractRef.current.rotation.z += rotationSpeedRef.current * 0.3;
      }
      
      // Pulse effect for nodes
      nodesRef.current.forEach((node, i) => {
        const scale = 0.8 + 0.2 * Math.sin(Date.now() * 0.001 + i);
        node.scale.set(scale, scale, scale);
        
        // Random activation
        if (Math.random() < 0.003) {
          activateNode(i);
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Create a tesseract-like network structure
  const createTesseractNetwork = () => {
    if (!sceneRef.current) return;
    
    // Clear previous network
    nodesRef.current.forEach(node => sceneRef.current?.remove(node));
    linksRef.current.forEach(link => sceneRef.current?.remove(link));
    nodesRef.current = [];
    linksRef.current = [];
    
    if (tesseractRef.current) {
      sceneRef.current.remove(tesseractRef.current);
    }
    
    const tesseract = new THREE.Group();
    tesseractRef.current = tesseract;
    sceneRef.current.add(tesseract);
    
    // Create 4D hypercube (tesseract) like structure - more complex version
    const innerCubeSize = 2.5;
    const middleCubeSize = 5;
    const outerCubeSize = 7.5;
    
    // Colors for different layers - enhanced with more vibrant colors
    const colors = [
      new THREE.Color(0x3A86FF), // Input layer - blue
      new THREE.Color(0x8B5CF6), // Hidden layer 1 - purple
      new THREE.Color(0xD946EF), // Hidden layer 2 - pink
      new THREE.Color(0x00B4D8),  // Output layer - cyan
      new THREE.Color(0xF59E0B)   // Additional layer - amber
    ];
    
    // Create inner cube (8 vertices)
    const innerCubePositions = [
      [-innerCubeSize/2, -innerCubeSize/2, -innerCubeSize/2],
      [innerCubeSize/2, -innerCubeSize/2, -innerCubeSize/2],
      [-innerCubeSize/2, innerCubeSize/2, -innerCubeSize/2],
      [innerCubeSize/2, innerCubeSize/2, -innerCubeSize/2],
      [-innerCubeSize/2, -innerCubeSize/2, innerCubeSize/2],
      [innerCubeSize/2, -innerCubeSize/2, innerCubeSize/2],
      [-innerCubeSize/2, innerCubeSize/2, innerCubeSize/2],
      [innerCubeSize/2, innerCubeSize/2, innerCubeSize/2]
    ];
    
    // Create middle cube (8 vertices)
    const middleCubePositions = [
      [-middleCubeSize/2, -middleCubeSize/2, -middleCubeSize/2],
      [middleCubeSize/2, -middleCubeSize/2, -middleCubeSize/2],
      [-middleCubeSize/2, middleCubeSize/2, -middleCubeSize/2],
      [middleCubeSize/2, middleCubeSize/2, -middleCubeSize/2],
      [-middleCubeSize/2, -middleCubeSize/2, middleCubeSize/2],
      [middleCubeSize/2, -middleCubeSize/2, middleCubeSize/2],
      [-middleCubeSize/2, middleCubeSize/2, middleCubeSize/2],
      [middleCubeSize/2, middleCubeSize/2, middleCubeSize/2]
    ];
    
    // Create outer cube (8 vertices)
    const outerCubePositions = [
      [-outerCubeSize/2, -outerCubeSize/2, -outerCubeSize/2],
      [outerCubeSize/2, -outerCubeSize/2, -outerCubeSize/2],
      [-outerCubeSize/2, outerCubeSize/2, -outerCubeSize/2],
      [outerCubeSize/2, outerCubeSize/2, -outerCubeSize/2],
      [-outerCubeSize/2, -outerCubeSize/2, outerCubeSize/2],
      [outerCubeSize/2, -outerCubeSize/2, outerCubeSize/2],
      [-outerCubeSize/2, outerCubeSize/2, outerCubeSize/2],
      [outerCubeSize/2, outerCubeSize/2, outerCubeSize/2]
    ];
    
    // Additional nodes (neural network layers)
    const additionalLayerPositions = [
      // Left layer (input)
      [-outerCubeSize, 0, 0],
      [-outerCubeSize, outerCubeSize/2, outerCubeSize/2],
      [-outerCubeSize, -outerCubeSize/2, -outerCubeSize/2],
      [-outerCubeSize, outerCubeSize/2, -outerCubeSize/2],
      [-outerCubeSize, -outerCubeSize/2, outerCubeSize/2],
      [-outerCubeSize, 0, outerCubeSize/2],
      
      // Right layer (output)
      [outerCubeSize, 0, 0],
      [outerCubeSize, outerCubeSize/2, outerCubeSize/2],
      [outerCubeSize, -outerCubeSize/2, -outerCubeSize/2],
      [outerCubeSize, outerCubeSize/2, -outerCubeSize/2],
      
      // Additional 3D structure - diagonal nodes
      [outerCubeSize/2, outerCubeSize/2, -outerCubeSize],
      [-outerCubeSize/2, outerCubeSize/2, -outerCubeSize],
      [outerCubeSize/2, -outerCubeSize/2, -outerCubeSize],
      [-outerCubeSize/2, -outerCubeSize/2, -outerCubeSize],
      
      // Additional top layer
      [0, outerCubeSize, 0],
      [outerCubeSize/2, outerCubeSize, outerCubeSize/2],
      [-outerCubeSize/2, outerCubeSize, -outerCubeSize/2],
    ];
    
    // Create nodes function with enhanced glow effect
    const createNode = (position: number[], layerIndex: number) => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: colors[layerIndex % colors.length],
        emissive: colors[layerIndex % colors.length],
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
        shininess: 100
      });
      
      const node = new THREE.Mesh(geometry, material);
      node.position.set(position[0], position[1], position[2]);
      node.castShadow = true;
      node.receiveShadow = true;
      tesseract.add(node);
      nodesRef.current.push(node);
      
      return node;
    };
    
    // Create inner cube nodes
    const innerCubeNodes = innerCubePositions.map(pos => createNode(pos, 1));
    
    // Create middle cube nodes
    const middleCubeNodes = middleCubePositions.map(pos => createNode(pos, 2));
    
    // Create outer cube nodes
    const outerCubeNodes = outerCubePositions.map(pos => createNode(pos, 3));
    
    // Create additional layer nodes
    const leftNodes = additionalLayerPositions.slice(0, 6).map(pos => createNode(pos, 0));
    const rightNodes = additionalLayerPositions.slice(6, 10).map(pos => createNode(pos, 4));
    const diagonalNodes = additionalLayerPositions.slice(10, 14).map(pos => createNode(pos, 1));
    const topNodes = additionalLayerPositions.slice(14).map(pos => createNode(pos, 2));
    
    // Helper function to create links between nodes with customizable opacity and color
    const createLink = (node1: THREE.Mesh, node2: THREE.Mesh, opacity: number = 0.3, colorIndex: number = 0) => {
      const points = [node1.position, node2.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: colors[colorIndex], 
        transparent: true, 
        opacity: opacity,
        linewidth: 1
      });
      
      const link = new THREE.Line(geometry, material);
      tesseract.add(link);
      linksRef.current.push(link);
    };
    
    // Connect inner cube vertices
    const innerCubeEdges = [
      [0, 1], [0, 2], [1, 3], [2, 3],
      [4, 5], [4, 6], [5, 7], [6, 7],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    
    innerCubeEdges.forEach(([i, j]) => {
      createLink(innerCubeNodes[i], innerCubeNodes[j], 0.7, 1);
    });
    
    // Connect middle cube vertices
    const middleCubeEdges = [
      [0, 1], [0, 2], [1, 3], [2, 3],
      [4, 5], [4, 6], [5, 7], [6, 7],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    
    middleCubeEdges.forEach(([i, j]) => {
      createLink(middleCubeNodes[i], middleCubeNodes[j], 0.6, 2);
    });
    
    // Connect outer cube vertices
    const outerCubeEdges = [
      [0, 1], [0, 2], [1, 3], [2, 3],
      [4, 5], [4, 6], [5, 7], [6, 7],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    
    outerCubeEdges.forEach(([i, j]) => {
      createLink(outerCubeNodes[i], outerCubeNodes[j], 0.5, 3);
    });
    
    // Connect corresponding vertices between cubes
    for (let i = 0; i < 8; i++) {
      createLink(innerCubeNodes[i], middleCubeNodes[i], 0.4, 1);
      createLink(middleCubeNodes[i], outerCubeNodes[i], 0.3, 2);
    }
    
    // Connect input layer to first layer of hypercube
    leftNodes.forEach(inputNode => {
      innerCubeNodes.slice(0, 4).forEach(cubeNode => {
        createLink(inputNode, cubeNode, 0.3, 0);
      });
    });
    
    // Connect last layer of hypercube to output layer
    rightNodes.forEach(outputNode => {
      outerCubeNodes.slice(4, 8).forEach(cubeNode => {
        createLink(outputNode, cubeNode, 0.3, 4);
      });
    });
    
    // Connect diagonal nodes
    diagonalNodes.forEach(diagNode => {
      // Connect to nearby outer cube nodes
      outerCubeNodes.slice(0, 4).forEach(cubeNode => {
        createLink(diagNode, cubeNode, 0.2, 1);
      });
    });
    
    // Connect top nodes
    topNodes.forEach(topNode => {
      // Connect to nearby outer cube nodes
      outerCubeNodes.slice(2, 6).forEach(cubeNode => {
        createLink(topNode, cubeNode, 0.2, 2);
      });
    });
    
    // Add some random inter-layer connections for complexity
    for (let i = 0; i < 30; i++) {
      const randomNodeIndex1 = Math.floor(Math.random() * nodesRef.current.length);
      const randomNodeIndex2 = Math.floor(Math.random() * nodesRef.current.length);
      
      if (randomNodeIndex1 !== randomNodeIndex2) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        createLink(nodesRef.current[randomNodeIndex1], nodesRef.current[randomNodeIndex2], 0.1, colorIndex);
      }
    }
  };
  
  // Get color based on layer index
  const getLayerColor = (layerIndex: number) => {
    const colors = [0x3A86FF, 0x8B5CF6, 0xD946EF, 0x00B4D8, 0xF59E0B];
    return colors[layerIndex % colors.length];
  };
  
  // Activate a node (highlight effect)
  const activateNode = (nodeIndex: number) => {
    const node = nodesRef.current[nodeIndex];
    if (!node) return;
    
    const originalEmissiveIntensity = 0.3;
    const material = node.material as THREE.MeshPhongMaterial;
    
    // Animate emissive intensity
    const animate = () => {
      material.emissiveIntensity = 1;
      
      setTimeout(() => {
        material.emissiveIntensity = originalEmissiveIntensity;
      }, 300);
    };
    
    animate();
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    zoomLevelRef.current += 0.2;
    cameraRef.current.position.z = 20 / zoomLevelRef.current;
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    zoomLevelRef.current = Math.max(0.5, zoomLevelRef.current - 0.2);
    cameraRef.current.position.z = 20 / zoomLevelRef.current;
  };
  
  // Toggle rotation
  const toggleRotation = () => {
    if (rotationSpeedRef.current === 0) {
      rotationSpeedRef.current = 0.001;
      toast.success("Rotation enabled");
    } else {
      rotationSpeedRef.current = 0;
      toast.success("Rotation paused");
    }
  };
  
  return (
    <div className="h-full relative" ref={containerRef}>
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-black/30 backdrop-blur-sm hover:bg-black/50">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-black/30 backdrop-blur-sm hover:bg-black/50">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={toggleRotation} className="bg-black/30 backdrop-blur-sm hover:bg-black/50">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={() => createTesseractNetwork()} className="bg-black/30 backdrop-blur-sm hover:bg-black/50">
          <Box className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const NetworkExplorer = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardHeader 
            title="Network Explorer" 
            subtitle="3D visualization of neural network architecture"
          />
          
          <motion.div 
            className="dashboard-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="dashboard-card-header">
              <h3 className="text-lg font-semibold flex items-center">
                <Network className="w-5 h-5 mr-2 text-ai-accent" />
                Neural Network Structure
              </h3>
              <div className="flex gap-2">
                <motion.span 
                  className="text-xs bg-ai-blue/50 border border-ai-accent/30 px-2 py-1 rounded-full flex items-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Layers className="h-3 w-3 mr-1" />
                  Tesseract Model
                </motion.span>
              </div>
            </div>
            <div className="dashboard-card-body p-0">
              <div className="h-[600px] w-full">
                <NeuralNetworkVisualization />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NetworkExplorer;
