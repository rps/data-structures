var makeRedBlackNode = function(val, left, right, parent, root){
  var rbt = {
    value: val || null,
    left : left || null,   // lower nodes
    right : right || null, // higher nodes
    parent : parent || null,
    color : 'red',
    root : root || false
  };
  if(root === true){
    rbt.color = 'black';
  }
  extend(rbt,nodeMethods);
  return rbt;
};

var extend = function(to, from){
  for (var keys in from) {
    to[keys] = from[keys];
  }
};

var nodeMethods = {};

nodeMethods.insert = function(value){
  var newNode = makeRedBlackNode(value, null, null, this);
  if(this.value > value){
    if(this.left === null){
      this.left = newNode;
    } else {
      this.left.insert(value);
    }
  } else if(this.value < value){
    if(this.right === null){
      this.right = newNode;
    } else {
      this.right.insert(value);
    }
  }
  newNode.validateNode();
};

nodeMethods.validateNode = function(){
  if(this.root === true){
    this.color = 'black';
    return;
  }

  // uncle check + blackness push
  if(this.parent !== null && this.parent.parent !== null){
    var uncle = this.parent.parent[(this.checkSide(true))];
    if(uncle !== null){
      this.colorShift(uncle);
    } 
    //debugger;
  // redness: parent and node opposite
    if (this.parent.checkSide() !== this.checkSide() 
        && this.parent.color === 'red' && this.color === 'red'){
      this.oppositeShift();
    }    
  }
  
  // redness: parent and node same
  if (this.color === 'red' && this.parent.color === 'red'){
    this.sameShift();
  }

}

nodeMethods.colorShift = function(uncle){
  if(this.parent.color === 'red' && uncle.color === 'red' ){
    //parent
    this.parent.color === 'black';
    //uncle
    uncle.color === 'black';
    //grandparent
    if(this.parent.parent.root !== true){
      this.parent.parent.color === 'red';
    }
    //recurse
    this.parent.parent.validateNode();
  }
}

nodeMethods.oppositeShift = function(){
  // switch parent and node, then validate on old parent
  var parentIsRoot = this.parent.root;
  var parentSide = this.parent.checkSide();
  this.parent.parent[parentSide] = this;
  this[parentSide] = this.parent;
  this.parent = this.parent.parent;
  this.parent.parent = this;
  this.root = parentIsRoot;
  this[parentSide].validateNode();
}

  // save parent's child on the opposite side of node to a temp var
  // GP becomes child of parent on opposite side of node
  // temp var becomes child of GP on the same side as the node
  // GPs parent = parent
  // Switch colors of parent & GP

  // 1. GP's parent = parent
  // 2. Parents branch = GP
  // 3. GP's oldparent branch = parent's old branch
  // 4. branch's parent = GP

nodeMethods.sameShift = function(){
  // var par = this.parent;
  var grandParentIsRoot = this.parent.parent.root;
  var temp = this.parent[this.checkSide(true)];
  this.parent[this.checkSide(true)] = this.parent.parent; // 2
  this.parent.parent[this.checkSide()] = temp; // 3
  debugger;
  if(grandParentIsRoot){
      this.parent.parent = null;
    } else {
      this.parent.parent = this.parent.parent.parent;
    }  
  //this.parent.parent.parent = this.parent; // 1

  this.parent[this.checkSide(true)].parent = this.parent;
  //debugger; //4
  this.parent.swapColor();
  this.parent[this.checkSide(true)].swapColor();
  //this.parent.parent.parent[this.parent.parent.checkSide()] = this.parent; // 2
  this.parent.root = grandParentIsRoot;
  this.parent.validateNode();
}

nodeMethods.swapColor = function(){
  if (this.color === 'red') {
    this.color = 'black';
  } else if (this.color === 'black'){
    this.color = 'red';
  }
}

nodeMethods.checkSide = function(reverseBool){
  var result; // right = true, left = false
  reverseBool = reverseBool || false;
  if (this.parent.right === this){
    result = true;
  } else if (this.parent.left === this){
    result = false;
  }
  return reverseBool ? (!result ? 'right' : 'left') : (result ? 'right' : 'left');
}

var m = makeRedBlackNode(50,null,null,null,true);
m.insert(75);
m.insert(80);