import csv
import json

def run():
    with open('Testzahlen-gesamt.csv') as weekly_tests_csv:
        calendar_weeks = []
        calendar_weeks_raw = []
        weekly_tests = []
        weekly_tests_raw = []
        dict = None

        for x in range(1, 10):
            weekly_tests.append(0)
            calendar_weeks_raw.append(f'{x}/2020')

        ''' NOTE: the interesting data starts from line 4 '''
        csv_reader = csv.reader(weekly_tests_csv, delimiter='\n')
        index = 0
        for line in csv_reader:
            raw_test = None
            raw_date = None
            if index == 3:
                raw_week = '10/2020'
                raw_test = str(line).split('"')[3]
                raw_test = raw_test.replace(',', '')
            elif index >= 4:
                raw_week = str(line).split(',')[1]
                raw_test = str(line).split('"')[1]
                raw_test = raw_test.replace(',', '')
            if raw_test is not None and raw_week is not None:
                weekly_tests_raw.append(raw_test)
                calendar_weeks_raw.append(raw_week)
            index+=1

        ''' the last two lines are comments only '''
        calendar_weeks_raw = calendar_weeks_raw[:-2]
        weekly_tests_raw = weekly_tests_raw[:-2]

        ''' do some calendar week conversion '''
        for raw_week in calendar_weeks_raw:
            week = int(raw_week.split('/')[0])
            year = int(raw_week.split('/')[1].replace('*',''))
            if week < 10:
                week = f'0{week}'
            week = f'{year}-W{week}'
            calendar_weeks.append(week)

        ''' conversion from string to integer '''
        for raw_test in weekly_tests_raw:
            test = int(raw_test)
            weekly_tests.append(test)

        ''' data consistency check, length calendar_weeks equals length weekly_tests '''
        if len(calendar_weeks) != len(weekly_tests):
            print('length mismatch. ending programm.')
            print(f'calendar_weeks: {len(calendar_weeks)} weekly tests: {len(weekly_tests)}')
            return

        if len(calendar_weeks) < 1 and len(weekly_tests) < 1:
            print('no data extracted. ending programm.')
            return

        dict = {'calendar_weeks':calendar_weeks, 'weekly_tests':weekly_tests}
        with open('corona_germany_weekly_tests.json' ,'w') as output:
            output.write(json.dumps(dict))

        print('wrote dict to file. program finished.')


if __name__ == '__main__':
    run()
