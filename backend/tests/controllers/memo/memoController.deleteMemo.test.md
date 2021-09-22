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
| No  | Description                         | Steps                                                                                                                                                 | Expected Results                |
| --- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 1   | Delete memo without authentication  | 1. DELETE `/api/memos/delete` with no data (while not logged in)                                                                                      | 401 Unauthorized                |
| 2   | Delete existing memo                | 1. Create a new memo `Memo1` with `userId` set to `User1`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/memos/delete` with `id` set to `Memo1`'s id | 200 OK<br>`Memo1` doesn't exist |
| 3   | Delete memo with no data            | 1. Log in<br>2. DELETE `/api/memos/delete` with no data                                                                                               | 400 Bad Request                 |
| 4   | Delete memo with invalid data       | 1. Log in<br>2. DELETE `/api/memos/delete` with invalid `id`                                                                                          | 400 Bad Request                 |
| 5   | Delete non-existing memo            | 1. Log in as `User1`<br>2. DELETE `/api/memos/delete` with `id` set to `User1`'s id                                                                   | 404 Not Found                   |
| 6   | Delete memo belonging to other user | 1. Create a new memo `Memo1` with `userId` set to `User2`'s id<br>2. Log in as `User1`<br>3. DELETE `/api/memos/delete` with `id` set to `Memo1`'s id | 403 Forbidden                   |