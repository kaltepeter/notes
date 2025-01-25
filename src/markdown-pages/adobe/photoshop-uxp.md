---
title: Adobe Photoshop UXP
date: 2024-09-22
tags:
  - adobe
  - uxp
  - photoshop
  - plugin
---

## Building Plugins

- [Adobe UXP Photoshop Plugins](https://developer.adobe.com/photoshop/uxp/2022/guides/)
- [UX patterns](https://developer.adobe.com/photoshop/uxp/2022/design/ux-patterns/)
- [Adobe Spectrum DLS](https://spectrum.adobe.com/)
- [Adobe Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/index.html)
- [UXP API Reference](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/)
- [Photoshop API](https://developer.adobe.com/photoshop/uxp/2022/ps_reference/)
- [Adobe UXP: Things You Need To Know by Davide Barranca Blogs](https://www.davidebarranca.com/development/adobe-uxp-things-you-need-to-know-uxp-landscape-guide)
- [Adobe UXP: Things You Need To Know by Davide Barranca Video Playlist](https://youtube.com/playlist?list=PLRR5kmVeh43alNtSKHUlmbBjLqezgwzPJ&si=o_qYLGD3Wo4wZALq)

## Dev Tools

- [Devtools CLI](https://github.com/adobe-uxp/devtools-cli)
- [CC Ext UXP Types](https://github.com/adobe/cc-ext-uxp-types) type definitions for Adobe UXP, install with `npm i @adobe/cc-ext-uxp-types`
- [Alchemist for Photoshop](https://github.com/jardicc/alchemist?tab=readme-ov-file) tool for inspecting batch/actions in photohshop for plugin development. Build from source, not the store version.

## Working with the Local Filesystem

- [File System Provider](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Modules/uxp/Persistent%20File%20Storage/FileSystemProvider/)

### Where to Store Files

- [FIle I/O Docs](https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/file-access/)
- [Local Filesystem Permissions](https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/file-access/)

```json
{
    "requiredPermissions": {
        "localFileSystem": "request" # request, plugin, or fullAccess
    }
}
```

| type | description | how to access | read | write |
| --- | --- | --- | --- | --- |
| user | Gets a folder from the file system via a folder picker dialog. | `getFolder().getEntries()` | x | x |
| system | Returns a temporary folder. The contents of the folder will be removed when the extension is disposed. | `getTemporaryFolder()` | x | x |
| system | Returns a folder that can be used for extension's data storage without user interaction. It is persistent across host-app version upgrades. | `getDataFolder()` | x | x | 
| system | Returns an plugin's folder – this folder and everything within it are read only. This contains all the Plugin related packaged assets. | `getPluginFolder` | x |  |

`~/Library/Application\ Support/Adobe/UXP/PluginsStorage/PHSP/25/Developer/ppw/PluginData/` is an exxample for `getDataFolder()` on mac

- https://forums.creativeclouddeveloper.com/t/how-to-read-json-and-save-json-to-appdata-roaming/6051/5
- https://forums.creativeclouddeveloper.com/t/storage-scheme-differences/5434

### Get a File Entry

`createEntry` gets the file entry object, not the actual file on disk. If the file doesn't exist it will create a file entry object for read/write.

`overwrite` true will allow write if it exists, false will silently skip writing

```javascript
const settingsFile = /** @type {storage.File} */ (
    await dataFolder.createEntry(filename, {
        overwrite: false,
        type: storage.types.file, 
    })
);
```

### Read File Contents

> [!CAUTION]
> throws error:  `Error: no such file or directory` if file doesn't exist

```javascript
// https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Modules/uxp/Persistent%20File%20Storage/File/#readoptions
const fileContents = await settingsFile.read();

// 
```

### Write File Contents

`append` true will append, false will overwrite

> [!TIP]
> If the file is not writable it silently skips writing

```javascript
await settingsFile.write(JSON.stringify(defaultContents), {
    append: false,
});
```

## Migrating From Legacy Plugins

- [UXP Migration Guides](https://github.com/Adobe-CEP/CEP-Resources/tree/master/UXP-Migration-Guide)


[ps-es-to-uxp](https://github.com/adobe-uxp/ps-es-to-uxp) 

1. create a file with this code

    ```javascript
    var mainScriptPath = Folder($.fileName).parent.parent ; 
    $.evalFile(new File(mainScriptPath + '/ad-to-uxp.jsx'));
    ```

1. copy the ad-to-uxp.jsx file into the same folder as the main script
1. run the main script

## Web Components

https://forums.creativeclouddeveloper.com/t/sp-radio-group-react-issues-onchange-vs-oninput-vs-onclick/3109/2

- Native events don't fire in React, use the WC.jsx from the sample codeS