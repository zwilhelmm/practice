Timestamp needs to be system generated.

# HackerOne REST API Coding Challenge.

`@author Gordon Zhang`

### How to install and run.
Disclaimer: This was written on Mac OS Catalina 10.15. I have not yet tried this on any other operating system.

1. Ensure that you have NodeJS and npm installed.
  * NodeJS is a runtime environment for Javascript, and can be found here: `https://nodejs.org/en/`
    * Warning, breaking: Installing a version of NodeJS older than 10.X.X will not work.
  * You can install and learn more about npm, the Node package manager, here: `https://www.npmjs.com`
    * You can alternatively install using Homebrew, if you have it.
  * Running commands `node -v` and `npm -v` should verify that everything is installed properly.
2. Ensure that you have the following files in this directory:
```
src/index.js
src/reporter.js
package.json
README.md (this file)
```
3. Run `npm install` to get the libraries installed.
4. Run `node src/index.js` to start the app.
  * Because the code will take a port based on an environment variable, else defaulting to 3000, you can curl to the app using: `http://localhost:<yourporthere>`.
  * Everything will run locally, including the database.

### Schema.
* POST /reports
```
params: {},
body: {
  "title": String,
	"description": String,
	"createdBy": String,
	"createdAt": Number
}
```

Example:
```
params: {},
body: {
	"title": "Alice",
	"description": "The magic words are squeamish ossifrage.",
	"createdBy": "alice@user",
	"createdAt": 1234
}
```
results in:
```
{
    "ok": true,
    "id": "47375de9-252f-4a9f-a4f6-a031a35f4d26",
    "rev": "1-a29972239c32b36cd1b6dc55004df79c"
}
```

* GET /reports
```
params: {},
body: {}
```

Example:
```
params: {},
body: {}
```
results in:
```
{
    "total_rows": 12,
    "offset": 0,
    "rows": [
        {
            "id": "0e3e1129-60be-4e55-a3aa-f690ea435db3",
            "key": "0e3e1129-60be-4e55-a3aa-f690ea435db3",
            "value": {
                "rev": "1-7103fdd7762eab5979fd12a49253c1c6"
            },
            "doc": {
                "title": "Sam",
                "description": "Hello world.",
                "createdBy": "charlie@user",
                "createdAt": 1234,
                "_id": "0e3e1129-60be-4e55-a3aa-f690ea435db3",
                "_rev": "1-7103fdd7762eab5979fd12a49253c1c6"
            }
        },
        {
            "id": "26926dfd-330a-4f6f-9f6a-090c4363501a",
            "key": "26926dfd-330a-4f6f-9f6a-090c4363501a",
            "value": {
                "rev": "1-d0d190f9001a13d5811438368ff73d0b"
            },
            "doc": {
                "title": "Alice",
                "description": "Hello world.",
                "createdBy": "alice@user",
                "createdAt": 1234,
                "_id": "26926dfd-330a-4f6f-9f6a-090c4363501a",
                "_rev": "1-d0d190f9001a13d5811438368ff73d0b"
            }
        }, ... (more entries, truncated for brevity)
    ]
}
```

* GET /reports/:report_id
```
params: {
  report_id: String
},
body: {}
```

Example:
```
params: {
  report_id: "47375de9-252f-4a9f-a4f6-a031a35f4d26"
},
body: {}
```
results in:
```
{
    "title": "Alice",
    "description": "The magic words are squeamish ossifrage.",
    "createdBy": "alice@user",
    "createdAt": 1234,
    "_id": "47375de9-252f-4a9f-a4f6-a031a35f4d26",
    "_rev": "1-a29972239c32b36cd1b6dc55004df79c"
}
```

* PATCH and PUT /reports/:report_id
```
params: {
  report_id: String
},
body: {
  <String>: String
}
```

Example:
```
params: {
  report_id: "47375de9-252f-4a9f-a4f6-a031a35f4d26"
},
body: {
  title: "Bob"
}
```
results in:
```
{
    "ok": true,
    "id": "47375de9-252f-4a9f-a4f6-a031a35f4d26",
    "rev": "2-8c3b37a87490c3b0b809d7e0184d6720"
}
```

* Errors:
  * All errors with an improper schema is currently filed under status 400, and typically indicates an issue on the client's side.
  * All errors where no target document can be found for a given primary key is currently filed under status 404.
  * All other errors are currently being blanket-caught as status 500, and typically denotes an issue on our side.

### Design decisions and assumptions.
The first design decision was how to structure the API beyond the basic CRUD functions. We know that each of these corresponds to POST, GET, PATCH/PUT, and DELETE, but not necessarily how to organize the methods that they use. Async/await is used more favorably over Promises here, solely for readabiliy.

It is important, however, to specify why CREATE -> PUT, instead of POST. This is because the database library we are using, PouchDB, a wrapper over CouchDB, generates unique keys automatically with which to index its data. Using POST requires you to specify your own id, which will ruin the database's ability to return things properly in a getAll() function. This is explicitly stated in PouchDB's documentation. 

Deletion also recommends to use PUT instead of DELETE for continuity during replication reasons, since non-relational databases (like PouchDB) aims for eventual consistency.

The second decision was whether or not PATCH or PUT should be used, and if there even is a difference at all for this specific use case. It was determined that PATCH more closely corresponds to modification, whereas PUT was more intuitively replacement. Nonetheless, in implementation, they are essentially the same for our use case, as we are simply specifying fields to update, and if you wanted to replace a document, simply specify all of its fields.

The third decision was whether or not to make our own primary key instead of the auto-generated one by PouchDB, which would have been an encoded, hashed concatenation of several fields together. This idea was almost immediately scrapped, since these fields would be freely editable with PATCH/PUT commands, thus rendering the key's contents useless, e.g. a key based on Alice's document, which is later edited to be authored by Bob instead, resulting in a document-key mismatch.

A small decision to loosely enforce the keys of these reports was also made; the API will not block additional fields.

Also note that this API only currently supports the creation of one report at a time.

### Next steps.
Firstly, it goes without saying that the API is not yet fully tested, given the time restraints. A small sample of what the tests could look like has been provided in the test folder, under test.js.

Currently, it only has one positive case, which is testing that the API can be posted to at all, and no negative cases, e.g. what happens if you try to submit an empty body, submit a report without some or all of the required fields, etc. These cases would be relatively simple to implement; it would just take additional time. The positive case, however, has been left in to demonstrate the principle.

Secondly, the app is not secured with any form of authentication in any way whatsoever. If the API is to eventually utilize something like IAM, or another token service, we could add a function that queries that authority to verify and validate the token, and cache the result.

We are also used a very rudimentary schema check, instead of something more comprehensive like Mongoose or abacus-schema, etc. I am using a very basic type-checking over the curl body and keys just to barely get by the requirements, just in case follow-up questions do not agree with committing to a specific tool or library to check schema.

Thirdly, we are also assuming the API is receiving only a very small number of documents at the moment. It is likely that pagination and API keys will have to eventually be used when the database gets too unwieldly to call all of its entries at once, all into memory.

Warning: the timestamps in these kinds of APIs should almost always be system generated, instead of human-specified. I cannot currently imagine a single use case where it is best for humans to write in the millisecond count on things, especially things like report generation, instead of simply invoking Date.now(), which I am doing here.