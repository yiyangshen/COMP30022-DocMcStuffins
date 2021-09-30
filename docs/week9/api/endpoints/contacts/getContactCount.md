### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:getContactCount()](../../../../../backend/src/controllers/contactController.ts#L317-L327) | [test suite](../../../../../backend/tests/controllers/contacts/getContactCount.test.ts)<br>[documentation](../../tests/contacts/getContactCount.test.md) |

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
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
