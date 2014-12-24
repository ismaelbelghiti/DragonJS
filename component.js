function _component(cx, cy, arrayElems, paper) {
    var that = this;
    this.cx = cx;
    this.cy = cy;
    this.elems = arrayElems;
    this.paper = paper;

    // add transparent rectangle on text bounding box
    this.nbEl = this.elems.length;
    for(var iEl = 0; iEl < this.nbEl; iEl++) {
	if(this.elems[iEl].type == 'text') {
	    var bb = this.elems[iEl].getBBox();
	    this.elems.push(paper.rect(bb.x,bb.y,bb.width,bb.height)
			    .attr('fill','red').attr('opacity',0));
	}
    }

    // save old transforms
    this.oldTransforms = new Array();
    for(var i = 0; i < this.elems.length; i++) {
	this.elems[i].toFront();
	this.oldTransforms[i] = this.elems[i].transform();
	this.elems[i].transform('t' + this.cx + ',' +
				this.cy + this.oldTransforms[i]);
    }

    this.placeAt = function(cx,cy) {
	this.cx = cx;
	this.cy = cy;

	for(var i = 0; i < this.elems.length; i++) {
	    this.elems[i].transform('t' + this.cx + ',' + this.cy +
				    this.oldTransforms[i]);
	}
	return this;
    };

    this.placeAtWithAnim = function(cx,cy,time) {
	this.cx = cx;
	this.cy = cy;
	var animation = function(i, time) {
	    return Raphael.animation({'transform' : 't' + that.cx + ',' +
		    that.cy + that.oldTransforms[i]}, time, '');
	};
	for(var i = 0; i < this.elems.length; i++) {
	    this.elems[i].animate(animation(i,time));
	}
	return this;		
    };

    this.move = function(dx,dy) {
	this.placeAt(this.cx+dx,this.cy+dy);
    };
    
    this.moveWithAnim = function(dx,dy,time) {
	this.placeAtWithAnim(this.cx+dx,this.cy+dy,time);
    };

    this.drag = function(moveDrag, startDrag, upDrag)  {
	this.startDrag = startDrag;
	this.moveDrag = moveDrag;
	this.upDrag = upDrag;

	for(var i = 0; i < this.elems.length; i++)
	    this.elems[i].drag(function(dx,dy){that.moveDrag(dx,dy);}, 
			       function(){that.startDrag();}, 
			       function(){that.upDrag();});
	return this;
    };

    this.clone = function() {
	var newArr = new Array();
	for(var i = 0; i < this.nbEl; i++) {
	    newArr[i] = this.elems[i].clone()
		.attr('transform',this.oldTransforms[i]);
	}
	return new _component(this.cx,this.cy,newArr,this.paper);	
    };

    this.remove = function() {
	for(var i = 0; i < this.elems.length; i++)	
	    this.elems[i].remove();		
    };

    this.toFront = function() {
	for(var i = 0; i < this.elems.length; i++) {
	    this.elems[i].toFront();
	}
    };
    
    this.show = function() {
	for(var i =0; i < this.nbEl; i++) {	
	    this.elems[i].attr('opacity','1');
	}
    };

    this.hide = function() {
	for(var i = 0; i < this.nbEl; i++) {
	    this.elems[i].attr('opacity','0');	
	}
    };
}

function component(cx, cy, arrayElems,paper) {
    return new _component(cx, cy, arrayElems,paper); 
}
