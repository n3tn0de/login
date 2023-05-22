FROM endeveit/docker-jq AS deps

# https://stackoverflow.com/a/58487433
# To prevent cache invalidation from changes in fields other than dependencies

COPY package.json /tmp

RUN jq '{ dependencies, devDependencies }' < /tmp/package.json > /tmp/deps.json

FROM node:16

WORKDIR /app

COPY --from=deps /tmp/deps.json ./package.json
COPY package-lock.json .

RUN npm ci --legacy-peer-deps
# https://docs.npmjs.com/cli/ci.html#description

COPY . .
