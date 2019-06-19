#!/bin/bash
export PARSE_SERVER_APPLICATION_ID="6JoGrDuUCGWFHPa_ncYKGTSf"
export PARSE_SERVER_MASTER_KEY="ygsZ6LrN53pdZ9E6M2fipjT_"
export PARSE_SERVER_APP_NAME="spine0619demo"
export PARSE_SERVER_CLOUD="cloud/main"
export PARSE_SERVER_DATABASE_URI="mongodb://spine0619demo-dev:27017/dev"
export PARSE_SERVER_MOUNT_PATH="/api/1"
export PARSE_SERVER_START_LIVE_QUERY_SERVER="true"
export PARSE_SERVER_MAX_UPLOAD_SIZE="1000mb"
export PARSE_SERVER_CACHE_MAX_SIZE="20000"
export PARSE_SERVER_LIVE_QUERY='{"classNames":[]}'
export PARSE_PUBLIC_SERVER_URL="http://127.0.0.1:1337/api/1"

export ANYPROXY_PARSE_SERVER_URL="http://127.0.0.1:1337/api/1"

export S3_BUCKET="spine-dev-spine0619demo"
export S3_BASEURL="https://spine-dev-spine0619demo.oss-cn-hangzhou.aliyuncs.com"
export S3_REGION="cn-hangzhou"
export S3_ACCESS_KEY="LTAI28dupa2nAGMr"
export S3_SECRET_KEY="CSgFoO9wnWXMXSOAqBeeLX2CRvzQ08"
export S3_ENDPOINT="https://oss-cn-hangzhou.aliyuncs.com"
export S3_ASSUME_BUCKET_IS_PUBLIC_READ=true

export COS_SECRET_ID="LTAI28dupa2nAGMr"
export COS_SECRET_KEY="CSgFoO9wnWXMXSOAqBeeLX2CRvzQ08"
export COS_BUCKET="spine-dev-spine0619demo"
export COS_REGION="cn-hangzhou"

export PARSE_RUN_MODE='dev'

node index.js
