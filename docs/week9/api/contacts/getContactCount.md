# `getContactCount()`

| Key                 | Value             |
| :------------------ | :---------------- |
| REST endpoint       | `/contacts/count` |
| HTTP request method | `GET`             |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                        |
| :---------- | :---------- | :------------------------------------------- |
| 200         | OK          | Contact count has been successfully returned |

### 200 OK

#### MIME type

`text/number`

#### Data

```typescript
number
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 403         | Forbidden             | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
