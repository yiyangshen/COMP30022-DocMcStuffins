### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[test index](../index.md) | [contactController.ts:getContactCount()](../../../../../backend/src/controllers/contactController.ts#L317-L327) | [documentation](../../endpoints/contacts/getContactCount.md) |
# `getContactCount()`
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
| No   | Description                                    | Steps                                                                                                                 | Expected Results         |
| :--- | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1    | Get a contact count without being logged-in    | 1. GET `api/contacts/count` (while being logged out)out                                                               | 401 Unauthorized         |
| 2    | Get the contact count of the authenticaed user | 1. Login<br>2. Add `x` contacts (if there aren't any already)<br>3. GET `api/contacts/count` (while being logged out) | 200 OK, with `x` in data |