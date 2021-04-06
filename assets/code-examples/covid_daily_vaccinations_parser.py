import argparse
import csv
import json
import math

def run(inputfile, outputfile):
    with open(inputfile, newline='') as daily_vaccinations_csv:
        dates_raw = []
        primary_vaccinations_raw = []
        secondary_vaccinations_raw = []
        dates = []
        primary_vaccinations = []
        secondary_vaccinations = []
        dict = None

        ''' NOTE: the first line contains the header '''
        ''' each line after that corresponds to a date '''
        csv_reader = csv.reader(daily_vaccinations_csv, delimiter=',', dialect='excel')
        index = 0
        for line in csv_reader:
            if index > 0:
                raw_date = line[0]
                primary_raw_vaccination = line[1]
                secondary_raw_vaccination = line[2]
                if raw_date is not None and primary_raw_vaccination is not None and secondary_raw_vaccination is not None:
                    arr_raw_date = raw_date.split('/')
                    if raw_date != '' and len(arr_raw_date) == 3:
                        dates_raw.append(raw_date)
                        primary_vaccinations_raw.append(primary_raw_vaccination)
                        secondary_vaccinations_raw.append(secondary_raw_vaccination)
            index+=1

        if dates_raw and primary_vaccinations_raw and secondary_vaccinations_raw:
            dates = []
            primary_vaccinations = []
            secondary_vaccinations = []

            ''' do some date parsing, provided format is M/D/Y, to YYYY-MM-DD '''
            for raw_date in dates_raw:
                date_array = raw_date.split('/')
                day = int(date_array[1])
                month = int(date_array[0])
                year = int(date_array[2])
                if day < 10:
                    day = f'0{day}'
                if month < 10:
                    month = f'0{month}'
                dates.append(f"{year}-{month}-{day}")

            ''' do simple string to integer conversion '''
            for raw_vaccination in primary_vaccinations_raw:
                vaccination = math.floor(float(raw_vaccination))
                primary_vaccinations.append(vaccination)

            for raw_vaccination in secondary_vaccinations_raw:
                if raw_vaccination == '':
                    raw_vaccination = 0
                vaccination = math.floor(float(raw_vaccination))
                secondary_vaccinations.append(vaccination)


        ''' check data for consistency, equal amount of dates and cases '''
        if len(dates) != len(primary_vaccinations) != len(secondary_vaccinations):
            print('length mismatch. ending programm.')
            print(f'dates: {len(dates)} primary_vaccinations: {len(primary_vaccinations)} secondary_vaccinations: {len(secondary_vaccinations)}')
            return

        if len(dates) < 1 and len(primary_vaccinations) < 1 and len(secondary_vaccinations):
            print('no data extracted. ending programm.')
            return

        dict = { 'dates':dates, 'primary_vaccinations':primary_vaccinations, 'secondary_vaccinations':secondary_vaccinations }
        with open(outputfile ,'w') as output:
            output.write(json.dumps(dict))

        print('wrote dict to file. program finished.')


if __name__ == '__main__':
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-i", "--inputfile", type=str)
    arg_parser.add_argument("-o", "--outputfile", type=str)
    args = arg_parser.parse_args()
    if (args.inputfile and args.outputfile):
        run(args.inputfile, args.outputfile)
    else:
        arg_parser.print_help()
