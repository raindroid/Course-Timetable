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

if __name__ == '__main__':
    db = CourseDB('course')

    startTime = time.time()

    print('Start downloading course information StartTime:{}'.format(time.asctime( time.localtime(time.time()) )))
    # update engineering course to the mongodb
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/fall.html", db, 'courses',
                               save_year_course=True)
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/winter.html", db, 'courses',
                               save_year_course=False, drop_frist=False)
    download_artsci_table(db, 'courses', drop_frist=False)

    print(bcolors.OKGREEN + 'All download DONE!' + bcolors.ENDC)

    endTime = time.time()
    elapsed = endTime - startTime
    print('EndTime:{}\nTime Spend:{}s'.format(time.asctime( time.localtime(time.time()) ), elapsed))

    # data_file = open('../../data/samples/ENG.json', 'w')
    # for document in db.find_col('courses', {}):
    #     # pprint(document)
    #     data_file.write(str(document))
    #     break