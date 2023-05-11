
My project - Corona reservoir


This project implements a partial server side and DB for a system to manage the Corona database for a health fund.

To install this project, first clone the repository:
git clone https://github.com/Noa-Lubin
Then, install the required dependencies:
npm install

Usage
To run the project, use the following command:
npm start
This will start the application and make it available at http://localhost:3000.
then Then, to check the functions we will use the "postman" program.
we will write the url there.

( Contributing
To contribute to this project, follow these steps:
1.	Fork this repository
2.	Create a new branch (`git checkout -b my-feature-branch`)
3.	Make changes and commit them (`git commit -am 'Add new feature'`)
4.	Push your changes to the branch (`git push origin my-feature-branch`)
5.	Create a new pull request )

Screenshot from a client, when activating a function to retrieve client data:
image.png

How it works?
There are 3 tables : 
•	clients – all the clients is HMO
•	positive – all clients who were positive corona patients, when they were diagnosed and when they recovered.
•	vaccinations - All the vaccines that have been vaccinated (who is the vaccinator and who is the manufacturer)
Each table has several operations (POST, GET)
It is detailed in the project itself what the actions are and what each action does

תשובות של תרגיל 2 חלק ב מצורפות בקובץ בשם "תרגיל 2 חלק ב(פיצ'ר) PDF
מצורף גם תצוגה סכמטית  של המידה בבסיס הנתונים.
בנוסף, בוצעו חלק מהבונוסים.