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

    vec2 pos = vec2(gl_FragCoord.x - 1., resolution.y - gl_FragCoord.y);

    vec2 currentPos = (pos - viewOffset) - vec2(0.0,1.0); // * inverseTileTextureSize;
    vec2 centerPos = currentPos - fragToCenterPos; // * inverseTileTextureSize;

    float m = INV_PATH_TRACKING_SAMPLES * d; // * 0.5;

    float light = 1. - d; // Linear
    
    // float light = pow(1. - d, 5.); // Ease in
    // float light = 1. - pow(1. - (1. - d), 3.); // Ease out

    // Torch
    float cone = 1.;
    if (bool(vArc.z)) {
        vec2 dir = vArc.xy; // vec2(1.,0.);
        float projection = dot(dir, normalize(fragToCenterPos));
        cone *= smoothstep(0.5 ,0.7, projection);
        // cone *= float( projection < 0.8 );
    }
    
    float obs = light * cone;

    vec2 scaledTilesSize = inverseTileTextureSize * LIGHT_TO_MAP_RESOLUTION_RATIO;

    float stepPos = 0.;
    for(int i = 0; i < PATH_TRACKING_SAMPLES; i++)
    {
        stepPos += INV_PATH_TRACKING_SAMPLES; 
        vec4 tile = texture2D(uSampler, floor(mix(centerPos, currentPos, stepPos)) * scaledTilesSize);
        float obsMult = float(all(lessThan(tile.xy, EMPTY_TILE)));
        obs -= m * obsMult;
        // stepPos -= INV_PATH_TRACKING_SAMPLES * 0.9 * obsMult;
        
        // if (all(lessThan(tile.xy, EMPTY_TILE))) {
        //     obs -= m;
        //     // obs *= m;
        //     // col *= saturate(1 - (1 - obstacle)*obstacle.a*m);
        // }
    }

    gl_FragColor.a = clamp(obs,0.,1.);
    // gl_FragColor.rgb = vec3(1.,0.,0.); // vColor.rgb
    // gl_FragColor = vec4(1.,1.,1.,1.0-d);

}