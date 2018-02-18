export function CompileVertexShader(gl: WebGLRenderingContext, shaderSrc: string): WebGLShader {
    return CompileShader(gl, shaderSrc, WebGLRenderingContext.VERTEX_SHADER);
}

export function CompileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string): WebGLShader {
    return CompileShader(gl, shaderSrc, WebGLRenderingContext.FRAGMENT_SHADER);
}

export function CompileShader(gl: WebGLRenderingContext, shaderSrc: string, shaderType: number): WebGLShader {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)) {
        window.alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

export function CompileProgram(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string): WebGLProgram {
    var vertexShader = CompileVertexShader(gl, vertexSrc);
    var fragmentShader = CompileFragmentShader(gl, fragmentSrc);
    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, WebGLRenderingContext.LINK_STATUS)) {
        window.alert("Could not initialize program");
    }
    return shaderProgram;
}
