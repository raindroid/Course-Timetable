import urllib.request
from typing import List
import re
from courseDB import CourseDB


def get_page(url: str) -> str:
    response = urllib.request.urlopen(url)
    html = response.read()  # 获取到页面的源代码
    page = html.decode('utf-8')
    return page


def test(db):
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
    test(db)