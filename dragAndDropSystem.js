function DragAndDropSystem_(paper) {

    this.dropAreas = [];

///////////////
// CREATIONS //
///////////////

    this.createDropArea = function(params_) {
	var params = createCopy(params_);
	params.dragAndDropSystem = this;
	this.dropAreas.push(createDropArea(params));
	return this.dropAreas[this.dropAreas.length-1];
    };

    this.createCell = function(params_) {
	var params = createCopy(params_);
	params.dragAndDropSystem = this;
	return createCell(params);
    };
    
/////////////////
// PERMISSIONS //
/////////////////

    this.canStartDrag = function(draggableObject) {
	return this.allowsStartDrag(draggableObject)
	    && draggableObject.getCurrentCell()
	    .canStartDrag(draggableObject)
	    && draggableObject.canStartDrag();
    };

    this.allowsStartDrag = function(draggableObject) {
	return true;
    };

    this.canDrop = function(draggableObject,dropArea) {
	return this.allowsDrop(draggableObject,dropArea) &&
	    dropArea.canDrop(draggableObject) &&
	    draggableObject.canDrop(dropArea);
    };    

    this.allowsDrop = function(draggableObject) {
	return true;
    };

/////////////////
// INFORMATION //
/////////////////

    this.findNewCell = function(draggableObject) {
	if(draggableObject.getCurrentDropArea()) {
	    return draggableObject.getCurrentDropArea().findNewCell(draggableObject);
	} else {
	    return undefined;
	}
    };

    this.findDropArea = function(draggableObject) {
	for(var i = this.dropAreas.length-1; i >= 0; i--) {
	    if(this.dropAreas[i].doesContain(draggableObject)
	      && this.canDrop(draggableObject,this.dropAreas[i])) {
		return this.dropAreas[i];
	    }
	}
	return undefined;
    };
    
/////////////
// ACTIONS //
/////////////

    this.runActionsBeforeStartDrag = function(draggableObject) {
	this.actionBeforeStartDrag(draggableObject);
	draggableObject.getCurrentCell()
	    .runActionsBeforeStartDrag(draggableObject);
	draggableObject.runActionsBeforeStartDrag();
    };

    this.actionBeforeStartDrag = function(draggableObject) {};

    this.runActionsAfterDetached = function(draggableObject) {
	this.actionAfterDetached(draggableObject);
	draggableObject.getLastCell().runActionsAfterDetached(draggableObject);
	draggableObject.runActionsAfterDetached();
    };

    this.actionAfterDetached = function(draggableObject) {};

    this.runActionsOver = function(draggableObject) {
	this.actionOver(draggableObject);
	draggableObject.getCurrentDropArea().runActionsOver(draggableObject);
	draggableObject.runActionsOver();
    };

    this.actionOver = function(draggableObject) {};

    this.runActionsEndOver = function(draggableObject) {
	this.actionEndOver(draggableObject);
	draggableObject.getCurrentDropArea().runActionsEndOver(draggableObject);
	draggableObject.runActionsEndOver();
    };

    this.actionEndOver = function(draggableObject) {};

    this.runActionsAfterMoved = function(draggableObject, dx, dy) {
	this.actionAfterMoved(draggableObject,dx,dy);
	draggableObject.runActionsAfterMoved(dx,dy);
    };

    this.actionAfterMoved = function(draggableObject, dx, dy) {};
    
    this.runActionsAfterDropped = function(draggableObject) {
	this.actionAfterDropped(draggableObject);
	draggableObject.getCurrentCell().runActionsAfterDropped(draggableObject);
	draggableObject.runActionsAfterDropped();
    };

    this.actionAfterDropped = function(draggableObject) {};

    this.runActionsBeforeDestroyed = function(draggableObject) {
	this.actionBeforeDestroyed(draggableObject);
	draggableObject.runActionsBeforeDestroyed(draggableObject);
    };

    this.actionBeforeDestroyed = function(draggableObject) {};
};

function DragAndDropSystem(paper) {
    return new DragAndDropSystem_(paper);
}
