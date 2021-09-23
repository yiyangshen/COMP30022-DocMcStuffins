# `getGroupDetails()`

| Key                 | Value                 |
| :------------------ | :-------------------- |
| REST endpoint       | `/groups/details/:id` |
| HTTP request method | `GET`                 |

## Request Format

### Params

```typescript
{
    id: ObjectId
}
```

## Possible Responses

| Status code | Status text | Cause                                         |
| :---------- | :---------- | :-------------------------------------------- |
| 200         | OK          | Group details has successfully been retrieved |

### 200 OK

#### MIME type

`application/json`

#### Data

```typescript
{
    _id: ObjectId,
    name: string,
    members: [
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
                modified: Date
            }
        }
    ]
}
```

### Possible errors

| Status code | Status text           | Cause                                                                            |
| :---------- | :-------------------- | :------------------------------------------------------------------------------- |
| 400         | Bad Request           | Request params are malformed                                                     |
| 401         | Unauthorized          | Requester is not authenticated                                                   |
| 403         | Forbidden             | Group to retrieve details on does not belong to the currently-authenticated user |
| 404         | Not Found             | No groups with the given ID exist in the database                                |
| 500         | Internal Server Error | Something has gone wrong                          |
