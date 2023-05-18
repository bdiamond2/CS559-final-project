varying vec2 v_uv;
uniform float clock;

float getRandom(float seed) {
    float zoom = 100.;
    return fract(sin(floor((seed)*zoom)/zoom) * 1000000.);
}

void main() {
    v_uv = uv;
    vec3 pos = position.xyz;

    pos.x = pos.x + uv.y*0.1*sin((clock-6.*uv.y)/1.5)
    + uv.y*0.1*getRandom(clock)*sin(clock);
    
    pos.z = pos.z + uv.y*0.1*cos((clock-5.*uv.y)*0.5)
    + uv.y*0.1*getRandom(clock*2.)*cos(clock);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

