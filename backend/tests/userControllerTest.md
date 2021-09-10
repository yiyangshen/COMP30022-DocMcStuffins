## Relevant Models
> Bold attributes are required
### User
* **email** (String)
* **name** (Name)
* **password** (String, min. length 6)

### Name
* **first** (String)
* middle (String)
* **last** (String)

## Register Test
| No | Description                       | Steps                                                                                    | Expected Results |
|----|-----------------------------------|------------------------------------------------------------------------------------------|------------------|
| 1  | Register successfully             | 1. Register with a well formed body                                                      | 201 Created      |
| 2  | Missing a required field          | 1. Register with a missing `firstName` field                                             | 400 Bad Request  |
| 3  | Password length < 6               | 1. Register with `password` field of length < 6                                          | 403 Forbidden    |
| 4  | User is already authenticated     | 1. Register a user (subsequently logging in the user)<br>2. Register another user        | 403 Forbidden    |
| 5  | Email address has already existed | 1. Register a user<br>2. Log out<br>3. Register another user with the same `email` field | 403 Forbidden    |

## Login Test
| No | Description        | Steps                                                           | Expected Results |
|----|--------------------|-----------------------------------------------------------------|------------------|
| 1  | Login successfully | 1. Login with an existing `email` and `password`                | 200 OK           |
| 2  | Missing a field    | 1. Login with no `password` field                               | 400 Bad Request  |
| 3  | Wrong `email`      | 1. Login with a non-existing `email` but an existing `password` | 403 Forbidden    |
| 4  | Wrong `password`   | 1. Login with an existing `email` but a non-existing `password` | 403 Forbidden    |

## Logout Test
| No | Description                 | Steps                 | Expected Results |
|----|-----------------------------|-----------------------|------------------|
| 1  | Logout when authenticated   | 1. Login<br>2. Logout | 200 OK           |
| 2  | Logout when unauthenticated | 1. Logout             | 401 Unauthorized |

## Get User Profile Test
| No | Description                      | Steps                      | Expected Results                                                         |
|----|----------------------------------|----------------------------|--------------------------------------------------------------------------|
| 1  | Get profile when authenticated   | 1. Login<br>2. Get profile | 200 OK<br>`username` retrieved matches with the one used when logging in |
| 2  | Get profile when unauthenticated | 1. Get profile             | 401 Unauthorized                                                         |
