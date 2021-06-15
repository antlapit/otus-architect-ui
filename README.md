# OTUS Architect UI


`docker build -t antlapit/otus-architect-ui:v1 -f Dockerfile .`

kubectl apply -f deployment/deployment.yaml
kubectl apply -f deployment/service.yaml
kubectl port-forward service/frontend-service 10000:80
