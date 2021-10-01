### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:createGroup()](../../../../../backend/src/controllers/groupController.ts#L134-L198) | [documentation](../../endpoints/groups/createGroup.md) |
# `createGroup()`
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

### Group
* userId: ObjectId
* name: String
* members?: [ObjectId]

## Tests
| No  | Description                                | Steps                                                                                                                  | Expected Results                                   |
| --- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | Create new group without authentication    | 1. POST `/api/groups/new` (while not logged in)                                                                        | 401 Unauthorized                                   |
| 2   | Create new group with minimal valid data   | 1. Log in<br>2. POST `/api/groups/new` with valid `name`                                                               | 201 Created                                        |
| 3   | Create new group full valid data           | 1. Log in<br>2. POST `/api/groups/new` with complete valid data<br>3. Check that each contact is assigned to the group | 201 Created<br>Each contact's `groupId` is updated |
| 4   | Create new group with no data              | 1. Log in<br>2. POST `api/groups/new` with no data                                                                     | 400 Bad Request                                    |
| 5   | Create new group with minimal invalid data | 1. Log in<br>2. POST `/api/groups/new` with invalid `name`                                                             | 400 Bad Request                                    |
| 6   | Create new group with full invalid data    | 1. Log in<br>2. POST `/api/groups/new` with complete invalid data                                                      | 400 Bad Request                                    |