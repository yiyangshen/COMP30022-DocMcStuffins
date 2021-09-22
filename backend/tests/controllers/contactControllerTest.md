## Contact count test
| No  | Feature  | Description                                    | Steps                                                                                                        | Input | Expected Results         |
| --- | -------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----- | ------------------------ |
| 1   | Required | Get a contact count without being logged-in    | n/a                                                                                                          | n/a   | 401 Unauthorized         |
| 2   | Required | Get the contact count of the authenticaed user | <ol><li>Login</li><li>Add `x` contacts (if there aren't any already)</li> <li>Call getContactCount</li></ol> | n/a   | 200 OK, with `x` in data |

## Get Contacts (contact list) test
| No  | Feature  | Description                                        | Steps                                                                                 | Input          | Expected Results |
| --- | -------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------- | ---------------- |
| 1   | Required | Get contacts list without being authenticated      | n/a                                                                                   | n/a            | 401 Unauthorized |
| 2   | Required | Get list of contacts of an authenticated user      | <ol><li>Login and call</li><li>Make sure that contact details were returned</li></ol> | n/a            | 200 OK           |
| 3   | Required | Get a contacts list of a user without any contacts | n/a                                                                                   | 204 No Content |