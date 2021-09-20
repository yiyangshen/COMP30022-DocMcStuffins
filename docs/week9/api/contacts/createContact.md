# `createContact()`

| Key                 | Value           |
| :------------------ | :-------------- |
| REST endpoint       | `/contacts/new` |
| HTTP request method | `POST`          |

## Request Format

### Body

```typescript
{
    id: ObjectId,
    firstName?: string,
    middleName?: string,
    lastName?: string,
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
| 201         | Created     | Contact has successfully been created |

### 201 Created

#### MIME type

`text/string`

#### Data

```typescript
"Contact successfully created"
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 400         | Bad Request           | Request body is malformed      |
| 403         | Forbidden             | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
