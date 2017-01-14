

function PixiUtils(){

}

PixiUtils.GetPixelsFromContainer = function (renderer,container) {
    var renderTexture = PIXI.RenderTexture.create(container.width,container.height);
    renderer.render(container,renderTexture);
    var pixels = renderer.plugins.extract.pixels(renderTexture);
    return pixels
}

PixiUtils.getRandomColor = function() {
    var colorNumber = Math.floor(Math.random()*16777216);
    return colorNumber;
}

PixiUtils.Clamp = function(value,min,max) {
    return Math.max(Math.min(value,max),min);
}

PixiUtils.RandomNumber = function(min, max) {
    return min + Math.floor(Math.random()*max);
}

PixiUtils.ReplaceImage = function(image,stage,renderer) {
    stage.removeChild(0);
    stage.addChild(image);
    renderer.render(stage);
}