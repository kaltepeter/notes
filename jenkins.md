# Jenkins

### automation

[https://github.com/arangamani/jenkins\_api\_client](https://github.com/arangamani/jenkins_api_client) - ruby libraries

[https://jenkins.io/doc/book/managing/cli/](https://jenkins.io/doc/book/managing/cli/) - cli

[https://wiki.jenkins.io/display/JENKINS/Figuring+out+URL+binding+of+Stapler](https://wiki.jenkins.io/display/JENKINS/Figuring+out+URL+binding+of+Stapler) - uri bindings investigation

[https://github.com/kohsuke/jenkins/tree/55203ebeed1b7e182878d3e3c1184ac042f20473/core/src/main/java/hudson/cli](https://github.com/kohsuke/jenkins/tree/55203ebeed1b7e182878d3e3c1184ac042f20473/core/src/main/java/hudson/cli) - cli repos

[http://javadoc.jenkins-ci.org/](http://javadoc.jenkins-ci.org/) - java doc

[https://github.com/jenkinsci/credentials-plugin/blob/master/src/main/java/com/cloudbees/plugins/credentials/cli/UpdateCredentialsByXmlCommand.java](https://github.com/jenkinsci/credentials-plugin/blob/master/src/main/java/com/cloudbees/plugins/credentials/cli/UpdateCredentialsByXmlCommand.java) - update credentials code

{jenkins\_server}/cli/ - cli docs

[https://github.com/jenkinsci/job-dsl-plugin/wiki](https://github.com/jenkinsci/job-dsl-plugin/wiki) - example dsl configuartions

http://unethicalblogger.com/2017/07/24/groovy-automation-for-jenkins.html - groovy jenkins config

#### credentials

[http://www.greenreedtech.com/creating-jenkins-credentials-via-the-rest-api/](http://www.greenreedtech.com/creating-jenkins-credentials-via-the-rest-api/) - create credentials via REST

### Github

[h](https://support.cloudbees.com/hc/en-us/articles/224621668-GitHub-User-Scopes-and-Organization-Permission)[ttps://support.cloudbees.com/hc/en-us/articles/224621668-GitHub-User-Scopes-and-Organization-Permission](https://support.cloudbees.com/hc/en-us/articles/224621668-GitHub-User-Scopes-and-Organization-Permission) - scopes needed

[https://jenkins.io/solutions/github/](https://jenkins.io/solutions/github/) - current integration doc

[https://support.cloudbees.com/hc/en-us/articles/224543927-GitHub-webhook-configuration](https://support.cloudbees.com/hc/en-us/articles/224543927-GitHub-webhook-configuration) - webhooks

## builds

wrapping a process in try/catch will not fail the build on exit 1

## docker runs

![](/assets/speed-first-and-second-run.png)

only defined step is 'Test'. declarative auto created steps

![](/assets/declarative-auto-steps.png)

#### shared pipelines

[https://jenkins.io/blog/2017/10/02/pipeline-templates-with-shared-libraries/](https://jenkins.io/blog/2017/10/02/pipeline-templates-with-shared-libraries/)

#### groovy tricks

[https://github.com/cloudbees/jenkins-scripts](https://github.com/cloudbees/jenkins-scripts)

```
println Jenkins.instance.metaClass.methods*.name.sort().unique()
```

```
Jenkins.instance.getItems().each {it -> 
  println it.name
}
Jenkins.instance.getComputers().eachWithIndex{ it, index ->
  println it.name
  println it.description
  println it.getAllExecutors()

  println it.metaClass.methods*.name.sort().unique()
}
println Jenkins.instance.metaClass.methods*.name.sort().unique()
```



