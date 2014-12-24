var paper = Raphael(100,100,500,500);
paper.rect(0,0,500,500);

var arrayElems = [ paper.rect(-10,-10,20,20).attr('fill','red') ];
var compo = component(20,20,arrayElems,paper);

var DD = DragAndDropSystem(paper);
var myCell = createCell('c', DD);

myCell.hasLeft = function(draggableObjet) {return true;}

var draggable = createDraggableObject_('dr', myCell, compo);

