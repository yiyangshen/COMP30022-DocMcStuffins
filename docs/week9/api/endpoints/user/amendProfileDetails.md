### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user index](./index.md)<br>[endpoint index](../index.md) | [userController.ts:amendProfileDetails()](../../../../../backend/src/controllers/userController.ts#L28-L71) | [test suite](../../../../../backend/tests/controllers/user/amendProfileDetails.test.ts)<br>[documentation](../../tests/user/amendProfileDetails.test.md) |

# `amendProfileDetails()`

| Key                 | Value                 |
| :------------------ | :-------------------- |
| REST endpoint       | `/user/profile/amend` |
| HTTP request method | `PATCH`               |

## Request Format

### Body

```typescript
{
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    password: string
}
```

## Possible Responses

| Status code | Status text | Cause                                 |
| :---------- | :---------- | :------------------------------------ |
| 200         | OK          | Profile has successfully been amended |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Profile successfully amended"
```

### Possible errors

| Status code | Status text           | Cause                                                                |
| :---------- | :-------------------- | :------------------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                            |
| 401         | Unauthorized          | Requester is not authenticated                                       |
| 500         | Internal Server Error | Something has gone wrong                                             |
