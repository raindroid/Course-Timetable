import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint, pformat
from web.utils import get_page
import json

def artsci_course_test():
    data_file = open('as-course-list.txt', 'w')

    url = "https://fas.calendar.utoronto.ca/search-courses"
    page = get_page(url)
    total_page = int(re.findall('1 of (\d+)', page)[0])
    total_page = 472 if total_page == 0 else total_page

    pprint('[artsci] Total total_page: {}'.format(total_page))
    course_codes = []

    for index in range(total_page):
        read_url = url
        if index > 0:
            read_url += '?page={}'.format(index)
            page = get_page(read_url)
        soup = BeautifulSoup(page, 'html.parser')
        all_courses_raw = soup.table
        course_codes.extend([tr.td.a.string for tr in all_courses_raw.tbody.find_all('tr')])
        print('[artsci] Reading Course Name - Progress {} of {} {}'.format(index + 1, total_page, '.' * int(index * 100 / total_page)))

    data_file.write(pformat(course_codes))
    return course_codes


def artsci_course_detail(course: str):
    """
     The url is https://timetable.iit.artsci.utoronto.ca/
     API format /api/20199/courses?org=&code={course code}&section=&studyyear=&daytime=&weekday=&prof=&breadth=&online=&waitlist=&available=&title=
    :return:
    """
    url = 'https://timetable.iit.artsci.utoronto.ca'
    api_url = '/api/20199/courses?org=&code={}&section=&studyyear=&daytime=&weekday=&' \
              'prof=&breadth=&online=&waitlist=&available=&title='.format(course)

    data = json.loads(get_page(url + api_url))
    if not data:
        # nothing found
        print('Nothing related to {} found'.format(course))
        return

    # pprint(data.keys())
    print('Num of courses: {}'.format(len(data)))
    for course in data.keys():
        def findCourseName(course: str) -> str:
            first_dash = course.find('-')
            if first_dash == -1: return course
            return course[:first_dash] + course[first_dash + 1]
        course_name = findCourseName(course)
        print('Found Course: {}'.format(course_name))


if __name__ == '__main__':
    # artsci_course_test()
    # artsci_course_detail('ece')
    artsci_course_detail('CSC108H1')