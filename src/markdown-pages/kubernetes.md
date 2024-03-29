---
title: Kubernetes
date: 2023-11-25
tags:
  - platform
---

DOCS: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#container-v1-core

## ingress

https://kubernetes.io/docs/concepts/services-networking/ingress/

https://medium.com/@cashisclay/kubernetes-ingress-82aa960f658e

https://kubernetes.github.io/ingress-nginx/deploy/#minikube

### addon

```bash
minikube addons enable ingress
```

### running own

**MUST start kubectl proxy**

### domains

local only domain.

1. edit host file on machine to point to minikube ip
1. edit host file on minikube vm as well

### nginx

https://hackernoon.com/setting-up-nginx-ingress-on-kubernetes-2b733d8d2f45

https://github.com/gokulchandra/k8s-ingress-setup

https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/

https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/multiple-ingress.md#multiple-ingress-controllers

## storage

https://supergiant.io/blog/persistent-storage-with-persistent-volumes-in-kubernetes

## debugging

`kubectl cluster-info dump`

`kubectl get pods -n kube-system`

## minikube

```bash
minikube start --kubernetes-version v1.11.4 --memory 4096
```

## azure

https://docs.microsoft.com/en-us/azure/aks/developer-best-practices-resource-management

## resources

https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/

## promql

https://medium.com/@amimahloof/kubernetes-promql-prometheus-cpu-aggregation-walkthrough-2c6fd2f941eb

## Config Maps

- [Configure Pod Config Maps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)

Config maps are great to inject data into a pod.

```bash
kubectl create configmap rake-task --from-file=./lib/tasks/one_time/preprocess_active_storage.rake -n my-namespace
```

To use:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  namespace: my-namespace
  name: process-attachments
spec:
  backoffLimit: 0
  template:
    spec:
      restartPolicy: Never
      volumes:
        - name: task-volume
          configMap:
            name: rake-task # Reference the created ConfigMap
            items:
              - key: preprocess_active_storage.rake
                path: preprocess_active_storage.rake
      containers:
        command:
        - /bin/bash
        - -c
        - |
          cat /usr/src/lib/tasks/one_time/preprocess_active_storage.rake
        volumeMounts:
          - name: task-volume
            mountPath: /usr/src/lib/tasks/one_time/
```

You can execute your task in container.
