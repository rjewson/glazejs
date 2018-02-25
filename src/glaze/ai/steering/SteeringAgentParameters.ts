export class SteeringAgentParameters {
    static default_scale: number = 0.2;
    static heavy_scale: number = 5;
    static default_maxAcceleration: number = 100;
    static default_maxSteeringForcePerStep: number = 100;

    public maxAcceleration: number; // = 100/5;
    public maxSteeringForcePerStep: number; // = 100/5;

    constructor(maxAcceleration: number, maxSteeringForcePerStep: number) {
        this.maxAcceleration = maxAcceleration;
        this.maxSteeringForcePerStep = maxSteeringForcePerStep;
    }
}

export const DEFAULT_STEERING_PARAMS: SteeringAgentParameters = new SteeringAgentParameters(
    SteeringAgentParameters.default_maxAcceleration * SteeringAgentParameters.default_scale,
    SteeringAgentParameters.default_maxSteeringForcePerStep * SteeringAgentParameters.default_scale,
);

export const HEAVY_STEERING_PARAMS: SteeringAgentParameters = new SteeringAgentParameters(
    SteeringAgentParameters.default_maxAcceleration * SteeringAgentParameters.heavy_scale,
    SteeringAgentParameters.default_maxSteeringForcePerStep * SteeringAgentParameters.heavy_scale,
);
