$(function(){
    $("#generation-button").on("click touchstart",function(){

    alert("TestJQUERY");

    //create new population
    var population = new Population();

    //set mutation rate
    population.mutationRate = $("#mutation-rate").val();

    //set population size
    population.length = $("#population-size").val();

    //set population target
    population.target = $("#guess-phrase-input").val();

    //initialize population
    population.initializePopulation();

    //stop look when target is reached
    var targetScore = $("#target-score").val();
    var targetReached = false;

    //reset screen
    if ($("#previous-fit-list").length){
        $("#previous-fit-list").remove();
    }
    $("#previous-fit-wrapper").append("<div id='previous-fit-list'></div>");

    //60fps Loop
    var iteration = 0;
    GenerationLoop()

    function GenerationLoop() {

        iteration++;

        //calculate population fitness
        population.calculateFitness();

        //perform population crossover
        population.performCrossover();
        //console.log(population);

        //perform population mutation
        population.performMutation();
        //console.log(population);

        //print current population best fit
        $("#current-fit").html(population.bestFit);
        $("#previous-fit-list").prepend("<p>" + iteration + ":" + population.bestFit + "</p>");
        $("#iteration-count").html(iteration);
        $("#max-score").html(Math.floor(population.bestScore*10)/10);

        if (population.bestScore >= targetScore) {
            targetReached = true;
        }

        //loop this function at 60fps
        if (!targetReached){
            requestAnimationFrame(GenerationLoop);
        }

    }

    });
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