import csv
import json

def run():
    with open('Impfquotenmonitoring.csv') as daily_vaccinations_csv:
        dates_raw = []
        vaccinations_raw = []
        dates = []
        vaccinations = []
        dict = None

        ''' NOTE: the first line contains the header '''
        ''' each line after that corresponds to a date '''
        csv_reader = csv.reader(daily_vaccinations_csv, delimiter='\n')
        index = 0
        for line in csv_reader:
            if index > 0:
                raw_date = str(line).split(',')[0]
                raw_date = raw_date.replace('[', '')
                raw_date = raw_date.replace("'", '')
                if index <= 29:
                    raw_vaccination = str(line).split('"')[1]
                elif index > 29:
                    raw_vaccination = str(line).split(',')[3]
                if raw_date is not None and raw_vaccination is not None:
                    if raw_date != '' and raw_date != 'Gesamt':
                        dates_raw.append(raw_date)
                        vaccinations_raw.append(raw_vaccination)
            index+=1

        if dates_raw and vaccinations_raw:
            dates = []
            vaccinations = []

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

            ''' simple string to integer conversion '''
            for raw_vaccination in vaccinations_raw:
                raw_vaccination = raw_vaccination.replace(',', '')
                raw_vaccination = raw_vaccination.replace(']', '')
                raw_vaccination = raw_vaccination.replace("'", '')
                vaccination = int(raw_vaccination)
                vaccinations.append(vaccination)

        ''' check data for consistency, equal amount of dates and cases '''
        if len(dates) != len(vaccinations):
            print('length mismatch. ending programm.')
            print(f'dates: {len(dates)} cases: {len(vaccinations)}')
            return

        if len(dates) < 1 and len(vaccinations) < 1:
            print('no data extracted. ending programm.')
            return

        dict = { 'dates':dates, 'vaccinations':vaccinations }
        with open('corona_germany_daily_vaccinations.json' ,'w') as output:
            output.write(json.dumps(dict))

        print('wrote dict to file. program finished.')


if __name__ == '__main__':
    run()
