# `createMemo()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/memos/new`    |
| HTTP request method | `POST`          |

## Request Format

### Body

```typescript
{
    title: string,
    notes?: string
}
```

## Possible Responses

| Status code | Status text | Cause                              |
| :---------- | :---------- | :--------------------------------- |
| 201         | Created     | Memo has successfully been created |

### 201 Created

#### MIME type

`???`

#### Data

`???`

### Possible errors

| Status code | Status text           | Cause                                             |
| :---------- | :-------------------- | :------------------------------------------------ |
| 400         | Bad Request           | Request body is malformed                         |
| 403         | Forbidden             | Requester is not authenticated                    |
| 500         | Internal Server Error | Something has gone wrong                          |
