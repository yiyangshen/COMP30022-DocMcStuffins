### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group index](./index.md)<br>[endpoint index](../index.md) | [groupController.ts:createGroup()](../../../../../backend/src/controllers/groupController.ts#L134-L198) | [test suite](../../../../../backend/tests/controllers/groups/createGroup.test.ts)<br>[documentation](../../tests/groups/createGroup.test.md) |

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
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
