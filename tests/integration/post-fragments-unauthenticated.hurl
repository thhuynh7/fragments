# tests/integration/post-fragments-unauthenticated.hurl
POST http://localhost:8080/v1/fragments
# no authentication provided
Content-Type: text/plain
```This is a fragment!```

# 1. We expect to get back an HTTP 401
HTTP/1.1 401

[Asserts]
jsonpath "$.status" == "error"
# We expect to get back a JSON response with {"status":"error","error":{"code":401,"message":"Unauthorized"}}
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 401
jsonpath "$.error.message" == "Unauthorized"

