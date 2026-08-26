import os
import re

# Get the list of all files and directories
workingdir = os.path.dirname(__file__)
targetdir = os.path.join(workingdir, '..\\_posts')
files = os.listdir(targetdir)

#go through each markdown post in the target folder
for file in files:
    if file.endswith(".md"):
        print(targetdir + "\\" + file)
        with open((targetdir + "/" + file), encoding="utf-8") as f:
            read_file = f.read()

            # read it line by line
            for line in read_file:
                print(extract_images(line))

        # We can check that the file has been automatically closed.
        f.closed

#grab the full path for an image like this:
# ![\images\posts\fungi_stonetop.jpg](\images\posts\fungi_stonetop.jpg)
# confirm it exists with the full path. 
def extract_images(file_line):
    matches = re.findall(r"\d+", text)
    return matches[0]
