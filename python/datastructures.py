class SinglyLinkedNode:
  def __init__(self, val):
    self.val = val
    self.next = None # A Node initially points to nothing

class DoublyLinkedNode:
  def __init__(self, val):
    self.val = val
    self.next = None
    self.prev = None

class LinkedList:
  def __init__(self):
    self.head = None

  def getSize(self):
    current = self.head
    count = 0

    while current:
      count += 1
      current = current.next

    return count

  def get(self, val):
    current = self.head

    while current:
      if current.val == val:
        return current
      else:
        current = current.next

      if current is None:
        return None

  def insertAtBeginning(self, val):
    newNode = SinglyLinkedNode(val)
    newNode.next = self.head
    self.head = newNode

  def insertAtEnd(self, val):
    newNode = SinglyLinkedNode(val)

    current = self.head
    
    while current:
      current = current.next

    current.next = newNode

  def delete(self, val):
    current = self.head

    if self.head.val == val:
      self.head = self.head.next