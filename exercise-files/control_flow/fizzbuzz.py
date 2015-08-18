#!/bin/python
# This is a program called fizzbuzz. It is often used to test basic programming capabilities.
# The specification is as follows:

# For numbers 1 through 100,

#   if the number is divisible by 3 print Fizz;
#   if the number is divisible by 5 print Buzz;
#   if the number is divisible by 3 and 5 (15) print FizzBuzz;
#   else, print the number.

for i in range(100):
    if i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    elif i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    else:
        print(i)
