function createDraggableObject_(id, cell, component) {
    var that = this;
    this.paper = cell.paper;
    this.dragAndDropSystem = cell.dragAndDropSystem;
    this.currentCell = cell;
    this.lastCell = undefined;
    this.component = component;
    this.id = id;
    this.state = 'contained';
    var ddSystem = this.dragAndDropSystem;//alias

    this.getCurrentCell = function() {
	return this.currentCell;
    };

    this.getLastCell = function() {
	return this.lastCell;
    };
    
    this.allowsDrag = function() {
	return true;
    }

    var start = function()
    {
	if(!ddSystem.canDrag(that))
	    return;
	this.startcx = this.cx;
	this.startcy = this.cy;
	this.toFront();
    };

    var move = function(dx,dy)
    {
	if(!ddSystem.canDrag(that)) {
	    return;
	}
	if(isNaN(dx) || isNaN(dy)) {
	    return;
	}
	
	this.placeAt(this.startcx + dx, this.startcy + dy);
	
	if(that.state == 'contained') {
	    if(that.getCurrentCell().hasLeft(that)) {
		that.state = 'free';
		that.lastCell = that.currentCell;		
	    }
	    this.lastDropArea = undefined;
	}
	
	if(that.state == 'free') {
	    // recherche de la dropArea
	    // Si != de l'actuel
	    //    if(this.lastDropArea) actionsEndOvers()
	    //    this.lastDropArea = newDropArea;
	    //    actionsOvers()
	}
    }

    var up = function()
    {
	if(!ddSystem.canDrag(that))
	    return;

	if(that.state == 'contained')	{
	    this.placeAt(this.startcx, this.startcy);	    
	}
	// todo find new cell
	ddSystem.runActionsWhenHasBeenDropped(that);
    }
    
    this.component.drag(move,start,up);		
};


function createDraggableObject(id,cell,component) {
    return new createDraggableObject_(id,cell,component);
}
