function createCell_(id, dragAndDropSystem) {
    this.id = id;
    this.dragAndDropSystem = dragAndDropSystem;
    this.paper = dragAndDropSystem.paper;

    this.allowsDrag = function(draggableObject) {
	return true;
    };
    
    this.hasLeft = function(draggableObject) {
	return false;
    };

    this.actionWhenHasBeenDropped = function(draggableObject) {};
}

function createCell(id, dragAndDropSystem) {
    return new createCell_(id, dragAndDropSystem);
}
