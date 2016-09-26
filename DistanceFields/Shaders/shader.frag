#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

void main(void)
{

  vec3 color = vec3(0.0);

  // Remap the space to -1. to 1.
  vec2 st = vTexcoord * 2.0 -1.0;

  // Make the distance field
  //float d = sin( iGlobalTime ) * length( abs(st) - 0.5);
  //float d =  length( (st) );
  //float d = length( max(abs(st)-.03,0.3) );
  float d = length( abs(st)-.5 );


  // Visualize the distance field
  oColor = vec4(vec3(fract(d* 10)),1.0);
   


}
