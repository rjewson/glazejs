export class SteeringSettings {
    // Arrive speed settings
    static speedTweaker: number = 0.3;
    static arriveFast: number = 1;
    static arriveNormal: number = 3;
    static arriveSlow: number = 5;

    // Wander Settings
    static wanderJitter: number = 300; // ( per second )
    static wanderDistance: number = 25;
    static wanderRadius: number = 15;

    // Probabilities - Used to determine the chance that the Prioritized Dithering ( fastest ) calculation method will run a behavior
    static separationProbability: number = 0.2;
    static cohesionProbability: number = 0.6;
    static alignmentProbability: number = 0.3;

    static dodgeProbability: number = 0.6;

    static seekProbability: number = 0.8;
    static fleeProbability: number = 0.6;
    static pursuitProbability: number = 0.8;
    static evadeProbability: number = 1;
    static offsetPursuitProbability: number = 0.8;
    static arriveProbability: number = 0.5;

    static obstacleAvoidanceProbability: number = 0.5;
    static wallAvoidanceProbability: number = 0.5;
    static hideProbability: number = 0.8;
    static followPathProbability: number = 0.7;

    static interposeProbability: number = 0.8;
    static wanderProbability: number = 0.8;

    // Weights - Scalar to effect the weights of individual behaviors
    static separationWeight: number = 1;
    static alignmentWeight: number = 3;
    static cohesionWeight: number = 2;

    static dodgeWeight: number = 1;

    static seekWeight: number = 1;
    static fleeWeight: number = 1;
    static pursuitWeight: number = 1;
    static evadeWeight: number = 0.1;
    static offsetPursuitWeight: number = 1;
    static arriveWeight: number = 1;

    static obstacleAvoidanceWeight: number = 10;
    static wallAvoidanceWeight: number = 10;
    static hideWeight: number = 1;
    static followPathWeight: number = 0.5;

    static interposeWeight: number = 1;
    static wanderWeight: number = 1;

    // Priorities - Order in which behaviors are calculated ( lower numbers get calculated first )
    static wallAvoidancePriority: number = 10;
    static obstacleAvoidancePriority: number = 20;
    static evadePriority: number = 30;
    static hidePriority: number = 35;

    static seperationPriority: number = 40;
    static alignmentPriority: number = 50;
    static cohesionPriority: number = 60;

    static dodgePriority: number = 65;

    static seekPriority: number = 70;
    static fleePriority: number = 80;
    static arrivePriority: number = 90;
    static pursuitPriority: number = 100;
    static offsetPursuitPriority: number = 110;
    static interposePriority: number = 120;
    static followPathPriority: number = 130;
    static wanderPriority: number = 140;
}
