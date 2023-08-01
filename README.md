# Intelligent Tutor - Tutee Match

[Link to Live Deployment](https://learny-matching-tool.vercel.app/)
Many of the social welfare organizations that help under-previleged students in Singapore had one major common pain-point. This pain-point is difficulty in matching the right tutor with the right tutee. This tool intends to solve this pain-point for these social welfare organizations.

## 🧑‍💼User Story / Experience

The user (SWO) is expected to take following actions:

- Click on link to "Tutor DB Sheet" and paste the tutor details there
- Click on link to "Tutee DB Sheet" and paste the tutee details there
- The user should ensure that the column names he has given is consistent with the assumptions of the tool.
- Click on "Load Data" and wait till confirmation alert is received
- Click on "Match" to see table of ID of top 5 best matches for each tutor
- User can click on individual row to see more details about a specific tutor and his/her top 5 matches
- User can export the main matching table into CSV as well.

## 📺 User Interface

Below is a snapshot of the main page with the key buttons and sample of starting matchng table
![user interface](/src/images/MainPage.jpg)

Below is a snapshot of the page that gives more details of a specific tutor
![user interface](/src/images/SpecificTutorDetails.jpg)

## 🏗️ Program Architecture

This program is mostly front-end. All the logic calculation happens at the browser level itself.
As the size of data is not expected to be much, the entire excel sheet is loaded into memory and is processed depending on user actions.

Architecture of key visual components is defined in the following diagram
![Visual Components](/src/images/VisualComponents_Structure.jpg)

Structure of key state variables can be found below
![State Variables](/src/images/Structure%20of%20State%20Variables.jpg)

Structure of global variables can be found below
![Global Variables](/src/images/Structure%20of%20Global%20Variables.jpg)

The details of assumptions about column name and the matching algorithm can be found in the below link
[Link](https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=317940286)

## Next Improvements

This tool will be improved further depending on feedback from the various social-welfare organizations so that it can meet needs of most of them. The data structure is expected to vary with organization. Hence some program flexibility needs to be created.
Also, will need to add features to point Tutor/Tutee data to a separate location (URL or local file) rather than forcing all to copy-paste into same location. In addition, to improve scalability, some form of back-end might be created (depending on user feedback) to handle very huge data
