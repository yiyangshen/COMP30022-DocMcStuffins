### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:deleteContact()](../../../../../backend/src/controllers/contactController.ts#L266-L309) | [test suite](../../../../../backend/tests/controllers/contacts/deleteContact.test.ts)<br>[documentation](../../tests/contacts/deleteContact.test.md) |

# `deleteContact()`

| Key                 | Value              |
| :------------------ | :----------------- |
| REST endpoint       | `/contacts/delete` |
| HTTP request method | `POST`             |

## Request Format

### Body

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                                 |
| :---------- | :---------- | :------------------------------------ |
| 200         | OK          | Contact has successfully been deleted |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Contact successfully deleted"
```

### Possible errors

| Status code | Status text           | Cause                                                                 |
| :---------- | :-------------------- | :-------------------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                             |
| 401         | Unauthorized          | Requester is not authenticated                                        |
| 403         | Forbidden             | Contact to delete does not belong to the currently-authenticated user |
| 404         | Not Found             | No contacts with the given ID exists in the database                  |
| 500         | Internal Server Error | Something has gone wrong                                              |
