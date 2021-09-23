## Get Contacts (contact list) test
| No  | Feature  | Description                                        | Steps                                                                                 | Input          | Expected Results |
| --- | -------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------- | ---------------- |
| 1   | Required | Get contacts list without being authenticated      | n/a                                                                                   | n/a            | 403 Forbidden    |
| 2   | Required | Get list of contacts of an authenticated user      | <ol><li>Login and call</li><li>Make sure that contact details were returned</li></ol> | n/a            | 200 OK           |
| 3   | Required | Get a contacts list of a user without any contacts | n/a                                                                                   | 204 No Content |