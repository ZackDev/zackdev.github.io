import { Init } from '/assets/js/main.mjs';
import { vec3, mat4 } from '/assets/js/mdn-webgl/gl-matrix/esm/index.js';

var pyramidRotation = 0;

const initTutorial = () => {
    var then = 0;
    const cv = document.getElementById("gl-canvas-07");
    const gl = cv.getContext("webgl");

    gl.clearColor(0.0, 0.0, 0.0, 0.7);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec3 aVertexNormal;
        attribute vec2 aTextureCoord;

        uniform mat4 uNormalMatrix;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;

        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vTextureCoord = aTextureCoord;

            highp vec3 ambientLight = vec3(0.4, 0.2, 0.2);
            highp vec3 directionalLightColor = vec3(1.0, 0.5, 0.5);
            highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

            highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

            highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
            vLighting = ambientLight + (directionalLightColor * directional);
        }
    `;

    

    const fsSource = `
        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;

        uniform sampler2D uSampler;

        void main(void) {
            highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

            gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
        }
  `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };

    const buffers = initBuffers(gl);

    const texture = loadTexture(gl, '/assets/img/ratatoesk.jpg');

    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, texture, deltaTime);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

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

    // debug purpose
    let src = gl.getExtension('WEBGL_debug_shaders').getTranslatedShaderSource(shader);
    console.log("translated shader", src);

    return shader;
}

function initBuffers(gl) {

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the pyramid.
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

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    // the color buffer
    const textureCoordBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    // The texture FOR EACH OF the vertices
    const textureCoordinates = [
        // front
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        
        // left
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        
        // right
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        
        // back
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        
        // bottom
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        
        // bottom
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);


    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    // some easy "normals", not perpendicular
    /*
    const normals = [
        // front
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        // left
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        // right
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        // back
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        // bottom x2
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

    ];
    */

    const normals = [];
    
    for (let i = 0; i < positions.length; i=i+9) {
        let p1 = vec3.clone([positions[i], positions[i+1], positions[i+2]]);
        let p2 = vec3.clone([positions[i+3], positions[i+4], positions[i+5]]);
        let p3 = vec3.clone([positions[i+6], positions[i+7], positions[i+8]]);

        let s1 = vec3.subtract([0, 0, 0], p1, p2);
        let s2 = vec3.subtract([0, 0, 0], p1, p3);
        let n = vec3.normalize([0, 0, 0], vec3.cross([0, 0, 0], s1, s2));
        normals.push(n[0], n[1], n[2]);
        normals.push(n[0], n[1], n[2]);
        normals.push(n[0], n[1], n[2]);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
        normal: normalBuffer
    };
}

function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);


    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);
    
    const image = new Image();
    image.addEventListener("load", () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            srcFormat, srcType, image);

        if ((image.width % 2 === 0) && (image.height % 2 === 0)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn of mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    })
    image.src = url;

    return texture;
}

function drawScene(gl, programInfo, buffers, texture, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, pyramidRotation, [1, 0.5, 1]);

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    {
        // positions buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    {
        // texture coords buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
        gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

    }

    {
        // normals buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    }
    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix);

    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    {
        const vertexCount = 18;
        const offset = 0;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }
    pyramidRotation += deltaTime;
}


new Init(initTutorial);