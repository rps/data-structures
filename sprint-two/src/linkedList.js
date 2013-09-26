// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {
    head : makeNode(12), //labels
    tail : makeNode(26)  //labels
  };
  list.head.next = list.tail;

  list.addToTail = function(val){
    var last = makeNode(val);
    list.tail.next = last;
    list.tail = last;
  };

  list.removeHead = function(){
    var result = list.head.value;
    var buffer = list.head.next;
    delete list.head;
    list.head = buffer;
    return result;
  };

  list.contains = function(){
    
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
var m = makeLinkedList();
console.log(m)