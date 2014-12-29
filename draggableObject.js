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
    
    this.canStartDrag = function() {
	return this.allowsStartDrag;
    };
    
    this.allowsStartDrag = function() {
	return true;
    };

    this.canDrop = function(dropArea) {
	return this.allowsDrop(dropArea);
    };

    this.allowsDrop = function(dropArea) {
	return true;
    };

/////////////
// Actions //
/////////////

    this.runActionsBeforeStartDrag = function() {
	this.actionBeforeStartDrag();
    };

    this.actionBeforeStartDrag = function() {};

    this.runActionsAfterDetached = function() {
	this.actionAfterDetached();
    };

    this.actionAfterDetached = function() {};

    this.runActionsOver = function() {
	this.actionOver();
    };

    this.actionOver = function() {};

    this.runActionsEndOver = function() {
	this.actionEndOver();
    };

    this.actionEndOver = function() {};

    this.runActionsAfterMoved = function(dx, dy) {
	this.actionAfterMoved(dx,dy);
    };

    this.actionAfterMoved = function(dx, dy) {};
    
    this.runActionsAfterDropped = function() {
	this.actionAfterDropped();
    };

    this.actionAfterDropped = function() {};

    this.runActionsBeforeDestroyed = function() {
	this.actionBeforeDestroyed();
    };

    this.actionBeforeDestroyed = function() {};
    
    
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
	}
	var newCell = ddSystem.findNewCell(that);
	if(newCell) { // TODO: test also if newCell is known by ddSystem
	    that.currentCell = newCell;
	    newCell.attach(that);
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
