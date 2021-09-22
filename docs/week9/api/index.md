
| Key                | Value  |
| :----------------- | :----- |
| REST endpoint base | `/api` |

# Standard Response

## General Format

```typescript
{
    status: number,
    statusText: string,
    mimetype: string,
    data: any
}
```

### HTTP Success (2xx): Singleton

```typescript
{
    status: 200 | 201 | 204,
    statusText: "Success" | "Created" | "No Content",
    mimetype: "application/json" | "text/boolean" | "text/number" | "text/string"
    data: {...} | (true | false) | number | string
}
```

### HTTP Success (2xx): List

```typescript
{
    status: 200 | 201 | 204,
    statusText: "Success" | "Created" | "No Content",
    mimetype: "list/application/json" | "list/text/boolean" | "list/text/number" | "list/text/string"
    data: [ {...} | (true | false) | number | string ]
}
```


### HTTP Error (4xx, 5xx)

```typescript
{
    status: 400 | 401 | 403 | 404 | 500,
    statusText: "Bad Request", "Unauthorized", "Forbidden", "Not Found", "Internal Server Error",
    mimetype: "text/error",
    data: {
        status: 400 | 401 | 403 | 404 | 500,
        statusText: "Bad Request", "Unauthorized", "Forbidden", "Not Found", "Internal Server Error",
        body: string
    }
}
```

---

# Table of Contents

| Route group                     | REST endpoint base |
| :------------------------------ | :----------------- |
| [Contacts](./contacts/index.md) | `/api/contacts/*`  |
| [Groups](./groups/index.md)     | `/api/groups/*`    |
| [Memos](./memos/index.md)       | `/api/memos/*`     |
| [User](./user/index.md)         | `/api/user/*`      |
