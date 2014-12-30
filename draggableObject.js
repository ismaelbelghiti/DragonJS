function createDraggableObject_(params) {
    var that = this;

    // identifier
    if(!params.ident) {
	alert('ident should be specified in draggableObject creation');
    }
    this.ident = params.ident;

    // component
    if(!params.component) {
	alert('component should be specified in draggableObject creation');
    }
    this.component = params.component;

    // starting cell
    if(!params.cell) {
	alert('cell should be specified in draggableObject creation');
    }
    this.paper = params.cell.paper;
    this.dragAndDropSystem = params.cell.dragAndDropSystem;
    this.currentCell = params.cell;
    this.currentCell.attach(this);
    this.state = 'contained';    
    this.lastCell = undefined;

    //drop area
    this.currentDropArea = false;

    //alias
    var ddSystem = this.dragAndDropSystem;
    
    this.getCurrentCell = function() {
	return this.currentCell;
    };

    this.getLastCell = function() {
	return this.lastCell;
    };

    this.getCurrentDropArea = function() {
	return this.currentDropArea;
    };

    this.remove = function() {
	this.component.remove();
    };

    
/////////////////
// PERMISSIONS //
/////////////////    
    
	// start drag
    this.canStartDrag = function() {
	return this.allowsStartDrag;
    };
	if(params.canStartDrag) {
	this.canStartDrag = params.canStartDrag;
    }
    
    this.allowsStartDrag = function() {
	return true;
    };
    if(params.allowsStartDrag) {
	this.allowsStartDrag = params.allowsStartDrag;
    }
	
	// drop
    this.canDrop = function(dropArea) {
	return this.allowsDrop(dropArea);
    };
    if(params.canDrop) {
	this.canDrop = params.canDrop;
    }
	
    this.allowsDrop = function(dropArea) {
	return true;
    };
    if(params.allowsDrop) {
	this.allowsDrop = params.allowsDrop;
    }
	
/////////////
// Actions //
/////////////

	// before start drag
    this.runActionsBeforeStartDrag = function() {
	this.actionBeforeStartDrag();
    };
	if(params.runActionsBeforeStartDrag) {
	this.runActionsBeforeStartDrag = params.runActionsBeforeStartDrag;
    }

    this.actionBeforeStartDrag = function() {
	};
	if(params.actionBeforeStartDrag) {
	this.actionBeforeStartDrag = params.actionBeforeStartDrag;
    }

	// after detached
    this.runActionsAfterDetached = function() {
	this.actionAfterDetached();
    };
	if(params.runActionsAfterDetached) {
	this.runActionsAfterDetached = params.runActionsAfterDetached;
    }

    this.actionAfterDetached = function() {
	};
    if(params.actionAfterDetached) {
	this.actionAfterDetached = params.actionAfterDetached;
    }
	
	// over
    this.runActionsOver = function() {
	this.actionOver();
    };
    if(params.runActionsOver) {
	this.runActionsOver = params.runActionsOver;
    }
	
    this.actionOver = function() {
	};
    if(params.actionOver) {
	this.actionOver = params.actionOver;
    }
	
	// end over
    this.runActionsEndOver = function() {
	this.actionEndOver();
    };
    if(params.runActionsEndOver) {
	this.runActionsEndOver = params.runActionsEndOver;
    }

    this.actionEndOver = function() {
	};
	if(params.actionEndOver) {
	this.actionEndOver = params.actionEndOver;
    }

	// after moved
    this.runActionsAfterMoved = function(dx, dy) {
	this.actionAfterMoved(dx,dy);
    };
    if(params.runActionsAfterMoved) {
	console.log('overl');
	this.runActionsAfterMoved = params.runActionsAfterMoved;
    }	

    this.actionAfterMoved = function(dx, dy) {
	};
    if(params.actionAfterMoved) {
	this.actionAfterMoved = params.actionAfterMoved;
    }
	
	// after dropped
    this.runActionsAfterDropped = function() {
	this.actionAfterDropped();
    };
    if(params.runActionsAfterDropped) {
	this.runActionsAfterDropped = params.runActionsAfterDropped;
    }
	
    this.actionAfterDropped = function() {
	};
    if(params.actionAfterDropped) {
	this.actionAfterDropped = params.actionAfterDropped;
    }
	
	// before destroyed
    this.runActionsBeforeDestroyed = function() {
	this.actionBeforeDestroyed();
    };
    if(params.runActionsBeforeDestroyed) {
	this.runActionsBeforeDestroyed = params.runActionsBeforeDestroyed;
    }
	
    this.actionBeforeDestroyed = function() {
	};
    if(params.actionBeforeDestroyed) {
	this.actionBeforeDestroyed = params.actionBeforeDestroyed;
    }    
    
///////////////////
// Drag And Drop //
///////////////////
    
    var start = function()
    {
	if(!ddSystem.canStartDrag(that))
	    return;
	this.startcx = this.cx;
	this.startcy = this.cy;
	this.toFront();
    };

    var move = function(dx,dy)
    {
	if(!ddSystem.canStartDrag(that)) {
	    return;
	}
	if(isNaN(dx) || isNaN(dy)) {
	    return;
	}
	
	this.placeAt(this.startcx + dx, this.startcy + dy);
	
	if(that.state == 'contained') {
	    if(that.getCurrentCell().hasLeft(that)) {
		that.currentCell.detach(that);
		that.state = 'free';
		that.lastCell = that.currentCell;		
	    }
	    that.currentDropArea = undefined;
	}
	
	if(that.state == 'free') {
	    var newDropArea = ddSystem.findDropArea(that);
	    if(newDropArea != that.currentDropArea) {
		if(that.currentDropArea) {
		   ddSystem.runActionsEndOver(that);
		}
		that.currentDropArea = newDropArea;
		if(that.currentDropArea) {
		   ddSystem.runActionsOver(that);
		}
	    }
	    ddSystem.runActionsAfterMoved(that,dx,dy);
	}
    }

    var up = function()
    {
	if(!ddSystem.canStartDrag(that))
	    return;

	if(that.state == 'contained')	{
	    this.placeAt(this.startcx, this.startcy);	
        return;		
	}
	var newCell = ddSystem.findNewCell(that);
	if(newCell) { // TODO: test also if newCell is known by ddSystem
	    that.currentCell = newCell;
		var durationInMs = 100;
	    newCell.attach(that,durationInMs);
	    that.state = 'contained';
	    ddSystem.runActionsAfterDropped(that);
	} else {
	    ddSystem.runActionsBeforeDestroyed(that);
	    that.remove();
	}
    }
    
    this.component.drag(move,start,up);		
};


function createDraggableObject(params) {
    return new createDraggableObject_(params);
}
