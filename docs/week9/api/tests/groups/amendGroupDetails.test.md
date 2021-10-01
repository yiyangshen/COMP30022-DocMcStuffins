### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:amendGroupDetails()](../../../../../backend/src/controllers/groupController.ts#L28-L122) | [documentation](../../endpoints/groups/amendGroupDetails.md) |
# `amendGroupDetails()`
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
| No  | Description                                     | Steps                                                                                                                                                                                                                                                                                                         | Expected Results                                                                                                                                                                                                                                                                                                                                                                          |
| --- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Amend group without authentication              | 1. PATCH `/api/groups/details/amend` with no data (while not logged in)                                                                                                                                                                                                                                       | 401 Unauthorized                                                                                                                                                                                                                                                                                                                                                                          |
| 2   | Amend existing group without changing `members` | 1. Create a new group `Group1`<br>2. Log in<br>3. PATCH `/api/groups/details/amend` with `id` set to `Group1`'s id and a different `name`                                                                                                                                                                     | 200 OK<br>`Group1`'s `name` updated                                                                                                                                                                                                                                                                                                                                                       |
| 3   | Amend group with no data                        | 1. Log in<br>2. PATCH `/api/groups/details/amend` with no data                                                                                                                                                                                                                                                | 400 Bad Request                                                                                                                                                                                                                                                                                                                                                                           |
| 4   | Amend group with invalid data                   | 1. Log in<br>2. PATCH `/api/groups/details/amend` with invalid `id`                                                                                                                                                                                                                                           | 400 Bad Request                                                                                                                                                                                                                                                                                                                                                                           |
| 5   | Amend non-existing group                        | 1. Log in as `User1`<br>2. PATCH `/api/groups/details/amend` with `id` set to `User1`'s id                                                                                                                                                                                                                    | 404 Not Found                                                                                                                                                                                                                                                                                                                                                                             |
| 6   | Amend group belonging to another user           | 1. Create a new contact `Group1` with `userId` set to `User2`'s id<br>2. Log in as `User1`<br>3. PATCH `/api/groups/details/amend` with `id` set to `Group1`'s id                                                                                                                                             | 403 Forbidden                                                                                                                                                                                                                                                                                                                                                                             |
| 7   | Amend existing group while changing `members`   | 1. Create two new groups `Group1` and `Group2`<br>2. Create a new contact `Contact1`<br>3. PATCH `/api/groups/details/amend` with `id` set to `Group1`'s id and `members` consisting of `Contact1`'s id<br>4. Repeat step 3 but with `id` set to `Group2`'s id<br>5. Repeat step 4 but with `members` not set | 200 OK (on each of step 3-5)<br>Step 3: `Contact1`'s `groupId` becomes `Group1`'s id, `Group1`'s `members` consists of `Contact1`'s id<br>Step 4: `Contact1`'s `groupId` becomes `Group2`'s id, `Group1`'s and `Group2`'s `members` becomes empty and consists of `Contact1`'s id, respectively<br>Step 5: `Contact1`'s `groupId` becomes `undefined`, `Group2`'s `members` becomes empty |