#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

void main(void)
{

    vec3 color = vec3(1.0);
    vec3 colora = vec3(1.0);
    vec3 colorb = vec3(1.0);
    vec3 colorc = vec3(1.0);
    
    vec2 bl = step(vec2(0.6),vTexcoord); 
    vec2 tr = step(vec2(0.2),1.0-vTexcoord);
    float pct = bl.x * bl.y * tr.x * tr.y;
    color = vec3( pct ,0.0 ,pct); 

    vec2 br = step(vec2(0.1),vTexcoord); 
    float pct1 = br.x * br.y;
    vec2 tl = step(vec2(0.4),1.0-vTexcoord);
    pct1 *= tl.x * tl.y;
    colora = vec3( 0.0,pct1 , pct1); 

    vec2 aa = step(vec2(0.8),vTexcoord); 
    vec2 bb = step(vec2(0.1),1.0-vTexcoord);
    float pct2 = aa.x * aa.y * bb.x * bb.y;
    colorc = vec3(  pct2, pct2, 0.0); 


    colorb = (color + colora + colorc);

    if ( colorb.x + colorb.y + colorb.z < 0.1)
    	{
    	colorb = vec3(1.0);
    	}


    oColor = vec4( colorb , 1.0 );


}
