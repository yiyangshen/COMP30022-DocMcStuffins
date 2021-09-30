# [createMemo()](../../../../../backend/src/controllers/memoController.ts)
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

| No  | Description                               | Steps                                                            | Expected Results |
| --- | ----------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| 1   | Create new memo without authentication    | 1. POST `/api/memos/new` (while not logged in)                   | 401 Unauthorized |
| 2   | Create new memo with minimal valid data   | 1. Log in<br>2. POST `/api/memos/new` with valid `title`         | 201 Created      |
| 3   | Create new memo full valid data           | 1. Log in<br>2. POST `/api/memos/new` with complete valid data   | 201 Created      |
| 4   | Create new memo with no data              | 1. Log in<br>2. POST `api/memos/new` with no data                | 400 Bad Request  |
| 5   | Create new memo with minimal invalid data | 1. Log in<br>2. POST `/api/memos/new` with invalid `title`       | 400 Bad Request  |
| 6   | Create new memo with full invalid data    | 1. Log in<br>2. POST `/api/memos/new` with complete invalid data | 400 Bad Request  |
[back to index](./index.md)