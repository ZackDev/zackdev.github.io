import argparse
import csv
import json

def run(inputfile, outputfile):
    with open(inputfile) as daily_cases_csv:
        raw_dates = None
        raw_cases = None
        dates = None
        cases = None
        dict = None

        ''' NOTE: the first line contains the dates, starting from 22.01.2020 '''
        ''' each line after that corresponds to a country, containing the cases among other data '''
        csv_reader = csv.reader(daily_cases_csv, delimiter=',')
        index = 0
        for line in csv_reader:
            if index == 0:
                raw_dates = line[4:]
            elif index > 0:
                if line[1] == 'Germany':
                    raw_cases = line[4:]
                    break
            index+=1

        if raw_dates and raw_cases:
            dates = []
            cases = []

            ''' fill the dates and cases that are missing with pseudo-data, e.g. 1.1 to 21.1 '''
            for x in range(1, 22):
                if x < 10:
                    dates.append(f'2020-01-0{x}')
                elif x >= 10:
                    dates.append(f'2020-01-{x}')
                cases.append(0)

            ''' do some date parsing, provided format is M/D/Y, to YYYY-MM-DD '''
            for raw_date in raw_dates:
                date_array = raw_date.split('/')
                day = int(date_array[1])
                month = int(date_array[0])
                year = int(date_array[2])
                if day < 10:
                    day = f'0{day}'
                if month < 10:
                    month = f'0{month}'
                year = f'20{year}'
                dates.append(f"{year}-{month}-{day}")

            ''' simple string to integer conversion '''
            for raw_case in raw_cases:
                case = int(raw_case)
                cases.append(case)

        ''' check data for consistency, equal amount of dates and cases '''
        if len(dates) != len(cases):
            print('length mismatch. ending programm.')
            print(f'dates: {len(dates)} cases: {len(cases)}')
            return

        if len(dates) < 1 and len(cases) < 1:
            print('no data extracted. ending programm.')
            return

        dict = { 'dates':dates, 'cases':cases}
        with open(outputfile ,'w') as output:
            output.write(json.dumps(dict))

        print('wrote dict to file. program finished.')
        exit(0)
    exit(1)


if __name__ == '__main__':
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-i", "--inputfile", type=str)
    arg_parser.add_argument("-o", "--outputfile", type=str)
    args = arg_parser.parse_args()
    if (args.inputfile and args.outputfile):
        run(args.inputfile, args.outputfile)
    else:
        arg_parser.print_help()