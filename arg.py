# import argparse
# import json

# # Create the parser
# parser = argparse.ArgumentParser()

# # Add the positional argument for the JSON file
# parser.add_argument("json_file", type=argparse.FileType("r"))

# # Parse the arguments
# args = parser.parse_args()

# # Load the JSON data from the file
# data = json.load(args.json_file)

# # Print the data
# print(data)

import argparse
parser = argparse.ArgumentParser()
parser.add_argument('-json', action='store', dest='json',
                    help='JSON content')
args = parser.parse_args()
C = args.json
print (C)