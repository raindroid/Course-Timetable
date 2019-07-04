import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint, pformat
from web.utils import get_page
import json

def artsci_course_test(save_file: str = ''):
    if save_file != '':
        data_file = open(save_file, 'w')

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

    if save_file != '':
        data_file.write(json.dumps(course_codes))
    return course_codes


def artsci_course_detail(course: str, save_file: str = ''):
    """
     The url is https://timetable.iit.artsci.utoronto.ca/
     API format /api/20199/courses?org=&code={course code}&section=&studyyear=&daytime=&weekday=&prof=&breadth=&online=&waitlist=&available=&title=
    :return:
    """
    if save_file != '':
        data_file = open(save_file, 'w')

    url = 'https://timetable.iit.artsci.utoronto.ca'
    api_url = '/api/20199/courses?org=&code={}&section=&studyyear=&daytime=&weekday=&' \
              'prof=&breadth=&online=&waitlist=&available=&title='.format(course)

    print('API url = {}'.format(url + api_url))
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

        # set up course name
        course_name = findCourseName(course)
        course_data = {'courseName': course_name}
        print('Found Course: {}'.format(course_name))

        # set up course type
        course_data.update({'courseType': data[course]["section"]})

        # set up the meetings info
        meetings_data = data[course].pop('meetings')
        meetings_info = []
        for meetingName, meeting_data in meetings_data.items():

            meetings_info.append({'meetingName': meetingName.replace('-', ''),
                                  'meetingType': meeting_data['teachingMethod'],
                                  'detail': meetings_data})

        course_data.update({'meetings': meetings_info})



        # other info
        course_data.update(data[course])
        # print(json.dumps(course_data))
        if save_file != '': data_file.write(json.dumps(course_data))



if __name__ == '__main__':
    # artsci_course_test('../../data/as_course_list.json')
    # artsci_course_detail('ece')
    # artsci_course_detail('CSC108H1')
    artsci_course_detail('PSY202H1', '../../data/samples/PSY202H1.json')