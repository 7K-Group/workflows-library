FROM golang:1.24-alpine AS build
WORKDIR /src
COPY . .
RUN go build -o /function .

FROM alpine:3.21
COPY --from=build /function /function
ENTRYPOINT ["/function"]
