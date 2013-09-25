var extend = function(to, from){
  for (var key in from){
    to[key] = from[key];
  }
};

var makeStack = function() {

  var instance = {
    storage: {},
    len: 0
  };
  extend(instance, stackMethods);
  return instance;
};

var stackMethods = {
  push: function(value){
    this.storage[this.len] = value;
    this.len++;
  },

  pop: function(){
    if(this.len > 0){
      var popped = this.storage[this.len-1];
      delete this.storage[this.len];
      this.len--;
      return popped;
    }
    return 0;
  },

  size: function(){
    return this.len;
  }

};



