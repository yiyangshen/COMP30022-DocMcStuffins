## Tests
| No  | Description                                        | Steps                                                                                 | Input          | Expected Results |
| :-- | :------------------------------------------------- | :------------------------------------------------------------------------------------ | :------------- | ---------------- |
| 1   | Get contacts list without being authenticated      | n/a                                                                                   | n/a            | 401 Unauthorized |
| 2   | Get list of contacts of an authenticated user      | <ol><li>Login and call</li><li>Make sure that contact details were returned</li></ol> | n/a            | 200 OK           |
| 3   | Get a contacts list of a user without any contacts | n/a                                                                                   | 204 No Content |                  |
