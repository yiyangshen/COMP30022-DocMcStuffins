### Breadcrumbs

| Indices | Implementation | Testing |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user index](./index.md)<br>[endpoint index](../index.md) | [userController.ts:logoutUser()](../../../../../backend/src/controllers/userController.ts#L66-L76) | [test suite](../../../../../backend/tests/controllers/user/logoutUser.test.ts)<br>[documentation](../../tests/user/logoutUser.test.md) |

# `logoutUser()`

| Key                 | Value          |
| :------------------ | :------------- |
| REST endpoint       | `/user/logout` |
| HTTP request method | `PATCH`        |

## Request Format

\-

## Possible Responses

| Status code | Status text | Cause                                      |
| :---------- | :---------- | :----------------------------------------- |
| 200         | OK          | User has successfully been deauthenticated |

### 200 OK

#### MIME type

`text/string`

#### Data

```typescript
"Logout successful"
```

### Possible errors

| Status code | Status text           | Cause                          |
| :---------- | :-------------------- | :----------------------------- |
| 401         | Unauthorized          | Requester is not authenticated |
| 500         | Internal Server Error | Something has gone wrong       |
