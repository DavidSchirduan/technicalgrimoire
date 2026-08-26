import csv
import re
import io
import json
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests

# This script generates gumroad discounts and emails them to backers from a CSV file.
# It can be run on any computer that has Python3 installed. 

##### Follow the steps to customize this script ######

##### STEP 1 #######

# First use pip to install the requests module. This is used for curl commands, mostly.
# pip3 install --upgrade requests

##### STEP 2 #######

# Enable less secure connections for your email account: https://myaccount.google.com/lesssecureapps
# Don't forget to turn this off when you're done!

# When you run the script it will prompt you for your email password.
password = input("Type your email password and press enter:")

##### STEP 3 #######

# Replace this access token with the one from your Gumroad App
ACCESS_TOKEN="7bd28938408dfa99casdfa243ab3e5061cc8b6f53d009127dd9a05b15d"

def create_offer_code(email_addr):

    ##### STEP 4 ######
    # Use some curl commands to get the product ID. https://gumroad.com/api#products
	# If you have windows then these powershell commands will also work:
	#
	# $response = Invoke-RestMethod https://api.gumroad.com/v2/products -Method Get -Body @{access_token="WHATEVERYOURTOKENIS"}
	# echo $response.Products
	#
    # Replace the value below with your gumroad product.
    PRODUCT_ID="abcd-123xyzfgh456=="

    headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
    payload = {
        'access_token':ACCESS_TOKEN,
        'name':email_addr.replace('.',''),
        'amount_off':'100',
        'offer_type':'percent',
        'max_purchase_count':'1'
    }

    r = requests.post('https://api.gumroad.com/v2/products/'+PRODUCT_ID+'/offer_codes', params=payload, headers=headers)

    print(r.text)

    offer_json = json.loads(r.text)

    if (offer_json['success']):
        return offer_json['offer_code']['name']
    else:
        print("Code Creation Failed")
        exit()

def email_code(name,email_addr,offer_code):

    ##### STEP 5 #######
    # Replace the info below with what your email account is
    # and what your message should be.

    sender_email = "youremail@mail.com"
    receiver_email = email_addr

    message = MIMEMultipart("alternative")
    message["Subject"] = "Technical Grimoire Discounts"
    message["From"] = sender_email
    message["To"] = receiver_email

    ##### STEP 6 #######
	# replace the url with whatever your product's store page url is. 
	# The offer code can simply be appended to the url and is applied automatically for the customer
	
    # Create the plain-text and HTML versions of your message. They need to match, but the HTML version is the most important.

    html = """\
    <html>
    <body>
    <h2>Hello PERSONNAME!</h2>

    <p>Here is the bundle that includes BOTH print copies of your game</p>

    <p><a href="https://gum.co/ABCDE/OFFERCODE">https://gum.co/ABCDE/OFFERCODE</a></p>

    <p>Let me know if you have any questions or issues! I'm so sorry for all the confusion. Hopefully this should settle everything.</p>

    <p>   - David</p>

    </body>
    </html>
    """

    text = """\
    Hello PERSONNAME!

    Here is the bundle that includes BOTH print copies of your game!

    https://gum.co/ABCDE/OFFERCODE

    Let me know if you have any questions or issues! I'm so sorry for all the confusion. Hopefully this should settle everything.

    - David
    """

    # This section replaces the offer code with the one you just generated, and the person name with something from your CSV file.
    text = text.replace("PERSONNAME", name)
    text = text.replace("OFFERCODE", offer_code)

    html = html.replace("PERSONNAME", name)
    html = html.replace("OFFERCODE", offer_code)

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )

##### STEP 7 #######
# Setup your CSV file.
# Tell it where to find your CSV file
# And tell it what info/details it needs, and which columns match those details.

with open('backers.csv', encoding="utf8") as f:
    reader = csv.reader(f)
    for row in reader:

        email = ""

        ### Going line by line through the CSV
        Name = row[2] #KS Backer name - column C
        KSEmail = row[3].rstrip() #KS Email -column D
        Reward = row[4] #General Reward - column E

        ### Grab the latest email, and just do this for one particular reward branch
        if Reward == "Both Zines (Print + PDF)":
            email = KSEmail

            # Create the offer code using the email as a sample name.
            offer = create_offer_code(email)

            # Email the backer their discount code and email
            email_code(Name,email,offer)
            print("EMAIL SENT:  " + email)

##### STEP 8 #######
# Run the python script! It should prompt you for the password, find the CSV, and for each backer generate a gumroad discount and email it to them.