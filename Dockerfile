FROM openjdk
WORKDIR /back-end
COPY /target/springSecurityBiblioSession-0.0.1-SNAPSHOT.jar /back-end/
#RUN apk update && apk add maven
#RUN mvn install
CMD [ "java","-jar","springSecurityBiblioSession-0.0.1-SNAPSHOT.jar" ]