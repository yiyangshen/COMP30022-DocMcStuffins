## Contents
- [Contents](#contents)
- [Relevant Models](#relevant-models)
  - [User](#user)
  - [Name](#name)
- [Registration Test](#registration-test)


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
| No  | Feature         | Description                              | Steps                                                               | Input | Expected Results | Implemented |
| --- | --------------- | ---------------------------------------- | ------------------------------------------------------------------- | ----- | ---------------- | ----------- |
| 1   | Required fields | Try sending empty data                   | 1. Send a post request with empty field                             | n/a   | 400 Bad request  | ❌           |
| 2   | Required fields | Register by only sending required fields | 1. Send a post request with every fields except `middle` for `Name` | n/a   | Success          | ❌           |
| 3   | Optional fields | Register by sending all fields           | 1. Send a post request with every fields                            | n/a   | Success          | ✅           |
