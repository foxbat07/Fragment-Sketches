#include "uniforms.glsl"
#include "pi.glsl"
#include "random.glsl"
#include "noise2D.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

uniform vec2 speed; //slider: 1.0,1000.0,100.0
uniform float grain; //slider: 0.01,10.0,1.0
uniform float nThreshold; //slider: 0.0,1.0,1.0
uniform float nLevel; //slider: 0.0,1.0,1.0


vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}


float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 corners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}


void main(void)
{
	vec2 st = vTexcoord;
	vec3 color = vec3(0.0);

	// Scale the coordinate system to see
    // some noise in action

    vec2 dist  = vec2(1.0) - st;

    vec2 pos = vec2(  st * dist * speed * sin ( iGlobalTime) ) * grain;


    // Use the noise function
    float n = noise(pos);

    if( n > nThreshold)
    	{
    	n= nLevel;
    	}
    else
    {

    	n = random(1.0);
    }


    oColor = vec4( 0.01, 0.0, n , 0.99 );

    
}
