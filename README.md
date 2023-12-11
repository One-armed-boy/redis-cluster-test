# redis-cluster-test
for Redis Cluster Test

## Use
### Init Redis Cluster
```
docker-compose up -d
# Check Status
docker exec -it {Container ID} redis-cli -a {PASSWORD} -c
redis > CLUSTER NODES
```

### Init NodeJS
```
npm i
```
