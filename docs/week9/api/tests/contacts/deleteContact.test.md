### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[test index](../index.md) | [contactController.ts:deleteContact()](../../../../../backend/src/controllers/contactController.ts#L266-L309) | [documentation](../../endpoints/contacts/deleteContact.md) |
# `deleteContact()`
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

### Group
* userId: ObjectId
* name: String
* members?: [ObjectId]

## Tests
| No  | Description                            | Steps                                                                                                                                                                                                                                                                                                    | Expected Results                                                |
| --- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Delete contact without authentication  | 1. DELETE `/api/contacts/delete` with no data (while not logged in)                                                                                                                                                                                                                                      | 401 Unauthorized                                                |
| 2   | Delete ungrouped contact               | 1. Create a new contact `Contact1` with `userId` set to `User1`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/contacts/delete` with `id` set to `Contact1`'s id                                                                                                                                        | 200 OK<br>`Contact1` doesn't exist                              |
| 3   | Delete contact with no data            | 1. Log in<br>2. DELETE `/api/contacts/delete` with no data                                                                                                                                                                                                                                               | 400 Bad Request                                                 |
| 4   | Delete contact with invalid data       | 1. Log in<br>2. DELETE `/api/contacts/delete` with invalid `id`                                                                                                                                                                                                                                          | 400 Bad Request                                                 |
| 5   | Delete non-existing contact            | 1. Log in as `User1`<br>2. DELETE `/api/contacts/delete` with `id` set to `User1`'s id                                                                                                                                                                                                                   | 404 Not Found                                                   |
| 6   | Delete contact belonging to other user | 1. Create a new contact `Contact1` with `userId` set to `User2`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/contacts/delete` with `id` set to `Contact1`'s id                                                                                                                                        | 403 Forbidden                                                   |
| 7   | Delete grouped contact                 | 1. Create a new group `Group1` with no members<br>2. Create a new contact `Contact1` with `userId` set to `User1`'s id and `groupId` set to `Group1`'s id<br>3. Add `Contact1`'s id to `Group1`'s `members`<br>4. Log in as `User1`<br>5. DELETE `/api/contacts/delete` with `id` set to `Contact1`'s id | 200 OK<br>`Contact1` doesn't exist<br>`Group1` has zero members |