import csv
import random
import datetime

# Data for randomization
first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]

# File details
header = ["date", "first", "last", "email", "employed"]
num_rows = 30

# Date range
start_date = datetime.datetime(2024, 1, 1, 0, 0, 0)
# Correcting user's end time from 59:59:59 to a valid time
end_date = datetime.datetime(2024, 12, 21, 23, 59, 59)
time_delta = end_date - start_date
total_seconds = int(time_delta.total_seconds())

# Generate data
data = []
for _ in range(num_rows):
    # Random date
    random_seconds = random.randrange(total_seconds)
    random_date = start_date + datetime.timedelta(seconds=random_seconds)

    # Random names and email
    first = random.choice(first_names)
    last = random.choice(last_names)
    email = f"{first.lower()}.{last.lower()}{random.randint(1,99)}@example.com"

    # Random employment status
    employed = random.choice([True, False])

    data.append([random_date.strftime("%Y-%m-%d %H:%M:%S"), first, last, email, employed])

# Write to CSV
with open("data.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(header)
    writer.writerows(data)

print(f"Successfully generated {num_rows} rows of data in data.csv")
