# [getContactDetails()](../../../../../backend/src/controllers/contactController.ts)
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)

### Name
* first: String
* middle?: String
* last: String

### Contact
* userId: ObjectId
* groupId?: ObjectId
* name: Name
* gender?: String
* dateofBirth?: Date
* lastMet?: Date
* phoneNumber?: String
* email?: String
* photo?: String
* relationship?: String
* additionalNotes?: String
* timestamps: Timestamps

### Timestamps
* created: date
* viewed: date
* modified: date

## Tests
| No  | Description                                                        | Steps                                                                                         | Expected                               |
| --- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------- |
| 1   | Get contact details without authentication                         | 1. GET `api/contacts/details/:id` (while being logged out)                                    | 401 Unauthorized                       |
| 2   | Get contact details with malformed parameter                       | 1. Log in<br>2. GET `api/contacts/details/:id` with malformed `id`                            | 400 Bad Request                        |
| 3   | Get contact details with contact ID not belonging to the requester | 1. Log in<br>2. GET `api/contacts/details/:id` with `id` being the contact ID of another user | 403 Forbidden                          |
| 4   | Get contact details with contact ID that does not exist            | 1. Log in<br>2. GET `api/contacts/details/:id` with `id` some new objectid                    | 404 Not Found                          |
| 5   | Get contact details successfully                                   | 1. Log in<br>2. GET `api/contacts/details/:id` with the correct `id`                          | 200 OK, with requested contact details |
[back to index](./index.md)