FROM golang:1.20.2-alpine AS build

WORKDIR /go/src/backend

COPY . .

RUN CGO_ENABLED=0 go install -ldflags '-extldflags "-static"' -v .

FROM scratch

# the tls certificates:
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# the actual binary
COPY --from=build /go/bin/backend /go/bin/backend

ENV GOOGLE_CLOUD_PROJECT=my-google-project

ENTRYPOINT ["/go/bin/backend"]
