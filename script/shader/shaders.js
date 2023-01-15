//Extra bits of code that might be added
export let textureVsMul = ``;

export let vsShader = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelMatrix;

    varying vec2 vTexCoord;

    void main() {
        gl_Position = uProjectionMatrix * uModelMatrix * aVertexPosition;
        vTexCoord = aTexCoord;
    }
`;

export let fsShader = `
    precision highp float;

    uniform vec4 uTint;

    uniform sampler2D uImage;
		varying vec2 vTexCoord;

    void main() {
        gl_FragColor = uTint ${textureVsMul};
    }
`;

export function UpdateShaderCode({ textureVsMulCode = "" }) {
  textureVsMul = textureVsMulCode;
  vsShader = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelMatrix;

    varying vec2 vTexCoord;

    void main() {
        gl_Position = uProjectionMatrix * uModelMatrix * aVertexPosition;
        vTexCoord = aTexCoord;
    }
`;

  fsShader = `
    precision highp float;

    uniform vec4 uTint;

    uniform sampler2D uImage;
		varying vec2 vTexCoord;

    void main() {
        gl_FragColor = uTint ${textureVsMul};
    }
`;
}
