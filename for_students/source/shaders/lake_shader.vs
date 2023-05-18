varying vec2 v_uv;
uniform float clock;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

