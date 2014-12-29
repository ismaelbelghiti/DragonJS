function createDropArea_(params) {

    // identifier
    if(!params.ident) {
	alert('ident should be specified in dropArea creation');
    }
    this.ident = params.ident;

    // dragAndDropSystem
    if(!params.dragAndDropSystem) {
	alert('dragAndDropSystem should be specified in dropArea creation');
    }
    this.dragAndDropSystem = params.dragAndDropSystem;

/////////////////
// PERMISSIONS //
/////////////////

    this.canDrop = function(draggableObject) {
	return this.allowsDrop(draggableObject);
    };
    if(params.canDrop) {
	this.canDrop = params.canDrop;
    }
    
    this.allowsDrop = function(draggableObject) {
	return true;
    };
    if(params.allowsDrop) {
	this.allowsDrop = params.allowsDrop;
    }



//////////////////
// INFORMATIONS //
//////////////////
    
    this.doesContain = function(draggableObject) {
	return false;
    };
    if(params.doesContain) {
	this.doesContain = params.doesContain;
    }

    this.findNewCell = function(draggableObject) {
	return undefined;
    };
    if(params.findNewCell) {
	this.findNewCell = params.findNewCell;
    }

/////////////
// ACTIONS //
/////////////

    // Over
    this.runActionsOver = function(draggableObject) {
	this.actionOver(draggableObject);
    };
    if(params.runActionOver) {
	this.runActionOver = params.runActionOver;
    }

    this.actionOver = function(draggableObject) {
    };
    if(params.actionOver) {
	this.actionOver = params.actionOver;
    }

    // End over
    this.runActionsEndOver = function(draggableObject) {
	this.actionEndOver(draggableObject);
    };
    if(params.runActionsEndOver) {
	this.runActionsEndOver = params.runActionsEndOver;
    }

    this.actionEndOver = function(draggableObject) {
    };
    if(params.actionEndOver) {
	this.actionEndOver = params.actionEndOver;
    }
}

function createDropArea(params) {
    return new createDropArea_(params);
}


