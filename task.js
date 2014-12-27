var paper = Raphael(100,100,500,300);
paper.rect(0,0,300,300);

var DD = DragAndDropSystem(paper);
var myCell = DD.createCell({ident:'c'});
myCell.hasLeft = function(draggableObjet) {return true;}

var arrayElems = [ paper.rect(-10,-10,20,20).attr('fill','red') ];
var draggable = myCell.createDraggableObject({
    ident:'dr',
    component:component(20,20,arrayElems,paper)
});

