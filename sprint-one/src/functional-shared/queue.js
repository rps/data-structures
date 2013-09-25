var makeQueue = function(){
  var instance = {
    storage: {},
    len: 0,
    position: 0
  };
  extend(instance,queueMethods);
  return instance;
};

var extend = function(to,from){
  for(var keys in from){
    to[keys] = from[keys];
  }
};

var queueMethods = {

  enqueue : function(value){
    this.storage[this.len+this.position] = value;
    this.len++;
  },

  dequeue : function(){
    if(this.len > 0) {
      this.len--;
      var temp = this.storage[this.position];
      delete this.storage[this.position];
      this.position++;
      return temp;
    } 
    return 0; 
  },

  size : function(){
    return this.len;
  }

};

