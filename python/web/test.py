import re
from bs4 import BeautifulSoup
import urllib.request
import web.timetableparser as tt
from pprint import pprint, pformat
from collections import deque
import json

def eng_course_test():

    url = "https://portal.engineering.utoronto.ca/sites/timetable/winter.html"
    page = tt.get_page(url)

    data_file = open('course-test.txt', 'w')
    soup = BeautifulSoup(page, 'html.parser')
    course_groups_html = soup.find_all('table')[1:]

    course_table = []

    for course_group_html in course_groups_html:
        course_prefix = course_group_html.caption.b
        print(course_prefix.string)
        course_headers = [tag.string for tag in course_group_html.tr.find_all('th')]
        # print(course_headers)
        for section_htm in course_group_html.find_all('tr')[1:]:
            section_info = [info.string if info.string != '\xa0' else 'None' for info in section_htm.find_all('font')]

            course_found = False
            section = {'section_name': section_info[1]}
            section.update({'detail': [{header: context for header, context in zip(course_headers[2:], section_info[2:])}]})
            # pprint(section_info[0])
            # pprint(section)
            # check for previous course name
            for previous_course in course_table:
                if previous_course['course_name'] == section_info[0]:
                    # check for previous section name
                    section_found = False

                    for previous_section in previous_course['sections']:
                        # pprint('Found previoud section')
                        if previous_section['section_name'] == section['section_name']:
                            previous_section['detail'].append(section['detail'])
                            section_found = True
                            break

                    if not section_found:
                        # no previous section found
                        previous_course['sections'].append(section)
                        # pprint('Add new section')

                    course_found = True
                    break

            if not course_found:
                # add a new course
                # pprint('Add new course')
                course_table.append({
                    'course_name': section_info[0],
                    'sections' : [section]
                })

        # break

    # pprint(course_table)
    # data_file.write(pformat({'courses': course_table}))
    data_file.write(json.dumps({'courses': course_table}))
    data_file.close()
    pprint('Done')


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

if __name__ == '__main__':
    artsci_course_test()