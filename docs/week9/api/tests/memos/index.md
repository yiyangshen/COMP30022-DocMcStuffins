# Memo Routes Tests

| Functionality name                             | REST endpoint        | HTTP request method |
| :--------------------------------------------- | :------------------- | :------------------ |
| [Creation](./createMemo.test.md)               | `/memos/new`         | `POST`              |
| [Deletion](./deleteMemo.test.md)               | `/memos/delete`      | `POST`              |
| [Detail amendment](./amendMemoDetails.test.md) | `/memos/amend`       | `PATCH`             |
| [Detail retrieval](./getMemoDetails.test.md)   | `/memos/details/:id` | `GET`               |
| [Listing](./getMemos.test.md)                  | `/memos/`            | `GET`               |
| [Listing recentmost](./getRecentMemos.test.md) | `/memos/recent/:n`   | `GET`               |
