### Breadcrumbs

| Indices                                               | Implementation                                                                                              | Endpoint                                                     |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| [user index](./index.md)<br>[test index](../index.md) | [userController.ts:amendProfileDetails()](../../../../../backend/src/controllers/userController.ts#L28-L71) | [documentation](../../endpoints/user/amendProfileDetails.md) |

# `amendProfileDetails()`
## Relevant Models
> Attributes ending with '?' are optional
### User
* email: String
* name: Name
* password: String (min. length 6)

### Name
* first: String
* middle?: String
* last: String

## Tests
| No  | Description                           | Steps                                                                                                | Expected Results                                        |
| --- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Amend profile without authentication  | 1. PATCH `/api/user/profile/amend` with no data (while not logged in)                                | 401 Unauthorized                                        |
| 2   | Amend profile with no data            | 1. Login<br>2. PATCH `/api/user/profile/amend` with no data                                          | 400 Bad Request                                         |
| 3   | Amend profile with incomplete data    | 1. Login<br>2. PATCH `/api/user/profile/amend` with missing `firstName`                              | 400 Bad Request                                         |
| 4   | Amend profile with invalid `email`    | 1. Login<br>2. PATCH `/api/user/profile/amend` with invalid `email`                                  | 400 Bad Request                                         |
| 5   | Amend profile with invalid `password` | 1. Login<br>2. PATCH `/api/user/profile/amend` with invalid `password` (< min. length)               | 400 Bad Request                                         |
| 6   | Amend profile with minimal data       | 1. Login as `User1`<br>2. PATCH `/api/user/profile/amend` with all fields filled except `middleName` | 200 OK<br>`User1`'s details have been updated correctly |
| 7   | Amend profile with full data          | 1. Login as `User1`<br>2. PATCH `/api/user/profile/amend` with all fields filled                     | 200 OK<br>`User1`'s details have been updated correctly |
