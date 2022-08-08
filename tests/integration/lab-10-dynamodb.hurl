# tests/integration/lab-10-dynamodb.hurl

# 1. POST a new text fragment to http://localhost:8080 as an authorized user  
POST http://localhost:8080/v1/fragments
# user1@email.com:password1
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/plain
```Hello S3!```

# 2. Confirm that the server returns a 201 , and capture the Location header value 
HTTP/1.1 201

[Asserts]
# The Location header should look like what we expect (including the fragment id)
header "Location" matches "^http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
jsonpath "$.fragment.id" matches "^[A-Za-z0-9_-]+$"

jsonpath "$.fragment.ownerId" matches "^[0-9a-fA-F]+$"

jsonpath "$.fragment.created" isString
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.type" == "text/plain"

jsonpath "$.fragment.size" == 9
[Captures]
url: header "Location"

# 3. GET the fragment we just posted by its URL
GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

# 4. Confirm that the server returns a 200
HTTP/1.1 200
Content-Type: text/plain; charset=utf-8
Content-Length: 9
[Asserts]
body == "Hello S3!"

# 5. DELETE the fragment using the url as an authorized user
POST {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

# 6. Confirm that the server returns a 200
HTTP/1.1 200
Content-Type: application/json; charset=utf-8
Content-Length: 15
[Asserts]
jsonpath "$.status" == "ok"

# 7. GET the fragment again using the url as an authorized user
GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

# 8. Confirm that the server returns a 404 (fragment deleted)
HTTP/1.1 404

# Extra checks to perform against the response
[Asserts]
# We expect to get back a JSON response with {"status":"error","error":{"code":404,"message":"not found"}}
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" == "not found"
