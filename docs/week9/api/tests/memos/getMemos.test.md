## Tests
| No  | Description                         | Steps                                              | Expected Results |
| --- | ----------------------------------- | -------------------------------------------------- | ---------------- |
| 1   | Request without being authenticated | n/a                                                | 401 Unauthorized |
| 2   | No content were found               | 1. Send a request without adding memos before-hand | 204 No Content   |
| 3   | Successful query                    | 1. Create memos and then send a request            | 200 OK           |