#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

uniform float osc; //slider: 0.0,2.0,0.8


void main(void)
{
    vec3 color = vec3(0.0);
    float s = 0.2 + 0.2 *  sin(TWO_PI * osc * iGlobalTime );

    float left = step(s,vTexcoord.x);   
    float bottom = step(s,vTexcoord.y);
    float right = step(s,1.0 - vTexcoord.x);   
    float top = step(s,1.0 - vTexcoord.y);    

	color = vec3(left * bottom * right * top); 
    oColor = vec4(color,1.0);



}

    
