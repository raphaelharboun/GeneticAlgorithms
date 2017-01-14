function DNA(width,height,minArea,maxArea){

    //hold the fitness score
    this.score = 0;

    //hold the min Area for a single gene
    this.minArea = minArea;

    //hold the max area for a single gene
    this.maxArea = maxArea;

    //hold the width and height of the target image
    this.width = width;
    this.height = height;

    //hold the individual genes (forms)
    this.genes = [];

    //create Pixi Container to hold all the genes
    this.container = new PIXI.Container();
    var wrapper = new PIXI.Graphics();
    wrapper.beginFill(0xFFFFFF)
            .drawRect(0,0,width,height)
            .endFill();
    this.container.addChild(wrapper);

    this.initialize = function() {
        //Instanciate new DNA with random genes
        this.genes = Gene.GetRandomGenes(width,height,this.minArea,this.maxArea);
        for (var i=0;i<this.genes.length;i++){
            this.container.addChild(this.genes[i].form);
        }
    };

}

DNA.prototype.calculateFitness = function(target){
    var pixels = PixiUtils.GetPixelsFromContainer(renderer,this.container);
    for (var i=0;i<pixels.length;i++) {
        this.score += 255-Math.abs(pixels[i]-target[i]);
    }
    this.score = this.score / (255*pixels.length);
};

DNA.prototype.crossOver = function(sibling) {
    //crossOver by random cut
    var child = new DNA(this.width,this.height,this.minArea,this.maxArea);
    for (var i=0;i<this.length;i++){
        if (Math.random() > 0.5){
            child.genes[i] = this.genes[i];
        }else {
            child.genes[i] = sibling.genes[i];
        }
    }
    return child; 
};

DNA.prototype.mutate = function(mutationRate) {
    //put a random char for each gene with mutationRate probability
    for (var i=0;i<this.length;i++){
        if (Math.random() <= mutationRate) {
            this.genes[i] = Gene.getRandomeGene(this.width,this.height,this.minArea,this.maxArea);
        }
    }
};

DNA.prototype.toString = function() {
    var res = ""
    for (var i=0;i<this.length;i++){
        res = res + this.genes[i];
    }
    return res;
};

DNA.getTarget = function(path) {
    
};
