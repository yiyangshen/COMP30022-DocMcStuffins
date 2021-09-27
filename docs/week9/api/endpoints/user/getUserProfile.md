# `getUserProfile()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/user/profile` |
| HTTP request method | `GET`           |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                     |
| :---------- | :---------- | :---------------------------------------- |
| 200         | OK          | User data has successfully been retrieved |

### 200 OK

#### MIME type

`application/json`

#### Data

```typescript
{
    _id: ObjectId,
    email: string,
    name: {
        first: string,
        middle?: string,
        last: string
    }
}
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |