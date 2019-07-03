import urllib.request
from typing import List
import re
from web.courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint
from web.utils import get_page

def download_engineering_table(url: str, db: CourseDB, col_name: str, year_course_col_name: str = '', drop_frist: bool = True) -> str:
    page = get_page(url)

    soup = BeautifulSoup(page, 'html.parser')
    course_groups_html = soup.find_all('table')[1:]

    course_table = []
    year_course_table = []
    if drop_frist:
        db.drop_col(col_name)
        if year_course_col_name != '':
            db.drop_col(year_course_col_name)

    for course_group_html in course_groups_html:
        course_headers = [tag.string for tag in course_group_html.tr.find_all('th')]
        # print(course_headers)
        for section_htm in course_group_html.find_all('tr')[1:]:
            section_info = [info.string if info.string != '\xa0' else 'None' for info in section_htm.find_all('font')]

            course_found = False
            section = {'section_name': section_info[1]}
            section.update({'detail': [{header: context for header, context in zip(course_headers[2:], section_info[2:])}]})

            if section_info[0][-3:] != 'Y1Y':

                # check for previous course name
                for previous_course in course_table:
                    if previous_course['course_name'] == section_info[0]:
                        # check for previous section name
                        section_found = False

                        for previous_section in previous_course['sections']:
                            if previous_section['section_name'] == section['section_name']:
                                previous_section['detail'].append(section['detail'])
                                section_found = True
                                break

                        if not section_found:
                            # no previous section found
                            previous_course['sections'].append(section)

                        course_found = True
                        break

                if not course_found:
                    # add a new course
                    course_table.append({
                        'course_name': section_info[0],
                        'sections' : [section]
                    })

            elif year_course_col_name != '':
                # pprint('Year course found')
                # check for previous course name [year course]
                for previous_course in year_course_table:
                    if previous_course['course_name'] == section_info[0]:
                        # check for previous section name
                        section_found = False

                        for previous_section in previous_course['sections']:
                            if previous_section['section_name'] == section['section_name']:
                                previous_section['detail'].append(section['detail'])
                                section_found = True
                                break

                        if not section_found:
                            # no previous section found
                            previous_course['sections'].append(section)

                        course_found = True
                        break

                if not course_found:
                    # add a new course
                    year_course_table.append({
                        'course_name': section_info[0],
                        'sections': [section]
                    })


    db.insert_many(col_name, course_table)
    if year_course_col_name != '':
        db.insert_many(year_course_col_name, year_course_table)


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
