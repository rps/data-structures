var Stack = function() {
  this.storage = {};
  this.len = 0;
};

Stack.prototype.push = function(value){
  this.storage[this.len] = value;
  this.len++;
};

Stack.prototype.pop = function(){
  if(this.len > 0){
    var popped = this.storage[this.len-1];
    delete this.storage[this.len];
    this.len--;
    return popped;
  }
  return 0;
};

Stack.prototype.size = function(){
  return this.len;
};
