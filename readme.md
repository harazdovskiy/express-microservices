## It is an example of dockerized node.js microservices architecture

   [Explore API](https://documenter.getpostman.com/view/6569177/S1TVVwk1?version=latest)

---

Microservices

- api-gateways
- users
- books

---

**Start** all microservices

```console
docker-compose up --build
```

**Test** run test for specific container
```console
docker-compose -f docker-compose.test.yml up --build books
```

**Stop** and **remove** all microservices

```console
docker-compose down
```

**Rebuilt** one microservice

```console
docker-compose up --build -d books
```

**View logs** from microservice

```console
docker logs node-microservices-test_books_1 --tail 50 -f
```