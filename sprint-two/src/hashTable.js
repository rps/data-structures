var HashTable = function(){
  this._size = 0;
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v, storeLocation){

  storeLocation = storeLocation || this._storage;

  var i = getIndexBelowMaxForKey(k, this._limit); // (str, max)
  var inserted = {};
  inserted[k] = v;
  if (storeLocation.get(i) !== undefined){ //has a key already
    var found = storeLocation.get(i);
    found[k] = v;
    storeLocation.set(i, found);
  } else {
    storeLocation.set(i, inserted);
    this._size++; // increment size if an array spot gets filled
  }
  
  if(this._size / this._limit > 0.75){
    this._limit *= 2;
    this.resize(this._limit);
  } 

};



  // later increase size of hashtable

  // if(this._storage.get(i) !== undefined) {
  //   var oldVal = this._storage.get(k);
  //   var obj = {};
  //   obj[oldVal] = k;
  //   obj[v] = true;
  //   this._storage.set(i,obj);
  // } else {
  //   this._storage.set(i, v);
  // }
  // var num = 0;
  // this._storage.each(function(value){
  //   if(value !== undefined){
  //     num++;
  //   }
  // });
  // if(num / this._limit > 0.75){
  //   //this._limit *= 2;
  //   debugger;
  //   var this._newStorage = makeLimitedArray(this._limit*2);
  //   this._storage.each(function(v, k){
  //     var result = this._storage.retrieve(k); 
  //     this._newStorage.set(getIndexBelowMaxForKey(k, this._limit),result); //index, value
  //   });
  // }
// when getting, provide K to _.storage GET function. THEN if Object,
// use K to determine what to return

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var found = this._storage.get(i);
  for (var keys in found){
    if (found[keys] = k) return found[keys];
  }
  return undefined;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var found = this._storage.get(i);
  delete found[k];
  this._storage.set(i,found);
  this._size--;
  if (this._size / this._limit < 0.25){
    this._limit /= 2;
    this.resize(this._limit);
  }
};

HashTable.prototype.resize = function(size){

  var newStorage = makeLimitedArray(size);
  var self = this;
  this._storage.each(function(value,key){
    if(value !== undefined){
      debugger;
      self.insert(key,value,newStorage)
    }
  });
  this._storage = newStorage;
};


// use each to count non-undefined values in storage vs storage size (limit?)
// if non-undefined / limit > .75, then each from end of storage array to fill 
// with undefined


// NOTE: For this code to work, you will NEED the code from hashTableHelpers.js
// Start by loading those files up and playing with the functions it provides.
// You don't need to understand how they work, only their interface is important to you

/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */


// This class represents an array with limited functionality and a maximum size.
// It will ensure that you don't accidentally try to use up too much space.
//
// Usage:
//   limitedArray.set(3, 'hi');
//   limitedArray.get(3); // returns 'hi'

var makeLimitedArray = function(limit){
  var storage = []; //private storage that only limitedArray has access to

  var limitedArray = {};
  limitedArray.get = function(index){
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function(index, value){
    checkLimit(index);
    storage[index] = value;
  };
  limitedArray.each = function(callback){
    for(var i = 0; i < storage.length; i++){
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function(index){
    if(typeof index !== 'number'){ throw new Error('setter requires a numeric index for its first argument'); }
    if(limit <= index){ throw new Error('Error trying to access an over-the-limit index'); }
  };

  return limitedArray;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
