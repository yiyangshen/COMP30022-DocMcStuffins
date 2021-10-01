### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[test index](../index.md) | [contactController.ts:createContact()](../../../../../backend/src/controllers/contactController.ts#L162-L253) | [documentation](../../endpoints/contacts/createContact.md) |
# `createContact()`
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
* timestamps?: Timestamps

## Tests
| No  | Description                                                                   | Steps                                                                                                                                                 | Expected                                  |
| --- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1   | Create new contact without authentication                                     | 1. POST `api/contacts/new` (while being logged out)                                                                                                   | 401 Unauthorized                          |
| 2   | Create new contact with minimal valid data                                    | 1. Log in<br>2. POST `api/contacts/new` with valid `firstName` and `lastName`                                                                         | 201 Created                               |
| 3   | Create new contact with full valid data                                       | 1. Log in<br>2. POST `api/contacts/new` with all valid fields                                                                                         | 201 Created                               |
| 4   | Create new contact with no data                                               | 1. Log in<br>2. POST `api/contacts/new` with empty data                                                                                               | 400 Bad Request                           |
| 5   | Create new contact with minimal invalid data                                  | 1. Log in<br>2. POST `api/contacts/new` with invalid `firstName` and `lastName`                                                                       | 400 Bad Request                           |
| 6   | Create new contact with full invalid data                                     | 1. Log in<br>2. POST `api/contacts/new` with all invalid fields                                                                                       | 400 Bad Request                           |
| 7   | Create new contact with minimal valid data and assign it to an existing group | 1. Log in<br>2. POST `api/contacts/new` with valid `firstName`, `lastName` and `groupId`<br>3. Check the group member count associated with `groupId` | 201 Created<br>`group.members.length > 0` |