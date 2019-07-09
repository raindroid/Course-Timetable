import urllib.request
from typing import List
import re
from courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint, pformat
from utils import get_page, change_keys, parse_day
import json
from utils import bcolors

def get_artsci_course_names(save_file: str = ''):
    if save_file != '':
        data_file = open(save_file, 'w')

    url = "https://fas.calendar.utoronto.ca/search-courses"
    page = get_page(url)
    total_page = int(re.findall('1 of (\d+)', page)[0])
    total_page = 472 if total_page == 0 else total_page

    print('[artsci] Total total_page: {}'.format(total_page))
    course_codes = []

    for index in range(total_page):
        read_url = url
        if index > 0:
            read_url += '?page={}'.format(index)
            page = get_page(read_url)
        soup = BeautifulSoup(page, 'html.parser')
        all_courses_raw = soup.table
        course_codes.extend([tr.td.a.string for tr in all_courses_raw.tbody.find_all('tr')])
        print('[artsci] Reading Course Code - ' + bcolors.OKBLUE + 'Page {} of {}'.format(
            index + 1, total_page) + bcolors.ENDC)

    if save_file != '':
        data_file.write(json.dumps(course_codes))
    return course_codes


def get_artsci_course_detail(course: str, save_file: str = '', save_file_ori: str = ''):
    """
     The url is https://timetable.iit.artsci.utoronto.ca/
     API format /api/20199/courses?org=&code={course code}&section=&
                studyyear=&daytime=&weekday=&prof=&breadth=&online=&
                waitlist=&available=&title=
    :return:
    """
    if save_file != '':
        data_file = open(save_file, 'w')

    url = 'https://timetable.iit.artsci.utoronto.ca'
    api_url = '/api/20199/courses?org=&code={}&section=&studyyear=&daytime=&weekday=&' \
              'prof=&breadth=&online=&waitlist=&available=&title='.format(course)

    # print('API url = {}'.format(url + api_url))
    page = get_page(url + api_url)
    if not page:
        # empty page found
        print('Nothing related to {} found'.format(course))
        return

    try:
        data = json.loads(page)
    except:
        # page is not a json
        print('Nothing related to {} found'.format(course))
        return

    if not data:
        # nothing useful found
        print('Nothing related to {} found'.format(course))
        return

    if save_file_ori != '':
        ori_file = open(save_file_ori, 'w')
        ori_file.write(json.dumps(data))
        ori_file.close()

    print('Num of courses: {}'.format(len(data)))

    all_courses = []
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
        try:
            meetings_data = data[course].pop('meetings')
        except:
            continue
        meetings_info = {}

        for meetingName, meeting_data in meetings_data.items():
            if "cancel" in meeting_data and isinstance(meeting_data['cancel'], str) and \
                    'CANCEL' in meeting_data['cancel'].upper():
                print('This Course is Cancelled')
                break

            # set up meeting instructors
            instructor_info = []
            instructor_list = meeting_data.pop('instructors')
            if instructor_list != []:
                for instructor_data in instructor_list.values():
                    instructor_info.append(instructor_data['firstName'] + ' ' + instructor_data['lastName'])

            # set up single meeting
            meeting_all = []
            for meeting_raw in meeting_data['schedule'].values():

                if meeting_raw['meetingDay']:
                    meeting_raw.update({'meetingDay': parse_day(meeting_raw['meetingDay'])})
                    meeting_all.append(meeting_raw)
            meeting_data.pop('schedule')
            if not meeting_all:
                continue

            meeting_type = meeting_data.pop('teachingMethod')
            if meeting_type in meetings_info:
                meetings_info[meeting_type].append({'meetingName': meetingName.replace('-', ''),
                                      'instructors': instructor_info,
                                      'detail': meeting_all})
            else:
                meetings_info.update({meeting_type: [{'meetingName': meetingName.replace('-', ''),
                                                    'instructors': instructor_info,
                                                    'detail': meeting_all}]})
            # other info
            meetings_info[meeting_type][-1].update(meeting_data)

        if not meetings_info:
            print('This course is not available')
            continue

        course_data.update({'meetings': meetings_info})

        # other info
        course_data.update(data[course])
        # print(json.dumps(course_data))
        if save_file != '':
            data_file.write(json.dumps(course_data))
            data_file.close()
        all_courses.append(course_data)
    return all_courses


def download_artsci_table(db: CourseDB, col_name: str, save_year_course: bool = True, drop_frist: bool = True) -> str:
    if drop_frist:
        db.drop_col(col_name)

    # download course names
    course_names = get_artsci_course_names()
    # course_names = ['CSC384']
    for index, courseName in enumerate(course_names):
        courseData = get_artsci_course_detail(courseName)
        if courseData:
            db.insert_many(col_name, courseData)

        print('[artsci] Download Course Detail - ' + courseName + ' - '+ bcolors.OKBLUE + 'Progress {} of {} {}'.format(
            index + 1, len(course_names),
            (bcolors.OKGREEN + ' SUCCESS ' if courseData else bcolors.FAIL + ' FAILED ') + bcolors.ENDC))


if __name__ == '__main__':
    # artsci_course_test('../../data/as_course_list.json')
    # get_artsci_course_detail('APM441H1')
    # artsci_course_detail('CSC108H1')
    # get_artsci_course_detail('PSY202H1', '../../data/samples/PSY202H1.json')
    # get_artsci_course_detail('HIS310H1', '../../data/samples/HIS310H1.json')
    # get_artsci_course_detail('CSC104H1', '../../data/samples/CSC104H1.json', '../../data/samples/CSC104H1-ori.json')
    db = CourseDB('course2')
    download_artsci_table(db, 'test')
    pass