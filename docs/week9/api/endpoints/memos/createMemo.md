### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[endpoint index](../index.md) | [memoController.ts:createMemo()](../../../../../backend/src/controllers/memoController.ts#L86-L122) | [test suite](../../../../../backend/tests/controllers/memos/createMemo.test.ts)<br>[documentation](../../tests/memos/createMemo.test.md) |

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
| 401         | Unauthorized          | Requester is not authenticated                    |
| 500         | Internal Server Error | Something has gone wrong                          |
