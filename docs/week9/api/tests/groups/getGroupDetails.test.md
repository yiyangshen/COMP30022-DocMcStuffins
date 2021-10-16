### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:getGroupDetails()](../../../../../backend/src/controllers/groupController.ts#L290-L323) | [documentation](../../endpoints/groups/getGroupDetails.md) |
# `getGroupDetails()`
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

### Group
* userId: ObjectId
* name: String
* members: [ObjectId]


## getGroupDetails Tests
| No  | Description                                                    | Steps                                                                                      | Expected         |
| --- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| 1   | Get group details without authentication                       | 1. GET `api/group/details/:id` (while being logged out)                                    | 401 Unauthorized |
| 2   | Get group details with malformed parameter                     | 1. Log in<br>2. GET `api/group/details:id` with malformed `id`                             | 400 Bad Request  |
| 3   | Get group details with group ID not belonging to the requester | 1. Log in<br>2. GET `api/group/details/:id` with `id` being the contact ID of another user | 403 Forbidden    |
| 4   | Get group details with group ID that does not exist            | 1. Log in<br>2. GET `api/group/details/:id` with `id` being some new objectid              | 404 Not Found    |
| 5   | Get group details successfully                                 | 1. Log in<br>2. GET `api/group/details/:id` with the correct `id`                          | 200 OK           |