#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;


float random (vec2 st) {
    //return fract(sin(dot(st.xy, vec2(12.9898 * iMouse.x,783.233* iMouse.y)))*43758.5453123);

        return fract(sin(dot(st.xy,vec2(12.9898,783.233)))*43758.5453123);
}





void main(void)
{
	vec2 st = vTexcoord; 
	//st.x = 0.000008 * sin (0.1 *iAnimationTime);

 	float rnd = random( st );


    oColor = vec4( vec3(rnd), 1.0 );
}
