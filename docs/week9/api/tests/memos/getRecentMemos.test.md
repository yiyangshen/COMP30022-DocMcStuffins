### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[test index](../index.md) | [memoController.ts:getRecentMemos()](../../../../../backend/src/controllers/memoController.ts#L253-L277) | [documentation](../../endpoints/memos/getRecentMemos.md) |
# [getRecentMemos()](../../../../../backend/src/controllers/memoController.ts)
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)

### Memo
* userId: ObjectId
* title: String
* notes?: String
* timestamps?: Timestamps
## Tests
| No  | Description                           | Steps                                                                      | Expected Results |
| --- | ------------------------------------- | -------------------------------------------------------------------------- | ---------------- |
| 1   | Request without being authenticated   | 1. GET `/api/memos/recent/n` (while not logged in)                         | 401 Unauthorized |
| 2   | Check for malformed request parameter | 1. Log in<br>2. GET `api/memos/recent/n` with `n = "something"`            | 400 Bad request  |
| 3   | No content were found                 | 1. Log in<br>2. GET `api/memos/recent/n` with `n = 1`                      | 204 No Content   |
| 4   | Successful query                      | 1. Log in<br>2. Add some memos<br>3. GET `api/memos/recent/n` with `n = 1` | 200 OK           |