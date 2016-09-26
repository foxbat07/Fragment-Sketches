#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

uniform float osc; //slider: 0.0,2.0,1.0


void main(void)
{
    vec3 color1 = vec3(0.0);
    vec3 color2 = vec3(0.0);
    float s1 = 0.2 + 0.2 *  sin(TWO_PI * osc * iGlobalTime );
    float s2 = 0.2 + 0.2 *  sin( ( TWO_PI +PI ) * osc * iGlobalTime );
    
    //float s = osc;

    float left = step(s1,vTexcoord.x);   
    float bottom = step(s2,vTexcoord.y);

    float right = step(s1,1.0 - vTexcoord.x);   
    float top = step(s2,1.0 - vTexcoord.y);    

	color1 = vec3( bottom * top,0.0,0.0); 
	color2 = vec3(left * right ); 


    oColor = vec4(color1 * color2,1.0);



}

    
