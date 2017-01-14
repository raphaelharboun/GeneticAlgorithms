$(function(){
    //$("#generation-button").on("click",function(){

    window.renderer = PIXI.autoDetectRenderer(300,200);
    window.stage = new PIXI.Container();

    $("#content").append(renderer.view);
    renderer.render(stage);
    var monalisa;
    var population;
    var iteration = 0;
    var targetScore = 0.8
    var targetReached = false;

    PIXI.loader.add('monalisa','images/monalisa.jpg').load(function(){
        monalisa = new PIXI.Sprite(PIXI.loader.resources['monalisa'].texture);
        //stage.addChild(monalisa);
        //renderer.render(stage);
        StartGeneration();
        //testPopulation();
    });

    function StartGeneration() {
        //create new population
        population = new Population();

        //set mutation rate
        population.mutationRate = $("#mutation-rate").val();

        //set population size
        population.length = 10;//$("#population-size").val();

        //set population target
        population.target = PixiUtils.GetPixelsFromContainer(renderer,monalisa);
        population.targetImage = monalisa;

        //initialize population
        population.initializePopulation();

        //stop look when target is reached
        targetScore = $("#target-score").val();

        //reset screen
/*        if ($("#previous-fit-list").length){
            $("#previous-fit-list").remove();
        }
        $("#previous-fit-wrapper").append("<div id='previous-fit-list'></div>");*/

        //stage.addChild(population.population[0].container);
        //renderer.render(stage);

        //60fps Loop
        GenerationLoop()
    }

    function GenerationLoop() {
        iteration++;
        //calculate population fitness
        console.log("calculate Fitness");
        population.calculateFitness();
        console.log("After Fitness population");
        console.log(population);

        //perform population crossover
        console.log("perform crossover");
        population.performCrossover();
        console.log(population);

        //perform population mutation
        console.log("Perform mutation");
        population.performMutation();
        console.log(population);

       //remove current child and add new child
       stage.removeChildAt(0);
       stage.addChild(population.bestFit.container); 

        //print current population best fit
        $("#iteration-count").html(iteration);
        $("#max-score").html(Math.floor(population.bestScore*10)/10);

        console.log(population.bestScore);

        if (population.bestScore >= targetScore) {
            targetReached = true;
        }

        //loop this function at 60fps
        if (!targetReached){
            //requestAnimationFrame(GenerationLoop);
        }
    }

   // });
});

//utils function
function getRandomChar(){
    return String.fromCharCode(Math.floor(Math.random()*93)+32);
}

function mapRange(x,min,max,minRange,maxRange){
    if (max ==0 ){
        return minRange;
    } else {
        return x/(max-min) * (maxRange-minRange) + minRange;
    }
}
