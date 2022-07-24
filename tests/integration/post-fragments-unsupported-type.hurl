# tests/integration/post-fragments-unsupported-type.hurl
POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

# Sending a fragment in unsupported format (mp3)
Content-Type: mp3
```This is a mp3 fragment!```

# 1. We expect to get back an HTTP 201
HTTP/1.1 500

[Asserts]
jsonpath "$.status" == "error"
# We expect to get back a JSON response with {"status":"error","error":{"message":"invalid media type","code":500}}
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 500
jsonpath "$.error.message" == "invalid media type"

