from types import coroutine
from typing import Text
import requests
import json
from bs4 import BeautifulSoup
import os

link = "http://bulletin.iit.edu/courses/"
domain = "http://bulletin.iit.edu"
result  = requests.get(link)

print(result.status_code)

src = result.content
soup = BeautifulSoup(src, features="html.parser")

##helper function
def get_class_code(class_name):
    start_idx = class_name.index('(')
    return class_name[start_idx+1:len(class_name)-1]


idx = soup.find("div", {"id":"atozindex"})
dpts = idx.find_all('a', href=True)
dpt_endpoints={}
for dpt in dpts:
    dpt_endpoints.update({get_class_code(dpt.text):dpt['href']})
#print(dpt_endpoint)

#print(dpt_endpoints)

'''
we got all the departments and the endpoints to their course catalogs.
now, to store the courses themselves
create another dictonary, where keys are dpt names and vals are the course numbers. 
this is the dictonary representation of the JSON object that will be used in app itself

departments is a dictonary whos keys are department codes and whos values is a dictonary. 
this second dictonary's keys are all classes taught by that department and its values is another dictonary
this third dictonary is all of the details for that class, its name, description, prerequisites, corequisites, credits

{department : {Classes:{class details : someString}}}
'''

departments_dict = {
    "AS":"Air Force Aerospace Studies",
    "AURB":"Architecture and Urbanism",
    "ARCH":"Architecture",
    "AAH":"Art and Architectural History",
    "BIOL":"Biology",   
    "BME": "Biomedical Engineering",
    "BUS":"Business",
    "CHE": "Chemical Engineering",
    "CHEM" :"Chemistry",
    "CAE" : "Civil and Architectural Engr",
    "COM" :"Communications",
    "CS" : "Computer Science",
    "CSP" : "Computer Science Prof Master",
    "ECON" : "Economics",
    "ECE": "Electrical and Computer Engr",
    "EG": "Engineering Graphics",
    "EMGT":"Engineering Management", 
    "ENVE":"Environmental Engineering",
    "EMS":"Environmental Management and Sustainability",
    "FMC":"Financial Markets Compliance",
    "FDSN":"Food Science and Nutrition",
    "ENGR":"General Engineering",
    "HIST":"History",
    "HUM":"Humanities",
    "INTM":"Industrial Tech and Mgmt",
    "ITM":"Information Tech and Mgmt",
    "ID":"Institute of Design",
    "IDN":"Institute of Design",
    "IDX":"Institute of Design",
    "IPMM":"Intellectual Prop Mgt and Mkts",
    "IPRO":"Interprofessional Project",
    "ITMD":"ITM Development",
    "ITMM":"ITM Management",
    "ITMO":"ITM Operations",
    "ITMS":"ITM Security",
    "ITMT":"ITM Theory and Technology",
    "LA":"Landscape Architecture",
    "LCHS":"Lewis College",
    "LIT":"Literature",
    "MSC":"Management Science",
    "MAX":"Marketing Analytics",
    "MSF":"Master of Science in Finance",
    "MS":"Materials Science",
    "MSED":"Mathematics and Science Educ",
    "MATH":"Mathematics",
    "MBA":"MBA Business",
    "MMAE":"Mechl, Mtrls and Arspc Engrg",
    "MILS":"Military Science",
    "NS":"Naval Science",
    "PHIL":"Philosophy",
    "PHYS":"Physics",
    "PS":"Political Science",
    "PSYC":"Psychology",
    "PA":"Public Administration",
    "SCI":"Science",
    "SSCI": "Social Sciences",
    "SOC":"Sociology",
    "SSB":"Stuart School of Business",
    "SMGT":"Sustainability Management",
    "TECH":"Technology"
}
def getDept(classCode):
    start_idx = classCode.index(" ")
    return classCode[:start_idx]

classes=[]

suffix=""
my_json_obj = {}

dummy = {"CS":"/courses/cs/"}

## todo: replace dummy with dpt endpoints 
'''
for dpt in dummy: 
    suffix = dummy.get(dpt)
    goto = domain+suffix

    result = requests.get(goto)
    print(result.status_code)
    src = result.content
    soup = BeautifulSoup(src, features="html.parser")
'''

#print(courseblocks)


#code = courseblocks[0].find("div", {"class":"noindent coursecode"})
#print(code.text)
#s = code.text
#for dpt in dpt_endpoints:
#    print(dpt)
#    print(type(dpt))


for dpt in dpt_endpoints:

    suffix = dpt_endpoints.get(dpt)
    goto = domain+suffix
    print(goto)

    result = requests.get(goto)
    print(result.status_code)

    src = result.content
    soup = BeautifulSoup(src, features="html.parser")
    courseblocks = soup.find_all("div", {"class":"courseblock"})
    for courseblock in courseblocks:
        thing = {}
        fields = {}

        code = courseblock.find("div", {"class":"noindent coursecode"})
        codestring = code.text.replace(u'\xa0', u' ')
        department = departments_dict[getDept(codestring)]
        title = courseblock.find("div", {"class":"noindent coursetitle"})
        desc = courseblock.find("div", {"class":"courseblockdesc"})
        creds = courseblock.find("div", {"class":"noindent courseblockattr hours"})
        prereqs = courseblock.find("div", {"class":"noindent courseblockattr"})

        fields.update({"courseCode":codestring})
        fields.update({"department":department})
        fields.update({"courseTitle":title.text.replace(u'\xa0', u' ')})
        fields.update({"courseDesc":desc.text.replace(u'\xa0', u' ')})
        fields.update({"courseCreds":title.text.replace(u'\xa0', u' ')})
        if(prereqs != None and "Prerequisite(s)" in prereqs.text):
            fields.update({"coursePrereqs":prereqs.text.replace(u'\xa0', u' ')})
        else:
            fields.update({"coursePrereqs":"No Prerequisites"})

        thing.update({"model":"api.Classes"})
        thing.update({"fields":fields})
        classes.append(thing)


#filename = os.path.join (os.getcwd(), "..", "CS_dpt.json")
with open("CS_dpt.json", "w") as outfile:
    json.dump(classes, outfile,indent=4)


#json.dumps(parsed, indent=4, sort_keys=True))c


#print(prereqs.text)


#thing.find("span")

#print(thing.text)
#for block in content:
    