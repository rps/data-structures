var makeTree = function(value, parent){
  var newTree = {
    children : [],
    parent : parent || null, 
    value : value || null 
  };
  extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {
  addChild : function(value){
    this.children.push(makeTree(value,this)); 
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
  },

  removeFromParent: function(){ 
    var parentChildren = this.parent.children;
    parentChildren.splice(parentChildren.indexOf(this),1);
    this.parent = null;
    return this;
  }

};

var extend = function(tree, treeMethods) {
  for (var keys in treeMethods){
    tree[keys] = treeMethods[keys];
  }
};
