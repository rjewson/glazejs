precision mediump float;
varying vec2 vTextureCoord;
varying float vColor;
uniform sampler2D uSampler;
void main(void) {
    gl_FragColor = texture2D(uSampler,vTextureCoord) * vColor;
}