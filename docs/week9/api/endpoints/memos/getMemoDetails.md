### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[endpoint index](../index.md) | [memoController.ts:getMemoDetails()](../../../../../backend/src/controllers/memoController.ts#L182-L214) | [test suite](../../../../../backend/tests/controllers/memos/getMemoDetails.test.ts)<br>[documentation](../../tests/memos/getMemoDetails.test.md) |

# `getMemoDetails()`

| Key                 | Value                |
| :------------------ | :------------------- |
| REST endpoint       | `/memos/details/:id` |
| HTTP request method | `GET`                |

## Request Format

### Params

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                                        |
| :---------- | :---------- | :------------------------------------------- |
| 200         | OK          | Memo details has successfully been retrieved |

### 200 OK

#### MIME type

`application/json`

#### Data

```typescript
{
    _id: ObjectId,
    title: string,
    notes?: string,
    timestamps: {
        created: Date,
        viewed: Date,
        modified: Date
    }
}
```

### Possible errors

| Status code | Status text           | Cause                                                                           |
| :---------- | :-------------------- | :------------------------------------------------------------------------------ |
| 400         | Bad Request           | Request params is malformed                                                     |
| 401         | Unauthorized          | Requester is not authenticated                                                  |
| 403         | Forbidden             | Memo to retrieve details on does not belong to the currently-authenticated user |
| 404         | Not Found             | No memos with the given ID exist in the database                                |
| 500         | Internal Server Error | Something has gone wrong                                                        |
