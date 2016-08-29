# Description
Nodejs client for <http://appfigures.com> . Uses Oauth to connect.

This is very much WIP - check bin/ to see how the protocol works.
Expect more in a week or so.

# Oauth
- use `./bin/get_access_token` to get an access token based on client key/secret.
- Only needs to be done once, chances are your admin has already done this

```
export APPFIGURES_CLIENT_KEY=
export APPFIGURES_CLIENT_SECRET=
export APPFIGURES_ACCESS_TOKEN=
export APPFIGURES_ACCESS_TOKEN_SECRET=
export APPFIGURES_REQUEST_TOKEN_URL=
export APPFIGURES_ACCESS_TOKEN_URL=
export APPFIGURES_USER_AUTHORIZATION_URL=
export APPFIGURES_API_URL=
export APPFIGURES_PRODUCTS=

```
