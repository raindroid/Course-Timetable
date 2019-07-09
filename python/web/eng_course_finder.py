import urllib.request
from typing import List
import re
from courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint
from utils import get_page, change_keys, parse_day
from utils import bcolors

def download_engineering_course_description(url: str, db: CourseDB, col_name: str):
    page = get_page(url)

    soup = BeautifulSoup(page, 'html.parser')
    course_desc_list = soup.find_all(['table', 'p'])[22:]

    def updateCourseDes(courseCode, courseTitle, courseDescription):
        db.update_many(col_name, {'courseName': {'$regex': courseCode+'.*'}},
                      {'courseTitle': courseTitle, 'courseDescription': courseDescription})

    courseCode = 0  # give this variable more scope
    for index, tag in enumerate(course_desc_list):
        # print('Analyzing tag #{}'.format(index))
        if tag.name == 'table' \
                and len(tag.tr.find_all('td')) > 1: # format error at some courses
            # this is a course code section
            courseCode = tag.tr.td.span.string.split('\xa0')[0]
            courseTitle = tag.tr.find_all('td')[1].span.string

            # print('{}\t{}'.format(courseCode, courseName))
            continue
        elif tag.name == 'p':
            # this is a course decription
            courseDescription = tag.string
            # print('\t\t', courseDescription)
        elif courseCode == 'MIE368H1': # hard to handle this case
            courseDescription = 'This course showcases the impact of analytics focusing on real world examples and case studies.  Particular focus on decision analytics, where data and models are combined to ultimately improve decision-making.  Methods include: linear and logistic regression, classification and regression trees, clustering, linear and integer optimization. Application areas include: healthcare, business, sports, manufacturing, finance, transportation, public sector.'
        elif courseCode == 'MIE540H1':
            courseDescription = tag.td.string
            # print('\t\t', courseDescription)
        else:
            print("WARNING #{}".format(index))
        updateCourseDes(courseCode, courseTitle, courseDescription)

        print('[ENG]Updating course title and description - ' + courseCode + ' - ' + bcolors.OKBLUE + 'Progress {} of {}'.format(
                index + 1, len(course_desc_list)) + bcolors.ENDC)


def download_engineering_table(url: str, db: CourseDB, col_name: str, save_year_course: bool = True, drop_frist: bool = True) -> str:
    page = get_page(url)

    soup = BeautifulSoup(page, 'html.parser')
    course_groups_html = soup.find_all('table')[1:]

    course_table = []
    if drop_frist:
        db.drop_col(col_name)

    for course_group_html in course_groups_html:
        course_headers = [tag.string for tag in course_group_html.tr.find_all('th')]
        # print(course_headers)
        all_courses = course_group_html.find_all('tr')[1:]
        for index, meeting_html in enumerate(all_courses):
            meeting_info = [info.string if info.string != '\xa0' else 'NONE' for info in meeting_html.find_all('font')]

            course_type = meeting_info[0][-1]
            course_name = meeting_info[0]

            if not save_year_course and course_type.capitalize() == 'Y':
                continue

            course_found = False
            detail_raw = {header: context for header, context in zip(course_headers[2:], meeting_info[2:])}
            detail_info = change_keys(detail_raw, {
                "START DATE": 'meetingStartDate',
                "DAY": 'meetingDay',
                "START": 'meetingStartTime',
                "FINISH": 'meetingEndTime',
                "LOCATION": 'meetingLocation',
                "PROFESSOR(S)": 'instructor',
                "SCHEDULING NOTES": 'notes'
            })
            detail_info.update({'meetingDay': parse_day(detail_info['meetingDay'])})
            instructor = detail_info['instructor']
            meeting = {'meetingName': meeting_info[1],
                       'meetingType': meeting_info[1][:3],
                       'instructors': [] if instructor == 'NONE' else [instructor],
                       'detail': [detail_info]}
            meeting_type = meeting.pop('meetingType')

            # check for previous course name
            for previous_course in course_table:
                if previous_course['courseName'] == meeting_info[0]:

                    # check for previous meeting type first
                    meeting_type_found = False
                    for (previous_meeting_type, meetings) in previous_course['meetings'].items():
                        if previous_meeting_type == meeting_type:

                            # check for previous meeting name
                            meeting_found = False
                            for previous_meeting in meetings:
                                if previous_meeting['meetingName'] == meeting['meetingName']:

                                    # update instructor list
                                    instructor_found = False
                                    for previous_instructor in previous_meeting['instructors']:
                                        if previous_instructor == meeting['instructors'][0]:
                                            instructor_found = True
                                            break
                                    if not instructor_found:
                                        previous_meeting['instructors'].extend(meeting['instructors'])

                                    previous_meeting['detail'].extend(meeting['detail'])
                                    meeting_found = True
                                    break

                            if not meeting_found:
                                # no previous meeting found
                                meetings.append(meeting)

                            meeting_type_found = True
                            break

                    if not meeting_type_found:
                        # add a new type
                        previous_course['meetings'].update({meeting_type: [meeting]})

                    course_found = True
                    break

            if not course_found:
                # add a new course
                course_table.append({
                    'courseName': course_name,
                    'courseType': course_type,
                    'meetings': {meeting_type: [meeting]}
                })

            print('[ENG] Reading Session Detail - ' + course_name + ' - ' + bcolors.OKBLUE + 'Progress {} of {}'.format(
                index + 1, len(all_courses)) + bcolors.ENDC)

    db.insert_many(col_name, course_table)


def download_engineering_table_old(db):
    url = "https://portal.engineering.utoronto.ca/sites/timetable/fall.html"
    page = get_page(url)

    courses_prefixes_pattern = '<table align="center" border="border" cellspacing="0" cellpadding="5" >(.+?)<br \/><a href="#index">Back to the top<\/a>'
    courses_prefixes = re.findall(courses_prefixes_pattern, page, re.M|re.S)

    for courses_prefix in courses_prefixes:
        prefixes_patter = "<caption><b>(\w{3})<\/b><\/caption>"
        prefixes = re.findall(prefixes_patter, courses_prefix)
        if len(prefixes) != 1:
            break

        prefix = prefixes[0]

        # read table headers
        table_headers_pattern = '<th>(.+?)<\/th>'
        table_headers = re.findall(table_headers_pattern, courses_prefix)
        print(table_headers)

        # read table contents
        table_contents_pattern = r'<tr>(.+?)</tr>'
        table_contents = re.findall(table_contents_pattern, courses_prefix, re.M|re.S)
        print('Prefix={}, CoursesNum={}'.format(prefix, len(table_contents)))

        # read each row
        for courses_content in table_contents:
            course_pattern = r"<font size=2 face = \"verdana\">(.+?)</font></td>"
            course_raw = re.findall(course_pattern, courses_content)
            course = [info if info != '&nbsp' else '' for info in course_raw]
            if course:
                print(course)
                db.insert_oneList('test', header=table_headers, info=course)


    print(len(courses_prefixes))


if __name__ == '__main__':
    db = CourseDB('course')
    url = 'https://portal.engineering.utoronto.ca/sites/calendars/current/Course_Descriptions.html'
    download_engineering_course_description(url, db, 'courses')