### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[test index](../index.md) | [groupController.ts:getGroups()](../../../../../backend/src/controllers/groupController.ts#L323-L337) | [documentation](../../endpoints/groups/getGroups.md) |
# `getGroups()`
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)
### Group
* userId: ObjectId
* name: String
* members?: [ObjectId]
## Tests
| No  | Description                                 | Steps                            | Expected Results                   |
| --- | ------------------------------------------- | -------------------------------- | ---------------------------------- |
| 1   | Get group list without being logged-in      | 1. GET `api/groups`              | 401 Unauthorized                   |
| 2   | Get list of groups of an authenticated user | 1. Log in<br>2. GET `api/groups` | 200 OK, with list of user's groups |