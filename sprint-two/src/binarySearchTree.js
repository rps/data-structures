var makeBinarySearchTree = function(val, left, right, parent){
  var bst = {
    value: val || null,
    left : left || null,   // lower than value
    right : right || null, // higher than value
    parent : parent || null,
    level: 0    
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
      newTree.level = this.level+1;
      this.left = newTree;
    } else {
      this.left.insert(value);
    }
  } else if(this.value < value){
    if(this.right === null){
      newTree.level = this.level+1;
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
  } else if (this.value < value && this.right !== null) {
    return this.right.contains(value);
  }

  return false;
};

binarySearchTreeMethods.depthFirstLog = function(callback, context){
  context = context || this;
  if(context.value){
    callback.call(context);
    if(context.left !== null){
      context.left.depthFirstLog(callback);
    }
    if(context.right !== null){    
      context.right.depthFirstLog(callback);
    }
  } 
};

binarySearchTreeMethods.breadthFirstLog = function(){
  var results = {};
  this.depthFirstLog(function(){
    results[this.value] = this.level;
  });
  var maxDepth = 0;
  var ret = [];
  for (var key in results) {
    if (results[key] > maxDepth){
      maxDepth = results[key];
    }
  }
  for (var i = 0; i <= maxDepth; i++){
    for (var key2 in results) {
      if (results[key2] === i){
        ret.push(key2);
      }
    }
  }
  return ret;
}

binarySearchTreeMethods.measure = function(){
  var nodeValue = this.value;
  var childlessNodes = [];
  var leftCount = 0;
  var rightCount = 0;
  this.depthFirstLog(function(){
    if (this.left === null && this.right === null){
      childlessNodes.push(this.level);
    }
    if (this.value < nodeValue){
      leftCount++;
    } else if (this.value > nodeValue){
      rightCount++;
    }
  });
  childlessNodes.sort(function(a,b){return a - b;});
  var minDepth = childlessNodes[0];
  var maxDepth = childlessNodes[childlessNodes.length-1];

  var targetNode, parentNode;

  if (minDepth * 2 < maxDepth) {
    this.rebalance(leftCount,rightCount);
  }
}

binarySearchTreeMethods.rebalance = function(leftCount,rightCount){
  if (leftCount > rightCount){
      targetNode = this.left;
      this.left = null;
    } else if (rightCount > leftCount){
      targetNode = this.right;
      this.right = null;
    }
    targetNode.depthFirstLog(function(){
      this.level--;
    });

    parentNode = targetNode.parent;
    targetNode.parent = null;

    parentNode.depthFirstLog(function(){
      targetNode.insert(this.value);
    });

    console.log(targetNode);

    this.value = targetNode.value;
    this.left = targetNode.left;
    this.right = targetNode.right;
    this.parent = targetNode.parent;
    this.level = targetNode.level;
    this.left.depthFirstLog(function(){
      delete this;
    });
    this.right.depthFirstLog(function(){
      delete this;
    });

    targetNode.depthFirstLog(function(){
      this.insert(this.value); // first this = this, second = targetnode
    },this);
}

// var m = makeBinarySearchTree(30);
// m.insert(15);
// m.insert(75);
// m.insert(80);
// m.insert(21);
// m.insert(9);
// m.insert(4);
// m.insert(3);
// m.insert(1);
// m.measure();