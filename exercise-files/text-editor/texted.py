import Tkinter as Tk
import tkFileDialog


# Text Editor Skeleton

def on_new():
    # reset path and delete all text in the text box
    print "Not implemented"


def on_open():
    # let user choose what file to open from a dialog (tkFileDialog)
    # replace text in text box with text from file
    # handle cancelling of the dialog responsibely
    print "Not implemented"


def on_save():
    # mimic common "save" behavior
    # if the path is already set, save the file using save_file(), otherwise:
    # let user choose a file to save the content in the text box to (tkFileDialog)
    # make sure the path is valid (not empty), save the file using save_file()
    print "Not implemented"


def on_save_as():
    # mimic common "save as" behavior
    # almost the same as on_save(), difference: this always opens a file dialog
    print "Not implemented"


def get_all_text():
    # returns all text in the text box
    # should be one line of code
    # not neccessary but may make the code in other places nicer
    print "Not implemented"


def delete_all_text():
    # deletes all text in the text box
    # should be one line of code
    # not neccessary but may make the code in other places nicer
    print "Not implemented"


def save_file(save_path, text):
    # open file in save_path in write mode
    # write the text to the file
    # close the file
    print "Not implemented"


def read_file(file_path):
    # open file in file_path
    # return the text
    print "Not implemented"


# Initialize application
app = Tk.Tk()
app.title("Your Title Here")
# Sets the geometry on the form widthxheight+x_pos+y_pos
app.geometry("200x300+300+300")

# Save path, empty until file is opened or saved
# Used to mimic common file saving/opening behavior
path = ''

######################################################
# IMPLEMENT UI HERE
######################################################

# MENU BAR EXAMPLE
menu_bar = Tk.Menu()
# Set menu bar as menu for the app
app.config(menu=menu_bar)
# Fill menubar with "File" menu
filemenu = Tk.Menu(menu_bar, tearoff=0)
filemenu.add_command(label="Exit", command=quit)
menu_bar.add_cascade(label="File", menu=filemenu)

# BUTTON EXAMPLE
button = Tk.Button(app, text="Exit", command=quit)
button.pack(side=Tk.BOTTOM, fill=Tk.X)


######################################################

# Start the main event loop (i.e. run the tkinter program)
app.mainloop()
