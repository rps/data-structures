var makeStack = function() {
  var instance = Object.create(stackMethods);
  instance.storage = {};
  instance.len = 0;
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
