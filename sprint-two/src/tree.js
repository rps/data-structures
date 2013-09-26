var makeTree = function(value){
  var newTree = {
    children : [],
    // parent : null, // for extra credit later
    value : value || null 
  };
  extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {
  addChild : function(value){
    this.children.push(makeTree(value)); 
  },

  contains : function(value){
    if (this.value === value){
      return true;
    } else {
      for (var i = 0; i < this.children.length; i++){
        if (this.children[i].contains(value)){
          return true;
        }
      }
      return false;
    } 
  }
};
  //return isThisIt? || _.any(children, isThisit?)

  // removeFromParent: function(){ // for extra credit later
var extend = function(tree, treeMethods) {
  for (var keys in treeMethods){
    tree[keys] = treeMethods[keys];
  }
};

// var newtree = makeTree(5);
// newtree.addChild(10);
// newtree.addChild('x');
// debugger;
// newtree.contains('x');

