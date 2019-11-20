export class BaseTexture {
    public width: number;
    public height: number;
    public source: ImageData;
    public powerOfTwo: boolean;

    public texture: WebGLTexture;

    public framebuffer: WebGLFramebuffer;
    public renderbuffer: WebGLRenderbuffer;

    private gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext, width: number, height: number, floatingPonumber: boolean = false) {
        this.gl = gl;
        this.powerOfTwo = false;
        this.width = width;
        this.height = height;
        this.RegisterTexture(floatingPonumber);
    }

    public RegisterTexture(fp: boolean) {
        if (this.texture == null) this.texture = this.gl.createTexture();
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
        this.gl.pixelStorei(WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        // this.gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MAG_FILTER,
            WebGLRenderingContext.NEAREST
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MIN_FILTER,
            WebGLRenderingContext.NEAREST
        );
        if (this.powerOfTwo) {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.REPEAT
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.REPEAT
            );
        } else {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.CLAMP_TO_EDGE
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.CLAMP_TO_EDGE
            );
        }
        // this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D,null);
        //this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D,0,WebGLRenderingContext.RGBA,WebGLRenderingContext.RGBA,WebGLRenderingContext.UNSIGNED_BYTE,source);
        this.gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            this.width,
            this.height,
            0,
            WebGLRenderingContext.RGBA,
            fp ? WebGLRenderingContext.FLOAT : WebGLRenderingContext.UNSIGNED_BYTE,
            null
        );
    }

    public static FromImage(gl: WebGLRenderingContext, image: ImageData) {
        var texture = new BaseTexture(gl, image.width, image.height);
        gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            image
        );
        return texture;
    }

    public bind(unit: number) {
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0 + unit);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
    }

    public unbind(unit: number) {
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0 + unit);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
    }

    public drawTo(callback: any) {
        //var v = this.gl.getParameter(WebGLRenderingContext.VIEWPORT);
        if (this.framebuffer == null) this.framebuffer = this.gl.createFramebuffer();
        if (this.renderbuffer == null) this.renderbuffer = this.gl.createRenderbuffer();
        this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, this.framebuffer);
        this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, this.renderbuffer);
        if (this.width != (this.renderbuffer as any).width || this.height != (this.renderbuffer as any).height) {
            (this.renderbuffer as any).width = this.width;
            (this.renderbuffer as any).height = this.height;
            this.gl.renderbufferStorage(
                WebGLRenderingContext.RENDERBUFFER,
                WebGLRenderingContext.DEPTH_COMPONENT16,
                this.width,
                this.height
            );
            this.gl.framebufferTexture2D(
                WebGLRenderingContext.FRAMEBUFFER,
                WebGLRenderingContext.COLOR_ATTACHMENT0,
                WebGLRenderingContext.TEXTURE_2D,
                this.texture,
                0
            );
            this.gl.framebufferRenderbuffer(
                WebGLRenderingContext.FRAMEBUFFER,
                WebGLRenderingContext.DEPTH_ATTACHMENT,
                WebGLRenderingContext.RENDERBUFFER,
                this.renderbuffer
            );
        }

        this.gl.viewport(0, 0, this.width, this.height);
        callback();
        this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
        this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, null);
        // this.gl.viewport(v[0], v[1], v[2], v[3]);
        // this.gl.viewport(0, 0, 800, 640);
        this.gl.viewport(0, 0, 1280, 720);
    }

    public UnregisterTexture(gl: WebGLRenderingContext) {
        if (this.texture != null) {
        }
    }
}
