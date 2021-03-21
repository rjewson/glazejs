precision mediump float;

const int PATH_TRACKING_SAMPLES = ${count};
const float INV_PATH_TRACKING_SAMPLES = 1.0 / float(PATH_TRACKING_SAMPLES);
const vec2 EMPTY_TILE = vec2(1.0, 1.0);
const float LIGHT_TO_MAP_RESOLUTION_RATIO = float(${ratio});
const float BLOCK_LIGHT_TRANSMISSION = 0.075;

const float _SamplingDist = 2.0;

uniform sampler2D uSampler;
uniform vec2 viewOffset;
uniform vec2 resolution;
uniform vec2 inverseTileTextureSize;
uniform vec4 ambientLight;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vArc;

void main(void) {
    vec2 pos = vec2(gl_FragCoord.x - 1., resolution.y - gl_FragCoord.y);
    vec2 currentPos = (pos - viewOffset) - vec2(0.0,1.0); 

    vec2 scaledTilesSize = inverseTileTextureSize * LIGHT_TO_MAP_RESOLUTION_RATIO;

    vec4 tile = texture2D(uSampler, currentPos * scaledTilesSize);
    float obsMult = float(all(lessThan(tile.xy, EMPTY_TILE)));

    // float v = float(all(lessThan(texture2D(uSampler, (currentPos + vec2(_SamplingDist, 0)) * scaledTilesSize).xy, EMPTY_TILE)));
    // v += float(all(lessThan(texture2D(uSampler, (currentPos + vec2(-_SamplingDist, 0)) * scaledTilesSize).xy, EMPTY_TILE)));
    // v += float(all(lessThan(texture2D(uSampler, (currentPos + vec2(0, -_SamplingDist)) * scaledTilesSize).xy, EMPTY_TILE)));
    // v += float(all(lessThan(texture2D(uSampler, (currentPos + vec2(0, _SamplingDist)) * scaledTilesSize).xy, EMPTY_TILE)));
    // v /= 4.0;

    float v = float(all(lessThan(texture2D(uSampler, (currentPos + vec2(_SamplingDist, 0)) * scaledTilesSize).xy, EMPTY_TILE)));
    v = max(v,float(all(lessThan(texture2D(uSampler, (currentPos + vec2(-_SamplingDist, 0)) * scaledTilesSize).xy, EMPTY_TILE))));
    v = max(v,float(all(lessThan(texture2D(uSampler, (currentPos + vec2(0, -_SamplingDist)) * scaledTilesSize).xy, EMPTY_TILE))));
    v = max(v,float(all(lessThan(texture2D(uSampler, (currentPos + vec2(0, _SamplingDist)) * scaledTilesSize).xy, EMPTY_TILE))));

    // half4 maxLight =		 tex2D(_MainTex, uv + half2(_SamplingDist, 0));
	// maxLight = max(maxLight, tex2D(_MainTex, uv + half2(-_SamplingDist, 0)));
	// maxLight = max(maxLight, tex2D(_MainTex, uv + half2(0, -_SamplingDist)));
	// maxLight = max(maxLight, tex2D(_MainTex, uv + half2(0, _SamplingDist)));


    gl_FragColor = vec4(1.0,1.0,1.0,1.0) * 1.0 - v; //obsMult;
}