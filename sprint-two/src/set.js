var makeSet = function(){
  var set = Object.create(setPrototype); 
  set._storage = {};
  extend(set, setPrototype);
  return set;
};

var setPrototype = {};

setPrototype.add = function(input){ 
  var jsonInput = JSON.stringify(input);
  this._storage[jsonInput] = (jsonInput in this._storage) ? this._storage[jsonInput] : true;
};

setPrototype.contains = function(input){ 
  var jsonInput = JSON.stringify(input);
  return (jsonInput in this._storage) ? true : false;
};

setPrototype.remove = function(input){
  var jsonInput = JSON.stringify(input);
  delete this._storage[jsonInput];
};

var extend = function(to, from){
  for (var keys in from){
    to[keys] = from[keys];
  }
};