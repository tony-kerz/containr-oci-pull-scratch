ADD fromImage=node:23.6.0-bookworm-slim
FROM $fromImage

ARG entrypoint=node
ENV entrypoint=$entrypoint

ADD buildPath=build
ENV buildPath=$buildPath

ENV appPath=/app
WORKDIR $appPath

ADD $buildPath $appPath

ARG cmd=src/index.js
ENV cmd=$cmd

CMD $entrypoint $cmd