# Agenda

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
https://www.npmjs.com/package/cors

1. Run yarn dev
2. Showcase "app"
3. Showcase "attacker"

## Basic CORS/CSRF

1. POST that reach the server

## Preflight

1. Change POST to DELETE
2. Showcase "allowed-methods" (works only with preflight)
3. Showcase "allowed-credentials" (works only with preflight)
4. Showcase "origin: *" and credentials
5. Mozilla preflight
6. back to "POST"
7. Change contentType to application/json
8. File upload, issues with application/json
9. Add custom header

## CSRF token

1. Showcase ajax usage
2. Showcase form usage
