export class ShaderWrapper {
    public program: WebGLProgram;
    public attribute: any;
    public uniform: any;

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.program = program;
        this.attribute = {};
        this.uniform = {};

        gl.useProgram(this.program);

        let cnt = gl.getProgramParameter(program, WebGLRenderingContext.ACTIVE_ATTRIBUTES);
        let i = 0;
        while (i < cnt) {
            const attrib = gl.getActiveAttrib(program, i);
            this.attribute[attrib.name] = gl.getAttribLocation(program, attrib.name);
            i++;
        }

        cnt = gl.getProgramParameter(program, WebGLRenderingContext.ACTIVE_UNIFORMS);
        i = 0;
        while (i < cnt) {
            const attrib = gl.getActiveUniform(program, i);
            this.uniform[attrib.name] = gl.getUniformLocation(program, attrib.name);
            i++;
        }
    }
}
