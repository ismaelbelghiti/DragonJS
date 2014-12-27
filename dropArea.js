function createDropArea_(ident,dragAndDropSystem) {
    
    this.doesContain = function(draggableObject) {
	return false;
    };

    this.findNewCell = function(draggableObject) {
	return undefined;
    };
}

function createDropArea(ident,dragAndDropSystem) {
    return new createDropArea_(id,dragAndDropSystem);
}


