import { Init } from '/assets/js/main.mjs';
import { mat4 } from '/assets/js/mdn-webgl/gl-matrix/esm/index.js';

var triangleRotation = 0;

const initTutorial = () => {
    var then = 0;
    const cv = document.getElementById("gl-canvas-05");
    const gl = cv.getContext("webgl");

    gl.clearColor(0.0, 0.0, 0.0, 0.7);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vsSource = `
            attribute vec4 aVertexPosition;
            attribute vec4 aVertexColor;

            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;

            varying lowp vec4 vColor;

            void main() {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                vColor = aVertexColor;
            }
        `;

    const fsSource = `
            varying lowp vec4 vColor;

            void main() {
                gl_FragColor = vColor;
            }
        `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }

    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);

        // Send the source to the shader object
        gl.shaderSource(shader, source);

        // Compile the shader program
        gl.compileShader(shader);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const buffers = initBuffers(gl);
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, deltaTime);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function initBuffers(gl) {

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions(x, y, z) for the pyramid.
    // where x is horizontal, y is vertical and z is depth
    /*
    const positions = [
        // front
        // - top, left, right
        0.0, 0.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        
        // left
        // - top, left, right
        0.0, 0.0, 1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,

        // right
        // - top, left, right
        0.0, 0.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,

        // back
        // - top, left, right
        0.0, 0.0, 1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,

        // bottom tlr
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

        // bottom tlr
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0
        
    ];
    */
    const positions = [
        // front
        0.0, 1.0, 0.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,

        // left
        0.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,

        // right
        0.0, 1.0, 0.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,

        // back
        0.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,

        // bottom
        1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,

        // bottom
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);


    // the color buffer
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // The colors FOR EACH OF the vertices
    const colors = [
        // front
        1.0, 0.84, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,

        // left
        1.0, 0.84, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,

        // right
        1.0, 0.84, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,

        // back
        1.0, 0.84, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,

        // bottom - A
        1.0, 0.54, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,

        // bottom - B
        1.0, 0.54, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.54, 0.0, 1.0,
    ];

     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


    return {
        position: positionBuffer,
        color: colorBuffer
    };
}

function drawScene(gl, programInfo, buffers, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        [-0.0, 0.0, -6.0]);  // amount to translate

    mat4.rotate(modelViewMatrix, modelViewMatrix, triangleRotation, [1, 1, 1]);

    {
        const numComponents = 3;  // 3, since those are vec3
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }
    {
        // the color buffer
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            4,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
        
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
        const offset = 0;
        const vertexCount = 18;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }
    triangleRotation += deltaTime;
}


new Init(initTutorial);