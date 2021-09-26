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
| No  | Description                          | Steps                                                                                                                                                          | Expected Results                                |
| --- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 1   | Amend memo without authentication    | 1. PATCH `/api/memos/details/amend` with no data (while not logged in)                                                                                         | 401 Unauthorized                                |
| 2   | Amend existing memo                  | 1. Create a new memo `Memo1`<br>2. Log in<br>3. PATCH `/api/memos/details/amend` with `id` set to `Memo1`'s id and a different `title` and `notes`             | 200 OK<br>`Memo1`'s `title` and `notes` updated |
| 3   | Amend memo with no data              | 1. Log in<br>2. PATCH `/api/memos/details/amend` with no data                                                                                                  | 400 Bad Request                                 |
| 4   | Amend memo with invalid data         | 1. Log in<br>2. PATCH `/api/memos/details/amend` with invalid `id`                                                                                             | 400 Bad Request                                 |
| 5   | Amend non-existing memo              | 1. Log in as `User1`<br>2. PATCH `/api/memos/details/amend` with `id` set to `User1`'s id                                                                      | 404 Not Found                                   |
| 6   | Amend memo belonging to another user | 1. Create a new contact `Memo1` with `userId` set to `User2`'s id<br>2. Log in as `User1`<br>3. PATCH `/api/memos/details/amend` with `id` set to `Memo1`'s id | 403 Forbidden                                   |