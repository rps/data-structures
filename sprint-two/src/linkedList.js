// Note: don't use an array to do this.
var makeLinkedList = function(h, t){
  var list = {
    head : makeNode(h),
    tail : makeNode(t) 
  };
  list.head.next = list.tail;
  list.tail.previous = list.head;

  list.addToTail = function(val){
    var last = makeNode(val);
    last.previous = list.tail;
    list.tail.next = last;
    list.tail = last;
  };

  list.addToHead = function(headNum){
    var first = makeNode(headNum, this.head);
    this.head = first;
    this.head.next.previous = this.head;
  }

  list.removeHead = function(){
    var result = list.head.value;
    var buffer = list.head.next;
    delete list.head;
    list.head = buffer;
    list.head.previous = null;
    return result;
  };

  list.contains = function(node, lookup){
    if (node.value === lookup){
      return true;
    } else if (node.next !== null){
      return list.contains(node.next, lookup);  
    } else {
      return false;
    }
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = arguments[1] || null;
  node.previous = arguments[2] || null;

  return node;
};

var x = makeLinkedList(5,10)
console.log(x)