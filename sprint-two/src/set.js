var makeSet = function(){
  var set = Object.create(setPrototype); 
  set._storage = {};
  extend(set, setPrototype);
  return set;
};

var setPrototype = {};

setPrototype.add = function(input){ 
  this._storage[input] = (input in this._storage) ? this._storage[input] : true;
};

setPrototype.contains = function(input){ 
  return (input in this._storage) ? true : false;
};

setPrototype.remove = function(input){
  delete this._storage[input];
};

var extend = function(to, from){
  for (var keys in from){
    to[keys] = from[keys];
  }
};