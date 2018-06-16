# java

## zulu vs openjdk vs oracle versions

[https://javapapers.com/java/oracle-jdk-vs-openjdk-and-java-jdk-development-process/](https://javapapers.com/java/oracle-jdk-vs-openjdk-and-java-jdk-development-process/)

**openjdk**: open source implementation of oracle jdk. bug fixes may happen here and push back to oracle.

* easy install
* on ubuntu
* free license
* libraries tend to be open source

**oracle: **security fixes happen in private and push to openjdk.

* licensed by oracle
* maintained by oracle
* commercial
* The Java Development Kit \(JDK\) is free to download and use for commercial programming, but not to re-distribute."

* libraries tend to be closed source

**zulu: **open source bundle of openjdk + binaries

* tested and certified
* [https://www.azul.com/products/zulu-and-zulu-enterprise/key-features-benefits/](https://www.azul.com/products/zulu-and-zulu-enterprise/key-features-benefits/)

## multiple versions

SDKMan to the rescue! [https://sdkman.io/](https://sdkman.io/)

[https://wpanas.github.io/tools/2017/12/25/sdkman.html](https://wpanas.github.io/tools/2017/12/25/sdkman.html)

#### install

```
sdk install java
```

#### list

```
sdk list java
```



