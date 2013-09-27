var makeBinarySearchTree = function(val, left, right, parent){
  var bst = {
    value: val || null,
    left : left || null,   // lower than value
    right : right || null, // higher than value
    parent : parent || null    
  };
  extend(bst,binarySearchTreeMethods);
  return bst;
};

var extend = function(to, from){
  for (var keys in from) {
    to[keys] = from[keys];
  }
};

var binarySearchTreeMethods = {};

binarySearchTreeMethods.insert = function(value){
  var newTree = makeBinarySearchTree(value, null, null, this);
  if(this.value > value){
    if(this.left === null){
      this.left = newTree;
    } else {
      this.left.insert(value)
    }
  } else if(this.value <= value){
    if(this.right === null){
      this.right = newTree;
    } else {
      this.right.insert(value);
    }
  }
};

binarySearchTreeMethods.contains = function(value){
  if (this.value === value){
    return true;
  } else if (this.value > value && this.left !== null) {
    return this.left.contains(value);
  } else if (this.value <= value && this.right !== null) {
    return this.right.contains(value);
  }

  return false;
};

binarySearchTreeMethods.depthFirstLog = function(callback){
  if(this.value){
    callback.call(this);
    if(this.left !== null){
      this.left.depthFirstLog(callback);
    }
    if(this.right !== null){    
      this.right.depthFirstLog(callback);
    }
  } 
};
