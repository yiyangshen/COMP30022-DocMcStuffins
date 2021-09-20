# `deleteMemo()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/memos/delete` |
| HTTP request method | `DELETE`        |

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

`???`

#### Data

`???`

### Possible errors

| Status code | Status text           | Cause                                             |
| :---------- | :-------------------- | :------------------------------------------------ |
| 400         | Bad Request           | Request body is malformed                         |
| 403         | Forbidden             | Requester is not authenticated                    |
| 404         | Not Found             | No memos with the given ID exists in the database |
| 500         | Internal Server Error | Something has gone wrong                          |