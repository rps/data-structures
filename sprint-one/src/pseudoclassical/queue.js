var Queue = function() {
  this.storage = {};
  this.len = 0;
  this.position = 0;
};

Queue.prototype.enqueue = function(value){
  this.storage[this.len+this.position] = value;
  this.len++;
};

Queue.prototype.dequeue = function(){
  if(this.len > 0) {
    this.len--;
    var temp = this.storage[this.position];
    delete this.storage[this.position];
    this.position++;
    return temp;
  } 
  return 0; 
};

Queue.prototype.size = function(){
  return this.len;
};
