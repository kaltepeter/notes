---
title: Groovy
date: 2019-02-03
tags:
  - language
---

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

## @Canonical

https://mrhaki.blogspot.com/2011/05/groovy-goodness-canonical-annotation-to.html

Adds @ToString, @EqualsAndHashCode and @TupleConstructor annotations.

### example code

```groovy
package com.mrll.javelin.slack

import groovy.transform.Canonical
import groovy.util.logging.Log4j

@Log4j
//@Canonical
class Message implements Serializable {
  String text = ""
  List<Attachment> attachments = []
  String channel = ''
  String channelName = ''

  Message() {
    this([:])
  }

  Message(Map map) {
    log.debug "heretaco: ${map}"
    println "herepizza23: ${map}"
    def roomName = map['channelName'] as String
    log.debug "here2: ${roomName}"
    this.addChannel(roomName)
    log.debug "room: ${roomName} ${roomName.dump()}"
  }

  void addChannel(String roomName) {
    def room = Rooms.getIfPresent(roomName)
    def roomId = room.roomId
    log.debug "setChannel: ${room.dump()} ${roomId}"
    this.channel = roomId
  }
}
```

### example useage

```groovy
import com.mrll.javelin.slack.Message

def message = new Message(text: 'yo', channelName: 'NODE_DEFAULT')
def message2 = new Message(text: 'yo', channelName: 'NODE_DEFAULT')
println message

assert message == message2
```

### output without @Canonical

```bash
herepizza23: [text:yo, channelName:NODE_DEFAULT]
Assertion failed:
herepizza23: [text:yo, channelName:NODE_DEFAULT]

com.mrll.javelin.slack.Message@68c72235
assert message == message2
       |       |  |
       |       |  com.mrll.javelin.slack.Message@10959ece
       |       false
       com.mrll.javelin.slack.Message@68c72235

```

```bash
herepizza23: [text:yo2, channelName:NODE_DEFAULT]
herepizza23: [text:yo, channelName:NODE_DEFAULT]
com.mrll.javelin.slack.Message@1f97cf0d
Assertion failed:

assert message == message2
       |       |  |
       |       |  com.mrll.javelin.slack.Message@140c9f39
       |       false
       com.mrll.javelin.slack.Message@1f97cf0d

```

### output WITH @Canonical

```bash
herepizza231: [text:yo, channelName:NODE_DEFAULT]
herepizza231: [text:yo, channelName:NODE_DEFAULT]
com.mrll.javelin.slack.Message(, [], CET6MM86B, )
```

```bash
herepizza231: [text:yo2, channelName:NODE_DEFAULT]
herepizza231: [text:yo, channelName:NODE_DEFAULT]
com.mrll.javelin.slack.Message(, [], CET6MM86B, )
```

## AST

http://docs.groovy-lang.org/latest/html/api/groovy/transform/package-summary.html

Browser
https://melix.github.io/ast-workshop/exercise1-hints.html

```bash
ctrl + t
# mac
command + t
```

### groovy transforms

https://github.com/apache/groovy/blob/2d17694153d787f8a9c9712d94165e9891a7f29a/src/main/java/org/codehaus/groovy/transform

## console

https://swalsh.org/blog/running-the-groovy-console-from-gradle/

## spock

https://thejavatar.com/testing-with-spock/
