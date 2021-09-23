# Memo Routes

| Functionality name                        | REST endpoint        | HTTP request method |
| :---------------------------------------- | :------------------- | :------------------ |
| [Creation](./createMemo.md)               | `/memos/new`         | `POST`              |
| [Deletion](./deleteMemo.md)               | `/memos/delete`      | `DELETE`            |
| [Detail amendment](./amendMemoDetails.md) | `/memos/amend`       | `PATCH`             |
| [Detail retrieval](./getMemoDetails.md)   | `/memos/details/:id` | `GET`               |
| [Listing](./getMemos.md)                  | `/memos/`            | `GET`               |
| [Listing recentmost](./getRecentMemos.md) | `/memos/recent/:n`   | `GET`               |
