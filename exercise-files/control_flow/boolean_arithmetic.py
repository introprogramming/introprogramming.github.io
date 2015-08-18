#!/bin/python

# boolean operators are not, and, or

print("not True:       %r" % (not True))
print("True and True:  %r" % (True and True))
print("True and False: %r" % (True and False))
print("True or False:  %r" % (True or False))
print("False or False: %r" % (False and False))
print("")

# Assignment
boolean_variable = True

# You can reassign a variable
boolean_variable = False
boolean_variable = boolean_variable or True

# Usage in if-else-statement
if boolean_variable:
	print("boolean_variable is True")
else:
	print("boolean_variable is False")
