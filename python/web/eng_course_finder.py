import urllib.request
from typing import List
import re
from courseDB import CourseDB
from bs4 import BeautifulSoup
from pprint import pprint
from utils import get_page, change_keys, parse_day
from utils import bcolors

def download_engineering_course_description(url: str, db: CourseDB, col_name: str, exceptionDic: dict):
    page = get_page(url)

    soup = BeautifulSoup(page, 'html.parser')
    # testItem = 729
    course_desc_list = soup.find_all(['table', 'p'])[22:]

    def updateCourseDes(courseCode, courseTitle, courseDescription):
        db.update_many(col_name, {'courseName': {'$regex': courseCode+'.*'}},
                      {'courseTitle': courseTitle, 'courseDescription': courseDescription})

    courseCode = 0  # give this variable more scope
    courseTitle = ''
    courseDescription = ''
    for index, tag in enumerate(course_desc_list):
        # print('Analyzing tag #{}'.format(index))
        if tag.name == 'table' \
                and len(tag.tr.find_all('td')) > 1: # format error at some courses
            # this is a course code section
            courseCode = tag.tr.td.span.string.split('\xa0')[0]
            courseTitle = tag.tr.find_all('td')[1].span.string
            courseDescription = ''
            # print('FOUND course {} - {}'.format(courseCode, courseTitle))

            # print('{}\t{}'.format(courseCode, courseName))
            if courseCode in exceptionDic:
                courseDescription = exceptionDic[courseCode]
            else:
                continue
        elif tag.name == 'p':
            # this is a course decription
            info = ''.join(list(tag.stripped_strings))
            courseDescription = (courseDescription + '\n' + info) if courseDescription else info
            # print('\t\t', courseDescription)
        elif courseCode in exceptionDic:
            continue

        elif courseCode == 'MIE540H1':
            courseDescription = tag.td.string
            # print('\t\t', courseDescription)
        else:
            print("WARNING #{}".format(index))

        while courseDescription and courseDescription[-1] == '\n':
            courseDescription = courseDescription[:-1]
        updateCourseDes(courseCode, courseTitle, courseDescription)

        # print('Title:{}\r\nDescription:{}'.format(courseTitle, courseDescription))
        print('[ENG]Updating course title and description - ' + courseCode + ' - ' + bcolors.OKBLUE + 'Progress {} of {}'.format(
                index + 1, len(course_desc_list)) + bcolors.ENDC)
        # input()

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


def get_enginneering_exception_dict() -> dict:
    excep = {
        'APS111H1': 'This course introduces and provides a framework for the design process. Students are introduced to communication as an integral component of engineering practice. The course is a vehicle for understanding problem solving and developing communications skills. This first course in the two Engineering Strategies and Practice course sequence introduces students to the process of engineering design, to strategies for successful team work, and to design for human factors, society and the environment. Students write team and individual technical reports and give presentations within a discussion group.',
        'MIE368H1': 'This course showcases the impact of analytics focusing on real world examples and case studies.  Particular focus on decision analytics, where data and models are combined to ultimately improve decision-making.  Methods include: linear and logistic regression, classification and regression trees, clustering, linear and integer optimization. Application areas include: healthcare, business, sports, manufacturing, finance, transportation, public sector.',
        'CHE230H1': 'The chemical phenomena occurring in environmental systems are examined based on fundamental principles of organic, inorganic and physical chemistry. The course is divided into sections describing the chemistry of the atmosphere, natural waters and soils. The principles applied in the course include reaction kinetics and mechanisms, complex formation, pH and solubility equilibria and adsorption phenomena. Molecules of biochemical importance and instrumental methods of analysis relevant to environmental systems are also addressed. (formerly EDC230H1S)',
        'CHE249H1': 'Engineering analysis and design are not ends in themselves, but they are a means for satisfying human wants.  Thus, engineering concerns itself with the materials used and forces and laws of nature, and the needs of people.  Because of scarcity of resources and constraints at all levels, engineering must be closely associated with economics.  It is essential that engineering proposals be evaluated in terms of worth and cost before they are undertaken.  In this course we emphasize that an essential prerequisite of a successful engineering application is economic feasibility.  Hence, investment proposals are evaluated in terms of economic cost concepts, including break even analysis, cost estimation and time value of money.   Effective interest rates, inflation and deflation, depreciation and income tax all affect the viability of an investment. Successful engineering projects are chosen from valid alternatives considering such issues as buy or lease, make or buy, cost and benefits and financing alternatives.  Both public sector and for-profit examples are used to illustrate the applicability of these rules and approaches.',
        'CHE332H1': 'The rates of chemical processes. Topics include: measurement of reaction rates, reaction orders and activation energies; theories of reaction rates; reaction mechanisms and networks; development of the rate law for simple and complex kinetic schemes; approach to equilibrium; homogeneous and heterogeneous catalysis. Performance of simple chemical reactor types.',
        'CHE333H1': 'Covers the basics of simple reactor design and performance, with emphasis on unifying the concepts in kinetics, thermodynamics and transport phenomena. Topics include flow and residence time distributions in various reactor types as well as the influence of transport properties (bulk and interphase) on kinetics and reactor performance. The interplay of these facets of reaction engineering is illustrated by use of appropriate computer simulations.',
        'CHE412H1': 'Heterogeneous reactors. Mass and heat transport effects including intraparticle transport effects (Thiele modulus). Stability for various rate laws, transport regimes. Time dependent issues - deactivation/regeneration strategies. Emerging processes.',
        'CHE460H1': 'Review of the nature, properties and elementary toxicology of metallic and organic contaminants. Partitioning between environmental media (air, aerosols, water, particulate matter, soils, sediments and biota) including bioaccumulation. Degradation processes, multimedia transport and mass balance models. Regulatory approaches for assessing possible effects on human health and ecosystems.',
        'CHE470H1': 'A course covering selected topics in Chemical Engineering, not covered in other electives. Different topics may be covered each year depending on the interest of the Staff and students. May not be offered every year. Limited enrolment: permission of the Department required.',
        'CHE565H1': 'Application of aqueous chemical processing to mineral, environmental and industrial engineering. The course involves an introduction to the theory of electrolyte solutions, mineral-water interfaces, dissolution and crystallization processes, metal ion separations, and electrochemical processes in aqueous reactive systems. Applications and practice of (1) metal recovery from primary (i.e. ores) and secondary (i.e. recycled) sources by hydrometallurgical means, (2) treatment of aqueous waste streams for environmental protection, and (3) production of high-value-added inorganic materials.',
        'CHE568H1': 'Fundamental and applied aspects of nuclear engineering. The structure of the nucleus; nuclear stability and radioactive decay; the interaction of radiation with matter including radiological health hazards; the interaction of neutrons including cross-sections, flux, moderation, fission, neutron diffusion and criticality. Poison buildup and their effects on criticality. Nuclear engineering of reactors, reactor accidents, and safety issues. ',
        'MIE222H1': 'Design of mechanical joints. Elasto-plastic torsion of circular sections. Elasto-plastic bending of beams. Residual stresses, shearing stresses in beams, analysis of plane stress and plant strain problems. Pressure vessels, design of members of strength criteria, deflection of beams. Statistically indeterminate problems.',

    }
    return excep

if __name__ == '__main__':
    db = CourseDB('course')
    url = 'https://portal.engineering.utoronto.ca/sites/calendars/current/Course_Descriptions.html'
    excep = get_enginneering_exception_dict()
    download_engineering_course_description(url, db, 'courses', excep)