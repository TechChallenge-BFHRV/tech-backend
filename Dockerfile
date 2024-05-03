FROM node:18 AS builder

ENV NODE_ENV=build

RUN apt update && apt install jq -y

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
RUN yarn install --frozen-lockfile

RUN jq .version package.json -r > .package.version.txt
RUN jq .name package.json -r > .package.name.txt
RUN jq .description package.json -r > .package.description.txt

COPY . ./

RUN yarn run build

# Run stage
FROM node:18

ENV NODE_ENV=development

ENV TZ=America/Sao_Paulo

RUN apt install tzdata -y

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY --from=builder /app/.package.*.txt /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

RUN addgroup --system app && APPGROUP=`grep "app" /etc/group|cut -d: -f3` \ 
    && adduser --system app --gid $APPGROUP && \
    chown -R app.app /app/ && \
    chmod 756 /app

USER app

CMD PROJECT_VERSION=$(cat .package.version.txt) \
  PROJECT_NAME=$(cat .package.name.txt) \
  PROJECT_DESCRIPTION=$(cat .package.description.txt) \
  node dist/src/main
