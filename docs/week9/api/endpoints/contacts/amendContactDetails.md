### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:amendContactDetails()](../../../../../backend/src/controllers/contactController.ts#L38-L140) | [test suite](../../../../../backend/tests/controllers/contacts/amendContactDetails.test.ts)<br>[documentation](../../tests/contacts/amendContactDetails.test.md) |

# `amendContactDetails()`

| Key                 | Value                     |
| :------------------ | :------------------------ |
| REST endpoint       | `/contacts/details/amend` |
| HTTP request method | `PATCH`                   |

## Request Format

### Body

```typescript
{
    id: ObjectId,
    firstName: string,
    middleName?: string,
    lastName: string,
    groupId?: string,
    gender?: "Male" | "Female" | "Other",
    dateOfBirth?: Date,
    lastMet?: Date,
    phoneNumber?: string,
    email?: string,
    photo?: string,
    relationship?: string,
    additionalNotes?: string
}
```

## Possible Responses

| Status code | Status text | Cause                                 |
| :---------- | :---------- | :------------------------------------ |
| 200         | OK          | Contact has successfully been amended |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Contact successfully amended"
```

### Possible errors

| Status code | Status text           | Cause                                                                |
| :---------- | :-------------------- | :------------------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                            |
| 401         | Unauthorized          | Requester is not authenticated                                       |
| 403         | Forbidden             | Contact to amend does not belong to the currently-authenticated user |
| 404         | Not Found             | No contact with the given ID exists in the database                  |
| 500         | Internal Server Error | Something has gone wrong                                             |
