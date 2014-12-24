function DragAndDropSystem_(paper) {

    this.dropAreas = [];
    this.addDropArea = function(dropArea) {
	dropAreas.push(dropArea);
    };

    this.canDrag = function(draggableObject) {
	return draggableObject.allowsDrag()
	    && draggableObject.getCurrentCell()
	    .allowsDrag(draggableObject)
	    && this.allowsDrag(draggableObject);
    };

    this.allowsDrag = function(draggableObject) {
	return true;
    };

    this.runActionsWhenHasBeenDropped = function(draggableObject) {
	this.actionWhenHasBeenDropped(draggableObject);
	draggable.getCurrentCell().actionWhenHasBeenDropped(draggableObject);
	draggableObject.actionWhenHasBeenDropped();
    };

    this.actionWhenHasBeenDropped = function(draggableObject) {};
};

function DragAndDropSystem(paper) {
    return new DragAndDropSystem_(paper);
}
