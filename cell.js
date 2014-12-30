function createCell_(params) {
    var that = this;
    
    if(!params.ident) {
	alert('ident should be specified in cell creation');
    }
    this.ident = params.ident;    

    if(!params.dragAndDropSystem) {
	alert('dragAndDropSystem should be specified in cell creation');
    }
    this.dragAndDropSystem = params.dragAndDropSystem;
    this.paper = this.dragAndDropSystem.paper;
	
    this.component = component(0,0,[],paper);//empty compo by default
    if(params.component) {
	this.component = params.component;
	this.cx = params.component.cx;
	this.cy = params.component.cy;
    }
	if(params.cx) {
		this.cx = params.cx;
	}
	if(params.cy) {
		this.cy = params.cy;
	}

    this.centered = false;
    if(params.centered != undefined) {
	this.centered = params.centered;
    }

	if(this.centered && (!params.cx || !params.cy) && !params.component) {
	    alert('cx,cy (or component) should be specified in cell creation when "centered" is enabled');
	}
	
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

    this.attach = function(draggableObject,durationInMs) {
	if(!durationInMs) {
		durationInMs = 0;
	}
	if(this.centered) {
	    draggableObject.component.placeAtWithAnim(this.cx,this.cy,durationInMs);
	}
	this.containedDraggables.push(draggableObject);
	return this.containedDraggables[this.containedDraggables.length-1];
    };

///////////////
// CREATIONS //
///////////////

    this.createDraggableObject = function (params_) {
	var params = createCopy(params_);
	params.cell = this;
	return this.attach(createDraggableObject(params));
    };    

    this.createDropArea = function(params_) {
	var params = createCopy(params_);
	params.dragAndDropSystem = this.dragAndDropSystem;
	if(params.findNewCell) {
	    alert('You should not specify findNewCell when using a Cell ' +
                  'to construct a DropArea (it will be overloaded). ' +
		  'Consider using the DragAndDropSystem' +
		  'to create it instead.');
	}
	params.findNewCell = function(draggableObject) {
	    return that;;
	}
	this.dragAndDropSystem.dropAreas.push(createDropArea(params));
	return this.dragAndDropSystem.dropAreas[
	    this.dragAndDropSystem.dropAreas.length-1];
    };

    
/////////////////
// PERMISSIONS //
/////////////////

    this.canStartDrag = function(draggableObject) {
	return this.allowsStartDrag(draggableObject);
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
    
//////////////////
// INFORMATIONS //
//////////////////    
    
    this.hasLeft = function(draggableObject) {
	return true;
    };
    if(params.hasLeft) {
	this.hasLeft = params.hasLeft;
    }

/////////////
// ACTIONS //
/////////////

    // StartDrag
    this.runActionsBeforeStartDrag = function(draggableObject) {
	this.actionBeforeStartDrag(draggableObject);
    };
    if(params.runActionsBeforeStartDrag) {
	this.runActionsBeforeStartDrag = params.runActionsBeforeStartDrag;
    }

    this.actionBeforeStartDrag = function(draggableObject) {
    };
    if(params.actionBeforeStartDrag) {
	this.actionBeforeStartDrag = params.actionBeforeStartDrag;
    }

    // AfterDetached
    this.runActionsAfterDetached = function(draggableObject) {
	this.actionAfterDetached(draggableObject);
    };
    if(params.runActionsAfterDetached) {
	this.runActionsAfterDetached = params.runActionsAfterDetached;
    }

    this.actionAfterDetached = function(draggableObject) {
    };
    if(params.actionAfterDetached) {
	this.actionAfterDetached = params.actionAfterDetached;
    }

    // AfterDropped
    this.runActionsAfterDropped = function(draggableObject) {
	this.actionAfterDropped(draggableObject);
    };
    if(params.runActionsAfterDropped) {
	this.runActionsAfterDropped = params.runActionsAfterDropped;
    }

    this.actionAfterDropped = function(draggableObject) {
    };
    if(params.actionAfterDropped) {
	this.actionAfterDropped = params.actionAfterDropped;
    }

}

function createCell(params) {
    return new createCell_(params);
}

function createSourceCell(params_) {
    var params = createCopy(params_);
	
	// sourceComponent and center
	if(!params.sourceComponent) {
	    alert('sourceComponent should be specified in source cell creation');
	}
	if(!params.cx && !params.cy) {
	    alert('cx,cy (or component) should be specified in source cell creation'); 
	}
	params.centered = true;
	
	// production mode : TODO finalize
	if(!params.productionMode) {
		params.productionMode = 'beforeDestroyed';
	}
	
	
	var res = createCell(params);

	// create draggable
	if(params.productionMode == 'beforeDestroyed') {
		var curId = -1;
		res.createNewDraggable = function(compo) {
			curId++;
			return res.createDraggableObject({
				ident: (res.ident + '_prod_' + curId),
				component: params.sourceComponent.clone().placeAt(res.cx,res.cy),
				actionBeforeDestroyed: function() { 
					res.createNewDraggable(this.component); 
					console.log('new');
				}
			});
		}
	}
	
	res.createNewDraggable(params.sourceComponent);
	
	
	return res;
}















