### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:getContacts()](../../../../../backend/src/controllers/contactController.ts#L390-L410) | [documentation](../../endpoints/contacts/getContacts.md) |
# `getContacts()`
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)
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
| No   | Description                                        | Steps                              | Expected Results                         |
| :--- | :------------------------------------------------- | :--------------------------------- | ---------------------------------------- |
| 1    | Get contacts list without being authenticated      | 1. GET `api/contacts`              | 401 Unauthorized                         |
| 2    | Get list of contacts of an authenticated user      | 1. Log in<br>2. GET `api/contacts` | 200 OK, with list of all the user's      |
| 3    | Get a contacts list of a user without any contacts | 1. Log in<br>2. GET `api/contacts` | 204 No Content, with nothing in the body |