var makeBinarySearchTree = function(val, left, right, parent, level){
  var bst = {
    value: val || null,
    left : left || null,   // lower than value
    right : right || null, // higher than value
    parent : parent || null,
    level: level || 0    
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

binarySearchTreeMethods.insert = function(value, level){
  level = level || 0;
  var newTree = makeBinarySearchTree(value, null, null, this, level);
  if(this.value > value){
    level++;
    if(this.left === null){
      this.level = level;
      this.left = newTree;
    } else {
      this.left.insert(value, level);
    }
  } else if(this.value < value){
    level++;
    if(this.right === null){
      this.level = level;
      this.right = newTree;
    } else {
      this.right.insert(value, level);
    }
  }
};

binarySearchTreeMethods.contains = function(value){
  if (this.value === value){
    return true;
  } else if (this.value > value && this.left !== null) {
    return this.left.contains(value);
  } else if (this.value < value && this.right !== null) {
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

// binarySearchTreeMethods.breadthFirstLog = function(){
//   var level = 0;
//   var result = [this.value];

//     result.push(this.left);
//     result.push(this.right);
//     level++;

// }

var m = makeBinarySearchTree(8);
m.insert(3);
m.insert(10);
m.insert(1);
m.insert(6);
m.insert(4);
m.insert(7);
m.insert(14);
// m.depthFirstLog(function(){console.log(this.value)});


