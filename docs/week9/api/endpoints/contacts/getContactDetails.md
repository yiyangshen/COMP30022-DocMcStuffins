### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:getContactDetails()](../../../../../backend/src/controllers/contactController.ts#L344-L381) | [test suite](../../../../../backend/tests/controllers/contacts/getContactDetails.test.ts)<br>[documentation](../../tests/contacts/getContactDetails.test.md) |

# `getContactDetails()`

| Key                 | Value                   |
| :------------------ | :---------------------- |
| REST endpoint       | `/contacts/details/:id` |
| HTTP request method | `GET`                   |

## Request Format

### Params

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                                           |
| :---------- | :---------- | :---------------------------------------------- |
| 200         | OK          | Contact details has successfully been retrieved |

### 200 OK

#### MIME type

`application/json`

#### Data

```typescript
{
    _id: ObjectId,
    name: {
        first: string,
        middle?: string,
        last: string
    },
    groupId?: string,
    gender: string,
    dateOfBirth?: Date,
    lastMet?: Date,
    phoneNumber?: string,
    email?: string,
    photo?: string,
    relationship?: string,
    additionalNotes?: string,
    timestamps: {
        created: Date,
        viewed: Date,
        modified?: Date
    }
}
```

### Possible errors

| Status code | Status text           | Cause                                                                         |
| :---------- | :-------------------- | :---------------------------------------------------------------------------- |
| 400         | Bad Request           | Request params are malformed                                                  |
| 401         | Unauthorized          | Requester is not authenticated                                                |
| 403         | Forbidden             | Contact to get details on does not belong to the currently-authenticated user |
| 404         | Not Found             | No contacts with the given ID exist in the database                           |
| 500         | Internal Server Error | Something has gone wrong                            |
