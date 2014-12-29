var paper = Raphael(100,100,500,500);
paper.rect(0,0,500,500);

var DD = DragAndDropSystem(paper);

var myCell1 = DD.createCell({
    ident:'c1',
    component:component(350,350,
	[paper.rect(-50,-50,100,100).attr('fill','blue')],paper),
    centered:true,
    hasLeft: function(draggableObject) { return true; }    
});

var myCell2 = DD.createCell({
    ident:'c2',
    component:component(150,350,
	[paper.rect(-50,-50,100,100).attr('fill','yellow')],paper),
    centered:true,
    hasLeft: function(draggableObject) { return true; }    
});

var myDropBackground = DD.createDropArea({
    ident: 'back',
    doesContain: function(draggableObject) {
	return true;
    },
    actionOver: function(draggableObject) {
	console.log('over back');
    },
    actionEndOver: function(draggableObject) {
	console.log('end over back');
    },
    findNewCell: function(draggableObject) {
	return draggableObject.getLastCell();
    }
});

var myDrop1 = myCell1.createDropArea({
    ident: 'a1',
    doesContain: function(draggableObject) {
	var x = draggableObject.component.cx;
	var y = draggableObject.component.cy;
	return x >= 300 && x <= 400 && y >= 300 && y <= 400;
    },
    actionOver: function(draggableObject) {
	console.log('over a1');
    },
    actionEndOver: function(draggableObject) {
	console.log('end over a1');
    }
});

var myDrop2 = myCell2.createDropArea({
    ident: 'a2',
    doesContain: function(draggableObject) {
	var x = draggableObject.component.cx;
	var y = draggableObject.component.cy;
	return x >= 100 && x <= 200 && y >= 300 && y <= 400;
    },
    actionOver: function(draggableObject) {
	console.log('over a2');
    },
    actionEndOver: function(draggableObject) {
	console.log('end over a2');
    }
});

var draggable = myCell1.createDraggableObject({
    ident:'d1',
    component:component(20,20,
	[paper.rect(-10,-10,20,20).attr('fill','red')],paper)
});

