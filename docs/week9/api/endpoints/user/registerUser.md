### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user index](./index.md)<br>[endpoint index](../index.md) | [userController.ts:registerUser()](../../../../../backend/src/controllers/userController.ts#L93-L121) | [test suite](../../../../../backend/tests/controllers/user/registerUser.test.ts)<br>[documentation](../../tests/user/registerUser.test.md) |

# `registerUser()`

| Key                 | Value            |
| :------------------ | :--------------- |
| REST endpoint       | `/user/register` |
| HTTP request method | `POST`           |

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

| Status code | Status text | Cause                                                   |
| :---------- | :---------- | :------------------------------------------------------ |
| 201         | Created     | User has successfully been registered and authenticated |

### 201 Created

#### MIME type

`text/string`

#### Data

```typescript
"New user registered"
```

### Possible errors

| Status code | Status text           | Cause                                                  |
| :---------- | :-------------------- | :----------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                              |
| 403         | Forbidden             | Requester is already authenticated                     |
|             |                       | Given email address already exists within the database |
|             |                       | Password is less than six characters long              |
| 500         | Internal Server Error | Something has gone wrong                               |
