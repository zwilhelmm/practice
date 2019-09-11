# -*- coding: utf -8 -*-

# Write a function which the input is a string, the return is the number of capital letters in that string.
def getCapitalLetters(sequence):

  numberOfCapitalLetters = 0

  for letter in sequence:
    if letter.isupper():
      numberOfCapitalLetters = numberOfCapitalLetters + 1

  return numberOfCapitalLetters

# Implement using map, and without using isupper().

def getCapitalLettersTest():
  tests = ['hello', 'hello!', 'Hello!', 'HELLO', 'hellO']
  for test in tests:
    print('Outcomes: ', getCapitalLetters(test))
  return 0
  
# Returns the nth number in the Fibonacci sequence.
def getFibonacciSequenceRecursive(n):
  # Identify the base case.
  if (n <= 1):
    return n
  # Identify the inductive step.
  else:
    return getFibonacciSequenceRecursive(n - 1) + getFibonacciSequenceRecursive(n - 2)

def getFibonacciSequenceIterative(n):
  prev = 1
  current = 1

  for i in range(n):
    current = current + prev

    prev = current
    current = prev
    print(current)


def nthFibonacciNumberRecursiveTest():

  # Sequence: 1 1 2 3 5 8 13
  print('=== Iterative tests.')
  print(getFibonacciSequenceIterative(5))

  print('=== Recursive tests.')
  print('Input: 0, Expected: 0')
  if (getFibonacciSequenceRecursive(0) == 0):
    print('PASS')

  print('Input: 1, Expected: 1')
  if (getFibonacciSequenceRecursive(1) == 1):
    print('PASS')

  print('Input: 3, Expected: 2')
  if (getFibonacciSequenceRecursive(3) == 2):
    print('PASS')

  print('Input: 5, Expected: 5')
  if (getFibonacciSequenceRecursive(5) == 5):
    print('PASS')

  return 0

nthFibonacciNumberRecursiveTest()