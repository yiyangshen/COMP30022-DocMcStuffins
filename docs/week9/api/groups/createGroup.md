# `createGroup()`

| Key                 | Value         |
| :------------------ | :------------ |
| REST endpoint       | `/groups/new` |
| HTTP request method | `POST`        |

## Request Format

### Body

```typescript
{
    name: string,
    members?: [ObjectId]
}
```

## Possible Responses

| Status code | Status text | Cause                               |
| :---------- | :---------- | :---------------------------------- |
| 201         | Created     | Group has successfully been created |

### 201 Created

#### MIME type

`text/string`

#### Data

```typescript
"Group successfully created"
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 400         | Bad Request           | Request body is malformed      |
| 403         | Forbidden             | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
