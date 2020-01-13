precision mediump float;

const int PATH_TRACKING_SAMPLES = ${count};
const float INV_PATH_TRACKING_SAMPLES = 1.0 / float(PATH_TRACKING_SAMPLES);
const vec2 EMPTY_TILE = vec2(1.0, 1.0);
const float LIGHT_TO_MAP_RESOLUTION_RATIO = float(${ratio}); // 0.5;

uniform sampler2D uSampler;
uniform vec2 viewOffset;
uniform vec2 resolution;
uniform vec2 inverseTileTextureSize;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vArc;

void main(void) {
    vec2 fragToCenterPos = vTextureCoord.xy;
    float d = length(fragToCenterPos) / float(PATH_TRACKING_SAMPLES);
    float light = 1. - d;
    float addition = clamp(obs,0.,1.);
    gl_FragColor = vec4(vColor.r,vColor.g,vColor.b,addition);

}