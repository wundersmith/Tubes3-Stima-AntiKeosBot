from app.library.checker import *
from app.library.util import *

# # DONE: fixed processing error still add new object to taskList and increment availID
# # TODO: fitur2 masih pada belom kelar bro
# # * ini kalo mau nambah2in langsung kesini aja harusnya udah langsung bisa kepake di websitenya

def tambahTask(line, id, taskList):
    newTask = extractTaskFromLine(line, id)
    message = converTaskToMessage(newTask)
    
    if newTask != -1:
        taskList.append(newTask)
        return(message, id+1, taskList)
    else:
        return(message, id, taskList)

def daftarTask(line, taskList):
    message = ""
    for task in taskList:
        message += converTaskToMessage(task) + "\n"
    return message

def checkDeadline(line, taskList):
    line = removeWords(line, "kapan", "Kapan", "ya", "?", "Ya")
    
    (indexStart, indexEnd) = searchKeywords(line.lower(), "tugas")

# Ngereturn tupple of (message, availID, taskList)
def checkFitur(line, availID, taskList):
    if(searchKMP(line.lower(), "apa saja", "tampil") != -1):
        return (daftarTask(line, taskList), availID, taskList)
    elif(searchKMP(line.lower(), "kapan") != -1):
        return (checkDeadline(line, taskList), availID, taskList)
    else:
        return tambahTask(line, availID, taskList)
