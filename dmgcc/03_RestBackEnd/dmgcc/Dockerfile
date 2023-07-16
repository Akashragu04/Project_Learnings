FROM maven:3.8.4-openjdk-17-slim as build

#RUN apt-get update

COPY . /usr/src/mymaven
#COPY .m2 /usr/src/mymaven/.m2
#COPY entrypoint.sh /usr/local/bin/entrypoint.sh

#RUN chmod +x /usr/local/bin/entrypoint.sh

# #Start application
WORKDIR /usr/src/mymaven

#COPY settings.xml /usr/share/maven/ref/settings.xml

#RUN mvn clean deploy -Dmaven.test.skip=true

RUN mvn clean install -DskipTests=true

# BUild the application
#ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
#CMD ["bash"]

FROM tomcat:9-jdk17-openjdk
COPY --from=build /usr/src/mymaven/target/*.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
ENTRYPOINT ["catalina.sh", "run"]