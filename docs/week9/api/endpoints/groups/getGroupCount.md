### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[endpoint index](../index.md) | [groupController.ts:getGroupCount()](../../../../../backend/src/controllers/groupController.ts#L263-L277) | [test suite](../../../../../backend/tests/controllers/groups/getGroupCount.test.ts)<br>[documentation](../../tests/groups/getGroupCount.test.md) |

# `getGroupCount()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/groups/count` |
| HTTP request method | `GET`           |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                      |
| :---------- | :---------- | :----------------------------------------- |
| 200         | OK          | Group count has been successfully returned |

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
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
