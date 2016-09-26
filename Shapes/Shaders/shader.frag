#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;


 
 uniform int N; //slider:0,10,3;

void main(void)
{
	vec3 color = vec3(0.0);
    vec2 st = vTexcoord;
  
   
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

 

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  
  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  color = vec3(1.0-smoothstep(.4,.41,d));

    oColor = vec4( color, 1.0 );

}
