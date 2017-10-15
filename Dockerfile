FROM golang:alpine

RUN \
    set -xe ;\
    apk add --no-cache \
        git

RUN \
    set -xe ;\
    go get github.com/ajvb/kala

ENTRYPOINT ["kala", "run"]
EXPOSE 8000
