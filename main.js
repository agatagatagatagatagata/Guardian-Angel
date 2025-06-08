// Import helper functions to load models, audio, and videos
import {loadGLTF, loadAudio} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE; // Use THREE.js from the MindAR library

// Wait for the DOM content to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  let mindarThree = null; // Variable to hold the AR session instance
  let isStarted = false;  // Flag to track if the AR session is running

  // Function to start the AR experience
  const start = async () => {
    if (isStarted) return; // If already started, do nothing
    isStarted = true;      // Mark the session as started

    // Initialize MindAR with the container and image target configuration
    mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,                // Use the whole page as the AR view
      imageTargetSrc: './assets/targets/targets.mind' // Define the image target file
    });
    const {renderer, scene, camera} = mindarThree;

    // Add ambient light to the scene to illuminate 3D models
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // pn1
    const png1 = await loadGLTF('./assets/models/1.9/1.9.gltf');
    png1.scene.scale.set(1, 1, 1);  // Scale the model
    png1.scene.position.set(0, 0, 0);  // Set the model's position in the scene
	png1.scene.rotation.set(90, 0, 0);
	
    // Create anchors for each target in the AR experience TO ANCHOR prepei na to valw kai sta alla, alla AMA thelw na valw hxo, apla prepei na antigrapsw apo ayto to shmeio ewwwws...
    const png1Anchor = mindarThree.addAnchor(0);
    png1Anchor.group.add(png1.scene);
	//TELOS pn1
	
	//pn2
	const png2 = await loadGLTF('./assets/models/2.2/2.2.gltf');
    png2.scene.scale.set(1, 1, 1);  // Scale the model
    png2.scene.position.set(0, 0, 0);  // Set the model's position in the scene
	png2.scene.rotation.set(90, 0, 0);
	
	const png2Anchor = mindarThree.addAnchor(1);
    png2Anchor.group.add(png2.scene);

	//pn3
	const png3 = await loadGLTF('./assets/models/3.7/3.7.gltf');
    png3.scene.scale.set(1, 1, 1);  // Scale the model
    png3.scene.position.set(0, 0, 0);  // Set the model's position in the scene
	png3.scene.rotation.set(90, 0, 0);
	
	const png3Anchor = mindarThree.addAnchor(2);
    png3Anchor.group.add(png3.scene);
	
	// Start the AR experience and continuously render the scene
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Enable stop button, disable start button
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
  };

  // Function to stop the AR experience
  const stop = () => {
    if (!isStarted) return; // Prevent stopping if not started
    isStarted = false;

    // Stop the AR experience and animation loop
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
    mindarThree = null; // Reset the AR instance

    // Enable start button, disable stop button
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
  };

  // Add event listeners to the start and stop buttons
  document.getElementById('startButton').addEventListener('click', start);
  document.getElementById('stopButton').addEventListener('click', stop);
});
