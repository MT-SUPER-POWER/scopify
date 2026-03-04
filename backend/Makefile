#  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ DEPLOY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

netease_deploy:
	kubectl apply -f ./netease-pod.yml
	kubectl apply -f ./netease-svc.yml

#  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UNDEPLOY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

netease_undeploy:
	kubectl delete -f ./netease-svc.yml
	kubectl delete -f ./netease-pod.yml

#  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

netease_status:
	kubectl get pods -l app=netease-api
	kubectl get svc netease-api-svc
