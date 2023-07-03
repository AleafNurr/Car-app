import { lerp } from "./utils.js";

export class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i < neuronCounts.length-1; i++){
            this.levels.push( 
                new Level( neuronCounts[i], neuronCounts[i+1])
            );
        }
    }

    static feedForward(givenInputs, network){
        let outputs = Level.feedForward( givenInputs, network.levels[0] );
        for(let i = 1; i< network.levels.length; i++){
            outputs = Level.feedForward( outputs, network.levels[i] );
        }
        return outputs;
    }
    /*
     * mutate (GA) the network
     * if rate is 0, no mutation will occur
     * if rate is 1, all weights and biases will be mutated
     * if rate is between 0 and 1, weights and biases will be mutated by some amount (rate)
     */
    static mutate(network, mutationRate=1){
        network.levels.forEach( level => {
            for(let i = 0; i < level.biases.length; i++){
                // use linear interpolation to mutate the biases 
                level.biases[i] = lerp(level.biases[i], Math.random()*2-1, mutationRate);
            }
            for(let i = 0; i < level.weights.length; i++){
                for(let j = 0; j < level.weights[i].length; j++){
                    // use linear interpolation to mutate the weights
                    level.weights[i][j] = lerp(level.weights[i][j], Math.random()*2-1, mutationRate);
                }
            }
        });
    }
}

class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount).fill(0);
        this.outputs = new Array(outputCount).fill(0);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i = 0; i < inputCount; i++){
            this.weights[i] = new Array(outputCount).fill(0);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        // weights
        for(let i = 0; i < level.inputs.length; i++){
            for(let j = 0; j < level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2-1; // random number between -1 and 1
            }
        }

        // biases
        for(let i = 0; i < level.biases.length; i++){
            level.biases[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs, level){
        // set the inputs
        for(let i = 0; i < level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        // calculate the outputs
        for(let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++){
                sum += level.inputs[j] * level.weights[j][i];
            }

            if(sum > level.biases[i]){
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}
