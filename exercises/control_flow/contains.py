#!/bin/python


def contains(list, e):
    """ determines whether e is contained in the list """
    for elem in list:
        if elem == e:
            return True
    return False


integer_list = [0,1,2,3]

print("")
print("Does the list contain 3?: %r" % contains(integer_list, 3))
print("Does the list contain 5?: %r" % contains(integer_list, 5))
print("")

list1 = [1,2,3,4]
list2 = [1,2,3,4,5,6,7]
list3 = [1,2,3,5]


# Create a function which determines whether a list is contained in another list.
# Some tips:
# - use the contains function defined above in your function.
# - you want to check if each element in the sublist is contained in the list
# - you can use boolean arithmetics, short example in boolean_arithmetic.py


def sublist_contains(list, sublist):
    # your code here
    return None
	




print("")
print("Expected True,  Actual %r" % sublist_contains(list2, list1))
print("Expected False, Actual %r" % sublist_contains(list3, list1))
print("Expected True,  Actual %r" % sublist_contains(list1, list1))
print("")

