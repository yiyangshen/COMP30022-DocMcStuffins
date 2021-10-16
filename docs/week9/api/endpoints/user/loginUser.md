### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user index](./index.md)<br>[endpoint index](../index.md) | [userController.ts:loginUser()](../../../../../backend/src/controllers/userController.ts#L102-L131) |  [test suite](../../../../../backend/tests/controllers/user/userController.test.ts)<br>[documentation](../../tests/user/userControllerTest.md) |

# `loginUser()`

| Key                 | Value         |
| :------------------ | :------------ |
| REST endpoint       | `/user/login` |
| HTTP request method | `PATCH`       |

## Request Format

### Body

```typescript
{
    email: string,
    password: string
}
```

## Possible Responses

| Status code | Status text | Cause                                    |
| :---------- | :---------- | :--------------------------------------- |
| 200         | OK          | User has successfully been authenticated |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Login Successful"
```

### Possible errors

| Status code | Status text           | Cause                                                        |
| :---------- | :-------------------- | :----------------------------------------------------------- |
| 400         | Bad Request           | Request body is malformed                                    |
| 403         | Forbidden             | Provided information does not match any user in the database |
| 500         | Internal Server Error | Something has gone wrong                                     |
