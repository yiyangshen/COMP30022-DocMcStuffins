## Group list (getGroups) test
| No  | Feature  | Description                                 | Steps                                                                               | Input | Expected Results |
| --- | -------- | ------------------------------------------- | ----------------------------------------------------------------------------------- | ----- | ---------------- |
| 1   | Required | Get group list without being logged-in      | n/a                                                                                 | n/a   | 403 Forbidden    |
| 2   | Required | Get list of groups of an authenticated user | <ol><li>Login and call</li><li>Make sure that group details were returned</li></ol> | n/a   | 200 OK           |