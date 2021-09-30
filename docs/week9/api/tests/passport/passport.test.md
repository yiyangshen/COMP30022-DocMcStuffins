# [passportController](../../../../../backend/src/controllers/memoController.ts)
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

### Name
* first: String
* middle?: String
* last : String

## Registration Test
| No  | Description                                      | Steps                                                               | Expected Results |
| --- | ------------------------------------------------ | ------------------------------------------------------------------- | ---------------- |
| 1   | Try sending empty data                           | 1. Send a post request with empty field                             | 400 Bad request  |
| 2   | Register by only sending required fields         | 1. Send a post request with every fields except `middle` for `Name` | 200 Success      |
| 3   | Register by sending all fields                   | 1. Send a post request with every fields                            | 200 Success      |
| 4   | Register with less than required password length | 1. Send a post request with `password.length < 6`                   | 400 Bad Request  |
| 5   | Register with a pre-existing email address       | 1. Send a post request with `email` already registered before       | 404 Not Found    |

## Login Test
| No  | Description                         | Steps                                                          | Expected Results |
| --- | ----------------------------------- | -------------------------------------------------------------- | ---------------- |
| 1   | Login with empty data               | 1. Send a post request with empty field                        | 400 Bad request  |
| 2   | Login with valid email and password | 1. Send post request with valid email and password             | 200 Success      |
| 3   | Login with invalid email            | 1. Send post request with invalid (unregistered email)         | 404 Not Found    |
| 4   | Login with incorrect password       | 1. Send a post request with valid email but incorrect password | 401 Unauthorized |
