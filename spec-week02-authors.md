**## Books API Week 02 Spec - Version 2**

**### Goal**
Implement all CRUD operations for authors. The API must allow users to create, retrieve, update, and delete authors. Every author route must be documented and testable in Swagger.

**### Data Model**
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: int, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

**### Routes**

**#### GET /authors**
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

**#### GET /authors/:id**
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

**#### POST /authors**
Purpose: Create a new author.

Request body:

    {
      "id": "a3",
      "name": "J.R.R. Tolkien",
      "birthYear": "1892"
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

**#### PUT /authors/:id**
Purpose: Update an existing author.

Request body:

    {
      "name": "John Ronald Reuel Tolkien",
      "birthYear": "1892"
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

**#### DELETE /authors/:id**
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

**### Swagger Documentation**
Swagger must document every author route, including request bodies, path parameters, success responses, and error responses.

**### Deployment Expectations**
After implementation, all author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.