function Gene(radius, color){

    // set radius of circle
    this.radius = radius;

    // set single color RGB
    this.color = color;

    // property to hold the Pixi circle object
    this.form;

    // initialize the form to a Pixi object
    this.initializeForm = function(){
        var graphic = new PIXI.Graphics();
        graphic.beginFill(this.color,1);
        this.form = graphic.drawCircle(0,0,this.radius)
                    .endFill();
    }

}

Gene.GetRandomGenes = function(targetWidth,targetHeight,minArea,maxArea) {
    var genes = [];
    var currentArea= 0;
    var targetArea = targetWidth * targetHeight;
    while (currentArea<1.2*targetArea) { //we want 20% over the targetArea to have overlapping circle and cover more area
        var gene = Gene.GetRandomGene(targetWidth,targetHeight,minArea,maxArea);
        genes.push(gene);
        currentArea += (Math.PI * gene.radius * gene.radius);
    }
    return genes;
}

Gene.GetRandomGene = function(targetWidth,targetHeight,minArea,maxArea) {
        var radius = Math.floor(Math.sqrt((minArea + Math.floor(Math.random()*(maxArea-minArea)))/Math.PI)); //choose radius randomly to fit between min and max area 
        var color = PixiUtils.getRandomColor();
        var gene = new Gene(radius,color);
        gene.initializeForm();
        gene.form.x = PixiUtils.Clamp(Math.floor(Math.random()*targetWidth),radius,targetWidth-radius);
        gene.form.y = PixiUtils.Clamp(Math.floor(Math.random()*targetHeight),radius,targetHeight-radius);
        return gene;
}