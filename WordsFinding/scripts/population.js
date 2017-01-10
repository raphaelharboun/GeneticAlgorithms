alert("population.js loaded");

function Population() {

    //set population size to 100 by default
    this.length = 100;

    //population array of genes
    this.population = [];

    //target sentence by default
    this.target = "To be or not to be";

    //mating pool for crossover
    this.matingPool = [];

    //mutation rate
    this.mutationRate = 0;

    //best current fit
    this.bestFit;
    this.bestScore;

    //function to initiate population
    this.initializePopulation = function(){
        for (var i =0; i<this.length; i++) {
            this.population[i] = new DNA(this.target.length);
        }
    };

    this.calculateFitness = function(){
        for (var i=0; i<this.length; i++){
            this.population[i].calculateFitness(this.target);
        }
        this.normalizeFitness();
    };
    
    this.normalizeFitness = function(){
        //first get the max score
        var maxScore = 0;
        for (var i=0; i<this.length; i++) {
            if (this.population[i].score > maxScore) {
                maxScore = this.population[i].score;
                this.bestFit = this.population[i].toString();
                this.bestScore = maxScore;
            }
        }
        //then normalize the score
        for (var i=0; i<this.length; i++) {
            this.population[i].score = Math.pow(Math.floor(mapRange(this.population[i].score,0,maxScore,0,1)),2);
        }
    };

    this.performCrossover = function(){
        //clean mating pool
        this.matingPool = [];
        //generate mating pool with population index
        for (var i=0;i<this.length;i++) {
            for (var j=0;j<this.population[i].score;j++) {
                this.matingPool.push(i);
            }
        }
        //get two random element in the mating pool and refill the population
        var newPopulation = [];
        for (var i=0;i<this.population.length;i++){
            var pop1 = this.population[this.matingPool[Math.floor(Math.random()*this.matingPool.length)]];
            var pop2 = this.population[this.matingPool[Math.floor(Math.random()*this.matingPool.length)]];
            var child = pop1.crossOver(pop2);
            newPopulation.push(child);
        }

        //replace original population with new one
        this.population = newPopulation;

    };

    this.performMutation = function(){
        //apply mutation rate to each element
        for (var i=0;i<this.length;i++){
            this.population[i].mutate(this.mutationRate);
        }
    };

}

