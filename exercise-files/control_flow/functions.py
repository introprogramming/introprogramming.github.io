#!/bin/python
# import statement. to access code and functions located in other files.
import random


def my_function():
	""" functon with no parameters, only a return value. """
	return 42

def boolean_function(bool_variable):
	""" function with one parameter which is used to determine what to return """
	if bool_variable:
		return "The boolean variable is True"
	else:
		return "The boolean variable is False"

def print_my_coords(x = 0, y = 0):
	""" function with 2 parameters and no return
	it also have default values if one or the other parameter were not to be used"""
	print("Coords (%d;%d)" % (x,y))


print("my_function returns: %d" % my_function())
print("boolean_function returns: %r" % boolean_function(True))
print("boolean_function returns: %r" % boolean_function(False))

print_my_coords(2, 5)
print_my_coords(2)
print_my_coords(y=5)
print_my_coords()
