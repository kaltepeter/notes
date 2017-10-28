# Jasmine: typesafe stubs for container component tests

### problem:

container component tests are slow and painful. require mocking a lot of objects sometimes multiple levels deep

### option 1: shallow tests with no errors schema

[https://angular.io/guide/testing\#shallow-component-tests-with-no\_errors\_schema](https://angular.io/guide/testing#shallow-component-tests-with-no_errors_schema)

##### Challenges:

* compiler no longer alerts you to mistakes such as misspelled or misused components and directives \(from angular docs\)

### option 2: test doubles

##### Challenges:

* duplicating components for stubs can create a lot of maintenance and fall apart over time
* TestBed.get will not work 

### option 3: load all children and write integration tests

##### Challenges:

* heavy, hard to write tests for higher order components
* slow to run
* can't write isolated unit tests

### solution: typesafe stubs

##### Challenges:

* duplicating components for stubs can create a lot of maintenance if not tied together with implementation
* TestBed.get will not work 



