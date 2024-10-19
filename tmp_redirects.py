import csv

def extract_urls_with_by(csv_file_path):
    urls_with_by = []

    # Open the CSV file
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        # Iterate over each row in the CSV file
        for row in reader:
            url = row[0]  # Assuming the URL is the first column
            if "-by-" in url:
                urls_with_by.append(url)

    return urls_with_by

# Example usage
if __name__ == "__main__":
    csv_file_path = '/home/s/Downloads/Pages.csv'  # Change this to your CSV file path
    urls = extract_urls_with_by(csv_file_path)
    
    # Print the extracted URLs
    for url in urls:

        print('{ "from": "' + url.replace("https://lartboratoire.fr", "") +'", "to": "/aleartoire"},')
