# Gravity Frontend

This is the frontend of the [gravity-backend](https://github.com/himanshuhsn/Gravity)

## Local setup
1. Fork and clone the repo.
1. Fork and clone the [gravity-backend](https://github.com/himanshuhsn/Gravity) repo.
1. Start the gravity-backend server. (Instructions below)

There are two way to run the gravity-backend, which would start a local server.

1. Using docker (recommended)
    1. Make sure docker deamon is running.
    1. Change the content of `Gravity/src/main/resources/application.properties` file to `spring.crossoriginallow.url=null`. This would allow api calls from local.
    1. Navigate to the root of [gravity-backend](https://github.com/himanshuhsn/Gravity).
    1. run the following command to create an docker image.

        ```docker build --platform linux/amd64 . -t gravity:latest```

    1. run the following command to run the docker image and map port 8080.

        ```docker run -d -p 8080:8080 gravity```

    1. Now server can be queried on the address `http://localhost:8080`

2. Without using docker.
    1. Change the content of `Gravity/src/main/resources/application.properties` file to `spring.crossoriginallow.url=null`. This would allow api calls from local.
    1. Check that `JAVA_HOME` is set to java11 `echo $JAVA_HOME`
    1. Install maven. On mac use `brew install maven`
    1. Go to root of the project.
    1. Run using maven. `mvn spring-boot:run`
    1. Application would start at port `8080` and can be accessed at `http://localhost:8080`