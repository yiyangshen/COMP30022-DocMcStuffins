### Breadcrumbs

| Indices | Implementation | Endpoint |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[test index](../index.md) | [memoController.ts:getMemos()](../../../../../backend/src/controllers/memoController.ts#L227-L246) | [documentation](../../endpoints/memos/getMemos.md) |
# `getMemos()`
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
| No  | Description                         | Steps                                           | Expected Results |
| --- | ----------------------------------- | ----------------------------------------------- | ---------------- |
| 1   | Request without being authenticated | 1. GET `/api/memos` (while not logged in)       | 401 Unauthorized |
| 2   | No content were found               | 1. Log in<br>2. GET `api/memos`                 | 204 No Content   |
| 3   | Successful query                    | 1. Log in<br>3. Add memos<br>2. GET `api/memos` | 200 OK           |