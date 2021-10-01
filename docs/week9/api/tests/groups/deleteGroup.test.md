### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:deleteGroup()](../../../../../backend/src/controllers/groupController.ts#L211-L255) | [documentation](../../endpoints/groups/deleteGroup.md) |
# `deleteGroup()`
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
| No  | Description                          | Steps                                                                                                                                                                                                                                                                                                | Expected Results                                            |
| --- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1   | Delete group without authentication  | 1. DELETE `/api/groups/delete` with no data (while not logged in)                                                                                                                                                                                                                                    | 401 Unauthorized                                            |
| 2   | Delete group with no members         | 1. Create a new group `Group1` with `userId` set to `User1`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/groups/delete` with `id` set to `Group1`'s id                                                                                                                                            | 200 OK<br>`Group1` doesn't exist                            |
| 3   | Delete group with no data            | 1. Log in<br>2. DELETE `/api/groups/delete` with no data                                                                                                                                                                                                                                             | 400 Bad Request                                             |
| 4   | Delete group with invalid data       | 1. Log in<br>2. DELETE `/api/groups/delete` with invalid `id`                                                                                                                                                                                                                                        | 400 Bad Request                                             |
| 5   | Delete non-existing group            | 1. Log in as `User1`<br>2. DELETE `/api/groups/delete` with `id` set to `User1`'s id                                                                                                                                                                                                                 | 404 Not Found                                               |
| 6   | Delete group belonging to other user | 1. Create a new group `Group1` with `userId` set to `User2`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/groups/delete` with `id` set to `Group1`'s id                                                                                                                                            | 403 Forbidden                                               |
| 7   | Delete group with one member         | 1. Create a new group `Group1` with no members and `userId` set to `User1`'s id<br>2. Create a new contact `Contact1` with `groupId` set to `Group1`'s id<br>3. Add `Contact1`'s id to `Group1`'s `members`<br>4. Log in as `User1`<br>5. DELETE `/api/groups/delete` with `id` set to `Group1`'s id | 200 OK<br>`Group1` doesn't exist<br>`Contact1` is ungrouped |