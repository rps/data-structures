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

binarySearchTreeMethods.contains = function(value, tree){
  var result = false;
  return result;
};

binarySearchTreeMethods.depthFirstLog = function(callback){

};

var head = makeBinarySearchTree(8);
head.insert(3);
head.insert(10);
head.insert(1);
head.insert(14);
head.insert(6);
head.insert(7);
head.insert(13);
head.insert(4);