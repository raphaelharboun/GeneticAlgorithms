function DNA(length){

    //DNA length
    this.length = length

    //gene is an array of char
    this.genes = [];

    //hold the fitness score
    this.score=0;

    //Instanciate new DNA with random genes
    for (var i=0; i<this.length; i++){
        this.genes[i] = getRandomChar();
    }

}

DNA.prototype.calculateFitness = function(target){
    this.score = 0;
    for (var i=0; i<this.length; i++){
        if (this.genes[i]==target.charAt(i)) {
            this.score++;
        }
    }
    this.score = this.score / this.length;
};

DNA.prototype.crossOver = function(sibling) {
    //crossOver by random cut
    var child = new DNA(this.length);
    var randomIndex = Math.floor(Math.random()*this.length);
    for (var i=0;i<this.length;i++){
        if (i<=randomIndex) {
            child.genes[i] = this.genes[i];
        } else {
            child.genes[i] = sibling.genes[i];
        }
    }
    return child; 
};

DNA.prototype.mutate = function(mutationRate) {
    //put a random char for each gene with mutationRate probability
    for (var i=0;i<this.length;i++){
        if (Math.random() <= mutationRate) {
            this.genes[i] = getRandomChar();
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
