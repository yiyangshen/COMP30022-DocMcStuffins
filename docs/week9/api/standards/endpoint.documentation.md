### Breadcrumbs

| Indices                               | Implementation                | Testing                               |
| :------------------------------------ | :---------------------------- | :------------------------------------ |
| [local index](#)<br>[parent index](#) | [controller.ts:funcName()](#) | [test suite](#)<br>[documentation](#) |

# `funcName()`

| Key                 | Value               |
| :------------------ | :------------------ |
| REST endpoint       | `/path/to/endpoint` |
| HTTP request method | `REQUEST_METHOD`    |

## Request Format

### Body

```typescript
/* For an object data input: */
{
    firstField: type,
    secondField: type,
    listField: [item_type]
}
```

```typescript
/* For a list data input: */
[
    {
        ...
    }
]
```

## Possible Responses

The responses detailed in this section should be part of the informational (`1xx`), successful (`2xx`), or redirect (`3xx`) response types.

| Status code | Status text | Cause                                               |
| :---------- | :---------- | :-------------------------------------------------- |
| 1xx         | Information | The endpoint is returning some information          |
| 2xx         | Success     | The endpoint has successfully executed              |
| 3xx         | Redirect    | The endpoint is redirecting the requester elsewhere |

### 1xx Information

...

### 2xx Success

#### MIME type

`mime/type`

#### Data

```typescript
/* output format similar to to the input format detailed above */
```

### 3xx Redirect

...

### Possible errors

The responses detailed in this section should be part of the client error (`4xx`) or the server error (`5xx`) response types.

| Status code | Status text           | Cause                                                                |
| :---------- | :-------------------- | :------------------------------------------------------------------- |
| 4xx         | Client error          | Client caused an error somewhere                                     |
| 5xx         | Server error          | Server encountered an error somewhere                                |
