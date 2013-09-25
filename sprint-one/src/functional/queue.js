var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  var position = 0;

  // Implement the methods below

  instance.enqueue = function(value){
    storage[size+position] = value;
    size++;
  };

  instance.dequeue = function(){
    if(size > 0) {
      size--;
      var temp = storage[position];
      delete storage[position];
      position++;
      return temp;
    } 
    return 0; 
  };

  instance.size = function(){
    return size;
  };

  return instance;
};
