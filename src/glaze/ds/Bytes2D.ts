export class Bytes2D 
{

    public data:ArrayBuffer;
    private data8:Uint8Array;

    public width:number;
    public height:number;

    private numberernalWidth:number;

    public cellSize:number;
    public invCellSize:number;

    public bytesPerCell:number;

    constructor(width:number, height:number, cellSize:number, bytesPerCell:number, data?:ArrayBuffer) 
    {
        this.initalize(width, height, cellSize, bytesPerCell, data);
    }
    
    public initalize(width:number, height:number, cellSize:number, bytesPerCell:number, data?:ArrayBuffer):void {
        this.width = width;
        this.height = height;

        this.numberernalWidth = width * bytesPerCell;

        this.cellSize = cellSize;
        this.invCellSize = 1 / cellSize;

        this.bytesPerCell = bytesPerCell;
        
        if (data==null) 
            this.data = new ArrayBuffer(width*height*bytesPerCell);
        else
            this.data = data;
        this.data8 = new Uint8Array(this.data);
    }

     public get(x:number,y:number,offset:number):number {
        return this.data8[( (y * this.numberernalWidth) + (x * this.bytesPerCell) + offset)];
    }

     public set(x:number,y:number,offset:number,value:number) {
        this.data8[ (y * this.numberernalWidth) + (x * this.bytesPerCell) + offset] =  value;
    }

    // public getReal(x:Float,y:Float,offset:number):number {
    //     return get(Index(x),Index(y),offset);
    // }

     public Index(value:number):number {
        //FIXME Not sure this always works...
        //return Std.number(value / cellSize);
        //return Math.floor(value * invCellSize);
        return (value * this.invCellSize) | 0;
    }   

    // public static function uncompressData(str:String,compressed:Bool=true):Bytes {
    //     var mapbytes:Bytes = haxe.crypto.Base64.decode(str);
    //     if (compressed)
    //         mapbytes = haxe.zip.Uncompress.run(mapbytes);
    //     return mapbytes;
    // }

}