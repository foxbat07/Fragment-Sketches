#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

void main(void)
{
	vec3 color = vec3(0.0);
    vec2 pos = vec2(0.5)-vTexcoord;
   
    float r = length(pos) * 1.5 ;
    float a = atan(pos.y,pos.x);
    float f = cos(a*3.) ;
    
	// f = abs(cos(a*3.));
    // f = abs(cos(a*1.5))*.1+ 0.5;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

	color = vec3( abs(r *  a) /PI);

    oColor = vec4( color, 1.0 );

}
