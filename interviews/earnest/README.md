# Earnest Coding Challenge.
Author: Gordon Zhang.

### How to run this program.
1. Please ensure that the current directory also contains these files:
```
index.js
parser.js
package.json
README.md (this file)
```

2. Setting up the environment. Please note that the current instructions are limited to Mac OS, as I do not have access to a Windows machine.
  1. Install NodeJS, a Javascript runtime environment, here: https://nodejs.org/en/
  2. Install NPM via Homebrew: `brew install npm`
    * If you do not have Homebrew, a Mac OS package manager, on your system, it can be found here: https://brew.sh
  3. You can verify the installation by running the following commands:
    * `node -v` -> Should print a number, i.e. 6.12.0
    * `npm -v`-> Should print a number, i.e. v12.7.0
      * NPM is a Node-based package manager that gives you access to a variety of open-source modules and security audits.
      * You can learn more here: https://www.npmjs.com
  4. Run the command `npm install` in the current directory.
    * This should create a file named `package-lock.json`, and a directory named `node_modules`. These are simply libraries I am using, needed for the program to run.

3. Running the app.
  1. Run the command `node index.js` to start the app, which uses my test cases provided by the prompt. You should see this output in console.
  2. You will likely have additional test cases to run, which are fed in by a text file.
    * If you do, go ahead and populate those rows in input.txt. Ensure that each row is properly done with a line-break, as if output from a script.
    * You will see your rows printed in console under the provided test cases.


### Design Constraints and Design Assumptions.
1. The first major constraint is that each constructed instance of MonthlyReportParser is, as its name suggests, valid for only a month. Furthermore, based on the prompt, the parsed date is never actually used for anything, all the sample inputs all correspond to the same month.

I am assuming that a new Parser will be made every month, as continually loading the Parser object with more and more tradelines for years in a row will consume astronomical quantities of memory. The code for checking the date, however, has been left in for future-proofing.


2. I chose not to write this in REST API form, and instead opt for a script form, for simplicity's sake. This sample code could easily be converted into an Express-based API with a local instance of PouchDB (non-relational DBMS) though, simply by further abstraction of authentication, validation, and processing methods, and by adding in a robust suite of error messages. The email back from Earnest stated to keep it simple; I am just illustrating the possibility here.

It is also nice to mention that the prompt did not specify that I can assume the input would be uniform and normal, so I was forced to run a number of schema checks on the input data. If that can be safely assumed, the operations would be much faster, and the code much cleaner.


3. I figured that the best way to write this as a script would be to keep the operations in O(1) time, by calculating the total final costs as we input line by line, instead of reiterating through all processed tradelines again, which is O(n). I also assumed it was reasonable that a person would not make thousands of mortgage or credit card payments per month, so storing an array of processed tradelines for that month should be fairly lightweight for each constructed object.


4. A testing suite written using Mocha, Chai, and Sinon would have been appropriate, were it not for the time constraints. Console log test cases are used instead to demonstrate the concept.