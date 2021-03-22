FROM alpine:3.13.2

RUN mkdir /app

WORKDIR /app

COPY Gemfile* /app/

RUN apk add --no-cache \
      g++ \
      gcc \
      git \
      libstdc++ \
      make \
      musl-dev \
      patch \
      ruby \
      ruby-bigdecimal \
      ruby-dev \
      ruby-etc \
      ruby-json \
      ruby-webrick \
      zlib \
      zlib-dev \
  && gem install bundler \
  && bundle install \
  && apk del \
      g++ \
      gcc \
      make \
      musl-dev \
      patch \
      ruby-dev \
      zlib-dev

COPY ./ /app/

EXPOSE 4000

ENTRYPOINT ["bundle", "exec", "jekyll"]

CMD ["serve", "-H", "0.0.0.0"]
