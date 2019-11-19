precision mediump float;
uniform sampler2D texture;
// uniform vec2 flip;
varying vec2 vTilePos;
varying vec2 tileDim;
// varying vec2 vColor;
void main() {
    vec2 uv = vec2( gl_PointCoord.x*tileDim.x + vTilePos.x, gl_PointCoord.y*tileDim.y + vTilePos.y );
    
    //Latest
    //vec2 uv = vec2( ((-1.0+(2.0*vColor.x))*(vColor.x-gl_PointCoord.x)*tileDim.x) + vTilePos.x, ((-1.0+(2.0*vColor.y))*(vColor.y-gl_PointCoord.y)*tileDim.y) + vTilePos.y);
    
    //vec2 uv = vec2( gl_PointCoord.x*tileDim.x + vTilePos.x, gl_PointCoord.y*tileDim.y + vTilePos.y); //Works no rotation
    // vec2 uv = vec2( gl_PointCoord.x*invTexTilesWide + invTexTilesWide*vTilePos.x, gl_PointCoord.y*invTexTilesHigh + invTexTilesHigh*vTilePos.y);
    //vec2 uv = vec2( (-1.0*(0.0-gl_PointCoord.x))*invTexTilesWide + invTexTilesWide*vTilePos.x, (gl_PointCoord.y)*invTexTilesHigh + invTexTilesHigh*vTilePos.y);
    // vec2 uv = vec2( ((-1.0+(2.0*flip.x))*(flip.x-gl_PointCoord.x))*invTexTilesWide + invTexTilesWide*vTilePos.x, ((-1.0+(2.0*flip.y))*(flip.y-gl_PointCoord.y))*invTexTilesHigh + invTexTilesHigh*vTilePos.y);
    gl_FragColor = texture2D( texture, uv );
}