import urllib.request
from typing import List
import re
from bs4 import BeautifulSoup
from pprint import pprint

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def get_page(url: str, timeOutTimes: int = 20) -> str:
    while timeOutTimes:
        timeOutTimes -= 1
        try:
            response = urllib.request.urlopen(url)
            html = response.read()  # 获取到页面的源代码
            page = html.decode('utf-8')

            return page
        except:
            print('Failed to connect ' + url)
    return ''

def artsci_course_test():
    data_file = open('as-course-list.txt', 'w')

    url = "https://fas.calendar.utoronto.ca/search-courses"
    course_codes = []
    for index in range(472):
        read_url = url
        if index > 0:
            url += '?page={}'.format(index)
        page = get_page(url)
        soup = BeautifulSoup(page, 'html.parser')
        all_courses_raw = soup.table
        course_codes.extend([tr.td.a.string for tr in all_courses_raw.tbody.find_all('tr')])
    pprint(course_codes)

def change_keys(orig: dict, replacement: dict, updateAll: bool = True):
    orig_copy = orig.copy()
    dest = {}
    for old, new in replacement.items():
        if old in orig_copy:
            value = orig_copy.pop(old)
            dest.update({new: value})
    if updateAll:
        dest.update(orig_copy)

    return dest

def parse_day(day: str) -> int:
    """
    >>> parse_day('MO')
    1

    >>> parse_day('Fri')
    5

    :param day:
    :return:
    """
    day_names = {
        'mo': 1,
        'tu': 2,
        'we': 3,
        'th': 4,
        'fr': 5,
        'sa': 6,
        'su': 7
    }

    day_code = day[:2].lower()
    if day_code not in day_names:
        return 0
    else:
        return day_names[day_code]