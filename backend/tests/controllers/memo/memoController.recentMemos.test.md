
## Recent memos test
| No  | Description                         | Steps                                              | Expected Results |
| --- | ----------------------------------- | -------------------------------------------------- | ---------------- |
| 1   | Request without being authenticated | n/a                                                | 403 Forbidden    |
| 2   | Check for malformed request parameter    | 1. Send a request without `n`                      | 400 Bad request  |
| 3   | No content were found               | 1. Send a request without adding memos before-hand | 204 No Content   |
| 4   | Successful query                    | 1. Create memos and then send a request            | 200 OK           |