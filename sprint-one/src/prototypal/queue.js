var makeQueue = function(){
  var instance = Object.create(queueMethods);
  instance.storage = {};
  instance.len = 0;
  instance.position = 0;
  return instance;
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

