#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;



float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.- step(_radius, dot(l,l)*4.0);
}



vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom ;
     
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}



vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}


vec2 movingBrickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening


     //_st.x += step(1., mod(_st.y,2.0)) * sin(TWO_PI * iAnimationTime );

     //_st.x -= step(1., mod(_st.y,2.0)) * sin(TWO_PI * iAnimationTime );

    //_st.x = mod(_st.y,2.0) < 1.0 ? 0. : _st.y * 2.0 ;


    
     _st.x += mod(_st.y,2.0) > 1.0 ? -2. * (TWO_PI * iAnimationTime  ) : 2. * (TWO_PI * iAnimationTime   ) ;
     
     _st.y += mod(_st.x,2.0) > 1.0 ? -2. * (TWO_PI * iAnimationTime ) : 2. * (TWO_PI * iAnimationTime ) ;

    
    return fract(_st);
}



vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = iGlobalTime*_speed;
    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        } 
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        } 
    }
    return fract(_st);
}



vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2 
    _st *= 20.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;    
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
    
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}



void main(void)
{
	vec3 color = vec3(0.0);
	vec2 st = vTexcoord;

    // Divide the space in 4
    //st = tile(st,5.);
   	//st = fract(st);


 	// Apply the brick tiling
    //st = brickTile(st,5.0);
	//st = movingBrickTile(st,10.0);

	//st = tile(st,3.0);
	st = rotateTilePattern(st);
    //st = movingTiles(st,10., 0.25);


    // Use a matrix to rotate the space 45 degrees
    //st = rotate2D(st, TWO_PI * iAnimationTime * 2);

    //st = rotate2D(st, 0.5);

    // Draw a square
    //color = vec3(box(st,vec2(0.35 + 0.35 * sin ( 4 * TWO_PI* iAnimationTime)),0.01));

    color = vec3(box(st,vec2(0.7 ),0.01));
    

    //color = vec3(circle(st,float(0.5 )));
    


    //oColor = vec4( 1.0-color, 1.0 );

   oColor = vec4(vec3(step(st.x,st.y)),1.0);
}
