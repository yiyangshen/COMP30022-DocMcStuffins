## Tests
| No  | Description                                    | Steps                                                                                                        | Input | Expected Results         |
| :-- | :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | ----- | ------------------------ |
| 1   | Get a contact count without being logged-in    | n/a                                                                                                          | n/a   | 401 Unauthorized         |
| 2   | Get the contact count of the authenticaed user | <ol><li>Login</li><li>Add `x` contacts (if there aren't any already)</li> <li>Call getContactCount</li></ol> | n/a   | 200 OK, with `x` in data |
