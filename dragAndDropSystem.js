function DragAndDropSystem_(params) {

    if(!params.paper) {
	alert('paper should be specified in dragAndDropSystem creation');
    }
    this.paper = params.papers;
    
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
	
	this.createSourceCell = function(params_) {
	var params = createCopy(params_);
	params.dragAndDropSystem = this;
	return createSourceCell(params);
    };
    
/////////////////
// PERMISSIONS //
/////////////////

    // start drag
    this.canStartDrag = function(draggableObject) {
	return this.allowsStartDrag(draggableObject)
	    && draggableObject.getCurrentCell()
	    .canStartDrag(draggableObject)
	    && draggableObject.canStartDrag();
    };
    if(params.canStartDrag) {
	this.canStartDrag = params.canStartDrag;
    }

    this.allowsStartDrag = function(draggableObject) {
	return true;
    };
    if(params.allowsStartDrag) {
	this.allowsStartDrag = params.allowsStartDrag;
    }

    // drop
    this.canDrop = function(draggableObject,dropArea) {
	return this.allowsDrop(draggableObject,dropArea) &&
	    dropArea.canDrop(draggableObject) &&
	    draggableObject.canDrop(dropArea);
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


/////////////////
// INFORMATION //
/////////////////

    // find new cell
    this.findNewCell = function(draggableObject) {
	if(draggableObject.getCurrentDropArea()) {
	    return draggableObject.getCurrentDropArea().findNewCell(draggableObject);
	} else {
	    return undefined;
	}
    };
    if(params.findNewCell) {
	this.findNewCell = params.findNewCell;
    }


    // find drop area (not customizable)
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

    // before start drag
    this.runActionsBeforeStartDrag = function(draggableObject) {
	this.actionBeforeStartDrag(draggableObject);
	draggableObject.getCurrentCell()
	    .runActionsBeforeStartDrag(draggableObject);
	draggableObject.runActionsBeforeStartDrag();
    };
    if(params.runActionsBeforeStartDrag) {
	this.runActionsBeforeStartDrag = params.runActionsBeforeStartDrag;
    }
    
    this.actionBeforeStartDrag = function(draggableObject) {};
    if(params.actionBeforeStartDrag) {
	this.actionBeforeStartDrag = params.actionBeforeStartDrag;
    }

    // after detached
    this.runActionsAfterDetached = function(draggableObject) {
	this.actionAfterDetached(draggableObject);
	draggableObject.getLastCell().runActionsAfterDetached(draggableObject);
	draggableObject.runActionsAfterDetached();
    };
    if(params.runActionsAfterDetached) {
	this.runActionsAfterDetached = params.runActionsAfterDetached;
    }

    this.actionAfterDetached = function(draggableObject) {};
    if(params.actionAfterDetached) {
	this.actionAfterDetached = params.actionAfterDetached;
    }

    // over
    this.runActionsOver = function(draggableObject) {
	this.actionOver(draggableObject);
	draggableObject.getCurrentDropArea().runActionsOver(draggableObject);
	draggableObject.runActionsOver();
    };
    if(params.runActionsOver) {
	this.runActionsOver = params.runActionsOver;
    }

    this.actionOver = function(draggableObject) {
    };
    if(params.actionOver) {
	this.actionOver = params.actionOver;
    }

    // end over
    this.runActionsEndOver = function(draggableObject) {
	this.actionEndOver(draggableObject);
	draggableObject.getCurrentDropArea().runActionsEndOver(draggableObject);
	draggableObject.runActionsEndOver();
    };
    if(params.runActionsEndOver) {
	this.runActionsEndOver = params.runActionsEndOver;
    }

    this.actionEndOver = function(draggableObject) {
    };
    if(params.actionEndOver) {
	this.actionEndOver = params.actionEndOver;
    }

    // after moved
    this.runActionsAfterMoved = function(draggableObject, dx, dy) {
	this.actionAfterMoved(draggableObject,dx,dy);
	draggableObject.runActionsAfterMoved(dx,dy);
    };
    if(params.runActionsAfterMoved) {
	this.runActionsAfterMoved = params.runActionsAfterMoved;
    }

    this.actionAfterMoved = function(draggableObject, dx, dy) {
    };
    if(params.actionAfterMoved) {
	this.actionAfterMoved = params.actionAfterMoved;
    }

    // after dropped
    this.runActionsAfterDropped = function(draggableObject) {	
	this.actionAfterDropped(draggableObject);
	draggableObject.getCurrentCell().runActionsAfterDropped(draggableObject);
	draggableObject.runActionsAfterDropped();
    };
    if(params.runActionsAfterDropped) {
	this.runActionsAfterDropped = params.runActionsAfterDropped;
    }

    this.actionAfterDropped = function(draggableObject) {
    };
    if(params.actionAfterDropped) {
	this.actionAfterDropped = params.actionAfterDropped;
    }

    // before destroyed
    this.runActionsBeforeDestroyed = function(draggableObject) {
	this.actionBeforeDestroyed(draggableObject);
	draggableObject.runActionsBeforeDestroyed(draggableObject);
    };
    if(params.runActionsBeforeDestroyed) {
	this.runActionsBeforeDestroyed = params.runActionsBeforeDestroyed;
    }

    this.actionBeforeDestroyed = function(draggableObject) {
    };
    if(params.actionBeforeDestroyed) {
	this.actionBeforeDestroyed = params.actionBeforeDestroyed;
    }
};

function DragAndDropSystem(params) {
    return new DragAndDropSystem_(params);
}
