#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

void main(void)
{

    vec3 color = vec3(0.0);
    

    // a. The DISTANCE from the pixel to the center
    float pct = distance(vTexcoord,vec2(0.5));

    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
   
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);


    float move = 0.5 + 0.4 * sin( iAnimationTime  * TWO_PI ) ;

    for (float i = 0 ; i < 1.0 ; i+= move/20.0 )
    	{
    	 if( pct > move * i && pct < i * (move+0.01 ))  
       		color = vec3(  sin(move ) * sin(i*TWO_PI + PI) , 0.0 , i * 5.0  *  cos(move * TWO_PI ) );
    	}

   
    oColor = vec4( color , 1.0 );


}
