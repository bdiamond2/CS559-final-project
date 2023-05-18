varying vec2 v_uv;
uniform float clock;

float getRandom(float seed) {
    float zoom = 100.;
    return fract(sin(floor((seed)*zoom)/zoom) * 1000000.);
}
void main()
{
    vec3 hot = vec3(1.,1.,0.6);
    vec3 light = vec3(1.,1.,0.4);
    vec3 dark = vec3(.8,0.,0.);

    float randX = getRandom(sin(v_uv.x) - clock/1000.);
    float randY = getRandom(v_uv.y - clock/50.);
    float randXY = getRandom(smoothstep(randX, randY, 0.5));
    
    vec3 flameColor = vec3(mix(light,dark,randXY));
    gl_FragColor = vec4(mix(hot, flameColor, v_uv.y*2.), 1.-pow(v_uv.y,2.));
}

