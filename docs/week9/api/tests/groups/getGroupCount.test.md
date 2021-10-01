### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:getGroupCount()](../../../../../backend/src/controllers/groupController.ts#L263-L273) | [documentation](../../endpoints/groups/getGroupCount.md) |
# `getGroupCount()`
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
| No  | Description                                   | Steps                                                                                                               | Expected Results         |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1   | Get a group count without being logged-in     | 1. GET `api/groups/count` (while being logged out)                                                                  | 401 Unauthorized         |
| 2   | Get the group count of the authenticated user | 1. Login<br>2. Add `x` contacts (if there aren't any already)<br>3. GET `api/groups/count` (while being logged out) | 200 OK, with `x` in data |