### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[endpoint index](../index.md) | [memoController.ts:amendMemoDetails()](../../../../../backend/src/controllers/memoController.ts#L28-L74) | [test suite](../../../../../backend/tests/controllers/memos/amendMemoDetails.test.ts)<br>[documentation](../../tests/memos/amendMemoDetails.test.md) |

# `amendMemoDetails()`

| Key                 | Value                  |
| :------------------ | :--------------------- |
| REST endpoint       | `/memos/details/amend` |
| HTTP request method | `PATCH`                |

## Request Format

### Body

```typescript
{
    id: ObjectId,
    title: string,
    notes?: string
}
```

## Possible Responses

| Status code | Status text | Cause                              |
| :---------- | :---------- | :--------------------------------- |
| 200         | OK          | Memo has successfully been amended |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Memo successfully amended"
```

### Possible errors

| Status code | Status text           | Cause                                                             |
| :---------- | :-------------------- | :---------------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                         |
| 401         | Unauthorized          | Requester is not authenticated                                    |
| 403         | Forbidden             | Memo to amend does not belong to the currently-authenticated user |
| 404         | Not Found             | No memos with the given ID exist in the database                  |
| 500         | Internal Server Error | Something has gone wrong                                          |
