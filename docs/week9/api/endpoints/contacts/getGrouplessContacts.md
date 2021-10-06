### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contact index](./index.md)<br>[endpoint index](../index.md) | [contactController.ts:getGrouplessContacts()](../../../../../backend/src/controllers/contactController.ts#L381-L400) | [test suite](../../../../../backend/tests/controllers/contacts/getGrouplessContacts.test.ts)<br>[documentation](../../tests/contacts/getGrouplessContacts.test.md) |

# `getGrouplessContacts()`

| Key                 | Value                 |
| :------------------ | :-------------------- |
| REST endpoint       | `/contacts/groupless` |
| HTTP request method | `GET`                 |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                               |
| :---------- | :---------- | :-------------------------------------------------- |
| 200         | OK          | Query is successful and some data has been returned |
| 204         | No Content  | Query is successful but there is no data to return  |

### 200 OK

#### MIME type

`list/application/json`

#### Data

```typescript
[
    {
        name: {
            first: string,
            middle?: string,
            last: string
        },
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
]
```

### 204 No Content

#### MIME type

`text/string`

#### Data

```typescript
"null"
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
