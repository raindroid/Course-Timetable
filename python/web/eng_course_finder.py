import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint
from web.utils import get_page

def download_engineering_table(url: str, db: CourseDB, col_name: str, save_year_course: bool = False, drop_frist: bool = True) -> str:
    page = get_page(url)

    soup = BeautifulSoup(page, 'html.parser')
    course_groups_html = soup.find_all('table')[1:]

    course_table = []
    if drop_frist:
        db.drop_col(col_name)

    for course_group_html in course_groups_html:
        course_headers = [tag.string for tag in course_group_html.tr.find_all('th')]
        # print(course_headers)
        for meeting_html in course_group_html.find_all('tr')[1:]:
            meeting_info = [info.string if info.string != '\xa0' else 'None' for info in meeting_html.find_all('font')]

            course_type = meeting_info[0][-1]
            course_name = meeting_info[0]

            if not save_year_course and course_type.capitalize() == 'Y':
                continue

            course_found = False

            meeting = {'meetingName': meeting_info[1], 'meetingType': meeting_info[1][:3]}
            meeting.update({'detail': [{header: context for header, context in zip(course_headers[2:], meeting_info[2:])}]})

            # check for previous course name
            for previous_course in course_table:
                if previous_course['courseName'] == meeting_info[0]:
                    # check for previous meeting name
                    meeting_found = False

                    for previous_meeting in previous_course['meetings']:
                        if previous_meeting['meetingName'] == meeting['meetingName']:
                            previous_meeting['detail'].extend(meeting['detail'])
                            meeting_found = True
                            break

                    if not meeting_found:
                        # no previous meeting found
                        previous_course['meetings'].append(meeting)

                    course_found = True
                    break

            if not course_found:
                # add a new course
                course_table.append({
                    'courseName': course_name,
                    'courseType': course_type,
                    'meetings' : [meeting]
                })

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