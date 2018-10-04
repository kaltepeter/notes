# groovy

get env vars: [http://www.mytechtoday.com/2009/01/read-environment-variables-with-groovy.html](http://www.mytechtoday.com/2009/01/read-environment-variables-with-groovy.html)

```text
def env = System.getenv()
println env['HOME']
```

executing complex shell: [http://www.joergm.com/2010/09/executing-shell-commands-in-groovy/](http://www.joergm.com/2010/09/executing-shell-commands-in-groovy/)

[https://gist.github.com/kaltepeter/e5cbe4b7c1ec3e0f2ea4c54f93ee520a](https://gist.github.com/kaltepeter/e5cbe4b7c1ec3e0f2ea4c54f93ee520a) for example

## chaining closures

[http://mrhaki.blogspot.com/2011/04/groovy-goodness-chain-closures-together.html](http://mrhaki.blogspot.com/2011/04/groovy-goodness-chain-closures-together.html)

## scripts

http://scottfrederick.cfapps.io/blog/2012/03/23/Wrapping-a-Groovy-script-with-Gradle

### run from jar file

```bash
docker exec -it jenkinsmaster cli -remoting groovy jar:file:./build/llibs/jenkins-1.0-sources.jar'!'/ConfigureSlaveNode.groovy
```

```groovy
  manifest {
    attributes 'Main-Class': mainClassName
  }
  ```

### get parent directory path

```groovy
def pwd = new File(getClass().protectionDomain.codeSource.location.path).parent
def seed = new File("${pwd}/SeedPipelinesJob.groovy").text
```

### load groovy from other script

https://www.jmdawson.net/blog/2014/08/18/using-functions-from-one-groovy-script-in-another/

http://groovy-lang.org/structure.html#_scripts_versus_classes

> Reflecting on the problem that evening, I recalled that every groovy script is more or less a class with the name of the file in which the script resides ((This behavior is hinted at in the Scripts and Classes section of the Groovy documentation

```groovy
thing = new getThing()
println thing.getThingList()
```
