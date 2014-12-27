function createCell_(params) {
    if(!params.ident) {
	alert('ident should be specidied in cell creation');
    }
    if(!params.dragAndDropSystem) {
	alert('dragAndDropSystem should be specidied in cell creation');
    }
    
    this.ident = params.ident;
    this.dragAndDropSystem = params.dragAndDropSystem;
    this.paper = this.dragAndDropSystem.paper;
    this.containedDraggables = [];

///////////////////////////
// Draggables Management //
///////////////////////////

    this.getNbContainedDraggables = function() {
	return this.containedDraggables.length();
    };

    this.getDraggable = function(i) {
	return this.containedDraggables[i];
    };

    this.detach = function(draggableObject) {
	var pos = -1;
	for(var i = 0; i < this.containedDraggables.length; i++) {
	    if(this.containedDraggables[i] == draggableObject) {
		pos = i;
	    }
	}
	if(pos == -1) {
	    alert('Error: cannot find pos in cell.detach(...)');
	}
	this.containedDraggables[i] =
	    this.containedDraggables[this.containedDraggables.length-1];
	this.containedDraggables.pop();
    };

    this.attach = function(draggableObject) {
	this.containedDraggables.push(draggableObject);
    };

///////////////
// CREATIONS //
///////////////

    this.createDraggableObject = function (params_) {
	var params = createCopy(params_);
	params.cell = this;
	return this.attach(createDraggableObject(params));
    };    

/////////////////
// PERMISSIONS //
/////////////////

    this.canStartDrag = function(draggableObject) {
	return this.allowsStartDrag(draggableObject);
    };    
    
    this.allowsStartDrag = function(draggableObject) {
	return true;
    };
    
//////////////////
// INFORMATIONS //
//////////////////    
    
    this.hasLeft = function(draggableObject) {
	return false;
    };

/////////////
// ACTIONS //
/////////////

    this.runActionsBeforeStartDrag = function(draggableObject) {
	this.actionBeforeStartDrag(draggableObject);
    };

    this.actionBeforeStartDrag = function(draggableObject) {};

    this.runActionsAfterDetached = function(draggableObject) {
	this.actionAfterDetached(draggableObject);
    };

    this.actionAfterDetached = function(draggableObject) {};
}

function createCell(params) {
    return new createCell_(params);
}



