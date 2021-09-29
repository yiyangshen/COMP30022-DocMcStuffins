# `deleteMemo()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/memos/delete` |
| HTTP request method | `POST`          |

## Request Format

### Body

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                              |
| :---------- | :---------- | :--------------------------------- |
| 200         | OK          | Memo has successfully been deleted |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Memo successfully deleted"
```

### Possible errors

| Status code | Status text           | Cause                                                              |
| :---------- | :-------------------- | :----------------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                          |
| 401         | Unauthorized          | Requester is not authenticated                                     |
| 403         | Forbidden             | Memo to delete does not belong to the currently-authenticated user |
| 404         | Not Found             | No memos with the given ID exists in the database                  |
| 500         | Internal Server Error | Something has gone wrong                          |
