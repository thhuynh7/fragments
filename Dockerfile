# Stage 0: Install alpine Linux + node + dependencies
FROM node:16.14-alpine@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b AS dependencies

LABEL maintainer="Thai Huynh <thhuynh7@myseneca.ca>"
LABEL description="Fragments node.js microservice"

# We default to use port 8080 in our service
ENV PORT=8080
# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn
# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

ENV NODE_ENV=production

# Use /app as our working directory
WORKDIR /app

# Copy dep files 
COPY package*.json ./

# Install production dependencies
RUN npm ci -only=production

#######################################################################

# Stage 1: use dependencies to start the container by running our server
FROM node:16.14-alpine@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b AS deploy

WORKDIR /app
# Copy cached dependencies from previous stage so we don't have to download
COPY --from=dependencies /app /app
# Copy source code into the image 
COPY ./src ./src
# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# add the installation instruction for curl since node:alpine image doesn't come with curl
# RUN apk --no-cache add curl
RUN apk --no-cache add curl=7.80.0-r2


# Start the container by running our server 
# Use 'CMD node src/index.js' vs. 'CMD npm start' to save the extra process invocation
# CMD  ["dumb-init", "node", "src/index.js"]
CMD ["node", "src/index.js"]

# We run our service on port 8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail localhost:8080 || exit 1
