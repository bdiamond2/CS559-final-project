varying vec2 v_uv;
uniform float clock;

float getRandom(float seed) {
    float zoom = 30.;
    return fract(sin(floor((seed)*zoom)/zoom) * 1000000.);
}
void main()
{
    vec3 light = vec3(0.7,0.9,1.0);
    vec3 dark = vec3(0.5,0.7,0.9);

    float randX = getRandom(v_uv.x + pow(sin(v_uv.y), cos(clock/1000.)) + clock/10000.);
    float randY = getRandom(v_uv.y + pow(cos(v_uv.x), sin(clock/1000.)) + clock/10000.);
    float randXY = smoothstep(randX, randY, getRandom(randX * randY));
    
    gl_FragColor = vec4(mix(light,dark,randXY), 1.);
}

