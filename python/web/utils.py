import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint


def get_page(url: str) -> str:
    response = urllib.request.urlopen(url)
    html = response.read()  # 获取到页面的源代码
    page = html.decode('utf-8')
    return page

def artsci_course_test():
    data_file = open('as-course-list.txt', 'w')

    url = "https://fas.calendar.utoronto.ca/search-courses"
    course_codes = []
    for index in range(472):
        read_url = url
        if index > 0:
            url += '?page={}'.format(index)
        page = tt.get_page(url)
        soup = BeautifulSoup(page, 'html.parser')
        all_courses_raw = soup.table
        course_codes.extend([tr.td.a.string for tr in all_courses_raw.tbody.find_all('tr')])
    pprint(course_codes)

