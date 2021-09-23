# `deleteGroup()`

| Key                 | Value            |
| :------------------ | :--------------- |
| REST endpoint       | `/groups/delete` |
| HTTP request method | `DELETE`         |

## Request Format

### Body

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                               |
| :---------- | :---------- | :---------------------------------- |
| 200         | OK          | Group has successfully been deleted |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Group successfully deleted"
```

### Possible errors

| Status code | Status text           | Cause                                                               |
| :---------- | :-------------------- | :------------------------------------------------------------------ |
| 400         | Bad Request           | Request body is malformed                                           |
| 401         | Unauthorized          | Requester is not authenticated                                      |
| 403         | Forbidden             | Group to delete does not belong to the currently-authenticated user |
| 404         | Not Found             | No groups with the given ID exists in the database                  |
| 500         | Internal Server Error | Something has gone wrong                           |
