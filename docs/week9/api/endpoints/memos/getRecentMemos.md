### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [memo index](./index.md)<br>[endpoint index](../index.md) | [memoController.ts:getRecentMemos()](../../../../../backend/src/controllers/memoController.ts#L258-L286) | [test suite](../../../../../backend/tests/controllers/memos/getRecentMemos.test.ts)<br>[documentation](../../tests/memos/getRecentMemos.test.md) |

# `createMemo()`

| Key                 | Value              |
| :------------------ | :----------------- |
| REST endpoint       | `/memos/recent/:n` |
| HTTP request method | `GET`              |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                               |
| :---------- | :---------- | :-------------------------------------------------- |
| 200         | OK          | Query is successful and some data has been returned |
| 204         | No Content  | Query is successful but there is nothing to return  |

### 200 OK

#### MIME type

`list/application/json`

#### Data

```typescript
[
    {
        _id: ObjectId,
        title: string,
        notes?: string,
        timestamps: {
            created: Date,
            viewed: Date,
            modified?: Date
        }
    }
]
```

### 204 No Content

#### MIME type

`text/string`

#### Data

```typescript
null
```

### Possible errors

| Status code | Status text           | Cause                              |
| :---------- | :-------------------- | :--------------------------------- |
| 400         | Bad Request           | Request params is malformed        |
| 401         | Unauthorized          | Requester is not authenticated     |
| 500         | Internal Server Error | Something has gone wrong           |
