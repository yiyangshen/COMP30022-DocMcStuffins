## Tests
| No  | Description                                 | Steps                                                                               | Input | Expected Results |
| --- | ------------------------------------------- | ----------------------------------------------------------------------------------- | ----- | ---------------- |
| 1   | Get group list without being logged-in      | n/a                                                                                 | n/a   | 401 Unauthorized |
| 2   | Get list of groups of an authenticated user | <ol><li>Login and call</li><li>Make sure that group details were returned</li></ol> | n/a   | 200 OK           |
