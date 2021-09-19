# Get memos

|         Key         |   Value   |
| :------------------ | :-------- |
| REST endpoint       | `/memos/` |
| HTTP request method | `GET`     |

## Request

### Parameters

-

### Body

-

## Response

| Status code | Status text |                       Cause                        |
| :---------: | :---------: | :------------------------------------------------- |
|     200     |     OK      | Query is succesful and some data has been returned |
|     204     | No Content  | Query is successful but there is nothing to return |

### MIME type

`list/XXX`

### Data

```typescript
[
    {
        userId: ObjectId,
        title: string,
        notes?: string,
        timestamps: {
            created: Date,
            viewed: Date,
            modified: Date
        }
    }
]
```

### Possible errors

| Status code |      Status text      |               Cause                |
| :---------: | :-------------------: | :--------------------------------- |
|     403     |       Forbidden       | The requester is not authenticated |
|     500     | Internal Server Error | Something has gone wrong           |
