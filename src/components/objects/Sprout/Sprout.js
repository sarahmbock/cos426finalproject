import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './sprout.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Sprout extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            twirl: 0
        };

        const loader = new GLTFLoader();

        this.name = 'sprout';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }

    spin() {
        // Add a simple twirl
        this.state.twirl += 2 * Math.PI;

        const initialY = this.position.y

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: initialY }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        if (this.state.bob) {
            // Bob back and forth
            this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.rotation.y += Math.PI / 8;
        }
        // Advance tween animations, if any exist
        TWEEN.update();
    }

}

export default Sprout;
