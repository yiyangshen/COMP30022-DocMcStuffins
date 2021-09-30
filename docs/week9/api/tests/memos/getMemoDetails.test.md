# [getMemoDetails()](../../../../../backend/src/controllers/memoController.ts)
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)

### Memo
* userId: ObjectId
* title: String
* notes: String
* timestamps: Timestamps

## getMemoDetails Tests
| No  | Description                                                  | Steps                                                                                   | Expected         |
| --- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ---------------- |
| 1   | Get memo details without authentication                      | 1. GET `api/memos/details/:id` (while being logged out)                                 | 401 Unauthorized |
| 2   | Get memo details with malformed parameter                    | 1. Log in<br>2. GET `api/memos/details/:id` with malformed `id`                         | 400 Bad Request  |
| 3   | Get memo details with memo ID not belonging to the requester | 1. Log in<br>2. GET `api/memos/details/:id` with `id` being the memo ID of another user | 403 Forbidden    |
| 4   | Get memo details with memo ID that does not exist            | 1. Log in<br>2. GET `api/memos/details/:id` with `id` some new objectid                 | 404 Not Found    |
| 5   | Get memo details successfully                                | 1. Log in<br>2. GET `api/memos/details/:id` with the correct `id`                       | 200 OK           |
[back to index](./index.md)