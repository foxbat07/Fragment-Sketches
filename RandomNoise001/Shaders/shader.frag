#include "uniforms.glsl"
#include "pi.glsl"
#include "random.glsl"
#include "noise2D.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;


void main(void)
{
	vec2 st = vTexcoord;
	vec3  color = vec3(1.0);

	float i = floor(st.x);  // integer
	float f = fract(st.x);  // fraction

	float displacement = mix( random(i), random(i + 1.0), smoothstep(0.,1.,f));

	float n = length ( st - snoise(st) ) *  sin(iAnimationTime) ;

	float pct =  n +  length( st - vec2(0.5) );

    if ( pct > 0.4  && pct < 0.8 +0.01 )
    	{ 
    	color = vec3 (displacement * pct , pct , n );
    	}


    oColor = vec4( color , 1.0 );

    
}
