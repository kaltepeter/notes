# ngrx

### adding store

## package structure {#workingwithngrx-packagestructure}

* content
  * +state
    * breadcrumbs
    * container
    * content-grid
    * navigation
    * content.actions.ts
    * content.effects.ts
    * content.init.ts
    * content.interfaces.ts
    * content.reducer.ts
    * content.selectors.ts
  * content-breadcrumb
  * content-data-table
  * content-toolbar
* core
  * +state
    * feature-flag
    * navigation 
    * project-info
    * router
    * core.actions.ts
    * core.effects.ts
    * core.init.ts
    * core.interfaces.ts
    * core.reducer.ts
    * core.selectors.ts
  * feature-flag
* permissions
  * +state
    * permissions.init.ts
    * permissions.interfaces.ts
  * permissions-data-table
  * permissions-detail-panel

## naming {#workingwithngrx-naming}

top level object keys of your interface should have a matching package in +state

children \(immediate\) of top level object keys may have a child package

interface: singular form of top level package

interface+State extends CoreState

initial state file is .init.ts and should be of type top level interface

initial state should provide defaults for all reducer state

## Adding new store/state to permissions model {#workingwithngrx-Addingnewstore/statetopermissionsmodel}

1. models first. i.e. start with init, interfaces, types and or actions

