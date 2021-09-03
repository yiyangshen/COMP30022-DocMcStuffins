## Relevant Models
> Bold attributes are **required**
### User
* **email** (String)
* **name** (Name)
* **password** (String, min. length 6)

### Name
* **first** (String)
* middle (String)
* **last** (String)

## Registration Test
| No  | Feature         | Description                                      | Steps                                                               | Input              | Expected Results | Implemented |
| --- | --------------- | ------------------------------------------------ | ------------------------------------------------------------------- | ------------------ | ---------------- | ----------- |
| 1   | Required fields | Try sending empty data                           | 1. Send a post request with empty field                             | n/a                | 400 Bad request  | ✅           |
| 2   | Required fields | Register by only sending required fields         | 1. Send a post request with every fields except `middle` for `Name` | `EMAIL_TR0`        | 200 Success      | ✅           |
| 3   | Optional fields | Register by sending all fields                   | 1. Send a post request with every fields                            | `EMAIL_TR1`        | 200 Success      | ✅           |
| 4   | Required fields | Register with less than required password length | 1. Send a post request with `password.length < 6`                   | 1. `password=0123` | 400 Bad Request  | ✅           |
| 5   | Required fields | Register with a pre-existing email address       | 1. Send a post request with `email` already registered before       | `EMAIL_TR2`        | 404 Not Found    | ✅           |

## Login Test
| No  | Feature         | Description                         | Steps                                                          | Input               | Expected Results | Implemented |
| --- | --------------- | ----------------------------------- | -------------------------------------------------------------- | ------------------- | ---------------- | ----------- |
| 1   | Required fields | Login with empty data               | 1. Send a post request with empty field                        | n/a                 | 400 Bad request  | ✅           |
| 2   | Required fields | Login with valid email and password | 1. Send post request with valid email and password             | n/a                 | 200 Success      | ✅           |
| 3   | Required fields | Login with invalid email            | 1. Send post request with invalid (unregistered email)         | n/a                 | 404 Not Found    | ✅           |
| 4   | Required fields | Login with incorrect password       | 1. Send a post request with valid email but incorrect password | 1. `password='012'` | 401 Unauthorised | ✅           |
