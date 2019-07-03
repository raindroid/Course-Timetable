import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint
from web.eng_course_finder import *


if __name__ == '__main__':
    db = CourseDB('course')
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/fall.html", db, 'eng2019fall',
                               'eng20192020year')
    download_engineering_table("https://portal.engineering.utoronto.ca/sites/timetable/winter.html", db, 'eng2019winter')
