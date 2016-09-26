#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;



float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.- step(_radius, dot(l,l)*4.0);
}



vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st.x *= _zoom ;
     _st.y *= _zoom  ;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void)
{
	vec3 color = vec3(0.0);
	vec2 st = vTexcoord;

    // Divide the space in 4
    st = tile(st,20.);

   	st = fract(st);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st, cos ( TWO_PI * iAnimationTime  ));

    // Draw a square
    color = vec3(box(st,vec2(0.4 + 0.4 * sin (2* TWO_PI* iAnimationTime)),0.01));
    oColor = vec4( 1.0 -color, 1.0 );
}
