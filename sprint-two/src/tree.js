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
  },


  traverse: function(callback){
    callback.call(this);
    for (var i = 0; i < this.children.length; i++){
      this.children[i].traverse(callback);     
    }
  }

};

var extend = function(tree, treeMethods) {
  for (var keys in treeMethods){
    tree[keys] = treeMethods[keys];
  }
};

var tree = makeTree(5);
tree.addChild(10);
tree.addChild(15);
tree.children[0].addChild(20);
tree.traverse(function(){ 
  this.value += 1;
});
