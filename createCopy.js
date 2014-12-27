 var createCopy = function(toBeCopied) {
    var copyConst = function() {};
    copyConst.prototype = toBeCopied;
    return new copyConst();
};

