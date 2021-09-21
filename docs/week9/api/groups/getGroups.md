# `getGroups()`

| Key                 | Value      |
| :------------------ | :--------- |
| REST endpoint       | `/groups/` |
| HTTP request method | `GET`      |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                               |
| :---------- | :---------- | :-------------------------------------------------- |
| 200         | OK          | Query is successful and some data has been returned |

### 200 OK

#### MIME type

`list/application/json`

#### Data

```typescript
[
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
]
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
