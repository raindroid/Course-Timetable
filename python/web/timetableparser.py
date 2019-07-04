import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint, pformat
import json
from web.eng_course_finder import *


if __name__ == '__main__':
    db = CourseDB('course')

    # update engineering course to the mongodb
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/fall.html", db, 'courses',
                               save_year_course=True)
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/winter.html", db, 'courses',
                               drop_frist=False)

    # data_file = open('../../data/samples/ENG.json', 'w')
    # for document in db.find_col('courses', {}):
    #     # pprint(document)
    #     data_file.write(str(document))
    #     break