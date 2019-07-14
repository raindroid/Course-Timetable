import urllib.request
from typing import List
import re
from courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint, pformat
import json
from eng_course_finder import *
from artsci_course_finder import *
from utils import bcolors
import time
from datetime import datetime

def updateDB(db: CourseDB):
    startTime = time.time()

    print('Start downloading course information StartTime:{}'.format(time.asctime( time.localtime(time.time()) )))
    # update engineering course to the mongodb fall term and year courses
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/fall.html", db, 'courses',
                               save_year_course=True)
    # update engineering course to the mongodb winter term
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/winter.html", db, 'courses',
                               save_year_course=False, drop_frist=False)
    # update artsci course to the mongodb
    download_artsci_table(db, 'courses', drop_frist=False)

    # update engineering course detail
    excep = get_enginneering_exception_dict()
    download_engineering_course_description(
        'https://portal.engineering.utoronto.ca/sites/calendars/current/Course_Descriptions.html', db, 'courses', excep)

    print(bcolors.OKGREEN + 'All download DONE!' + bcolors.ENDC)

    endTime = time.time()
    elapsed = endTime - startTime
    print('EndTime:{}\nTime Spend:{}s'.format(time.asctime( time.localtime(time.time()) ), elapsed))

def updateTime(db: CourseDB):
    db.getCol('update').update({'time': {'$regex': '.*'}}, {'$set': {'time': datetime.utcnow().isoformat()}}, upsert = True)

if __name__ == '__main__':
    
    db = CourseDB('course')
    updateDB(db)
    updateTime(db)