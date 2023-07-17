---
title: JSON Schema
date: 2020-11-01
tags:
---

https://json-schema.org/understanding-json-schema/index.html

Used by angular builders: https://github.com/angular/angular/blob/master/aio/content/guide/cli-builder.md#angular-cli-builders

## Tools

https://github.com/bcherny/json-schema-to-typescript - json2ts server, browser or online tool

https://bcherny.github.io/json-schema-to-typescript-browser/ - json2ts in browser

## Workflow

Use `json2ts` to test partials or fully supported schemas.

Example:

```javascript
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "title": "SvgToTsBuilder",
  "description": "The svg-icons-builder is a Angular builder for the svg-to-ts project. It can be used to convert SVG icons inside an Angular library or SPA to an object, to constants or even to individual TypeScript or JavaScript files",
"allOf": [
    {"$ref": "#/definitions/baseOptions"},
  {"properties": {
    "conversionType": {
      "type": "string",
      "description": "Converting your icons to a single object, converting your icons to constants or converting your icons to single files.",
      "default": "constants",
      "enum": ["object", "constants", "files"]
    },
   "srcFiles": {
      "type": "array",
      "description": "Input files matching the given filename pattern.",
      "items": [
        {
          "type": "string"
        }
      ],
      "default": "['*.svg']"
    },
    "outputDirectory": {
      "type": "string",
      "description": "Name of the output directory.",
      "default": "\"./dist\""
    },
    "svgoConfig": {
      "type": "object",
      "description": "A path to your svgoConfiguration JSON file or an inline configuration object."
    },
    "delimiter": {
      "type": "string",
      "description": "Delimiter which is used to generate the types and name properties.",
      "default": "SNAKE",
      "enum": ["CAMEL", "KEBAB", "SNAKE", "UPPER"]
    },
     "generateCompleteIconSet": {
                "type": "boolean",
                "description": "TODO: is this the same as: exportCompleteIconSet"
              }
  }
}],
 "required": ["conversionType"],
  "definitions": {
    "baseOptions": {
      "type": "object",
      "properties": {
        "srcFiles": {
          "type": "array",
          "description": "Input files matching the given filename pattern.",
          "items": [
            {
              "type": "string"
            }
          ],
          "default": "['*.svg']"
        },
        "outputDirectory": {
          "type": "string",
          "description": "Name of the output directory.",
          "default": "\"./dist\""
        },
        "svgoConfig": {
          "type": "object",
          "description": "A path to your svgoConfiguration JSON file or an inline configuration object."
        },
        "delimiter": {
          "type": "string",
          "description": "Delimiter which is used to generate the types and name properties.",
          "default": "SNAKE",
          "enum": ["CAMEL", "KEBAB", "SNAKE", "UPPER"]
        }
      },
      "required": ["srcFiles", "outputDirectory", "svgoConfig", "delimiter"]
    }
  },
  "additionalProperties": false
}
```

## `$ref` and `$id`

Must be full uri for external schemas.

## Conditional schemas

https://json-schema.org/understanding-json-schema/reference/conditionals.html

Great to combine schemas, not supported in `json2ts`

```javascript
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "title": "SvgToTsBuilder",
  "description": "The svg-icons-builder is a Angular builder for the svg-to-ts project. It can be used to convert SVG icons inside an Angular library or SPA to an object, to constants or even to individual TypeScript or JavaScript files",
  "properties": {
    "conversionType": {
      "type": "string",
      "description": "Converting your icons to a single object, converting your icons to constants or converting your icons to single files.",
      "default": "constants",
      "enum": ["object", "constants", "files"]
    }
  },
  "allOf": [
    {
      "if": {
        "properties": { "conversionType": { "const": "constants" } }
      },
      "then": {
        "allOf": [
          { "$ref": "#/definitions/baseOptions" },
          {
            "properties": {
              "fileName": {
                "type": "string",
                "description": "File name of the generated constants file.",
                "default": "my-icons"
              },
              "typeName": {
                "type": "string",
                "description": "Name of the generated type.",
                "default": "myIcons"
              },
              "generateType": {
                "type": "boolean",
                "description": "Prevent generating enumeration type.",
                "default": false
              },
              "generateTypeObject": {
                "type": "boolean",
                "description": "Generate type object.",
                "default": false
              },
              "generateCompleteIconSet": {
                "type": "boolean",
                "description": "TODO: is this the same as: exportCompleteIconSet",
                "default": false
              },
              "exportCompleteIconSet": {
                "type": "boolean",
                "description": "Specifies if the complete icon set should be exported or not (can be very handy for showcases)",
                "default": false
              },
              "prefix": {
                "type": "string",
                "description": "Prefix for the generated svg constants.",
                "default": "myIcon"
              },
              "interfaceName": {
                "type": "string",
                "description": "Name for the generated interface.",
                "default": "MyIcon"
              }
            },
            "required": [
              "fileName",
              "typeName",
              "generateType",
              "generateTypeObject",
              "generateCompleteIconSet",
              "prefix",
              "interfaceName"
            ]
          }
        ]
      }
    },
    {
      "if": {
        "properties": { "conversionType": { "const": "object" } }
      },
      "then": {
        "allOf": [
          { "$ref": "#/definitions/baseOptions" },
          {
            "properties": {
              "fileName": {
                "type": "string",
                "description": "File name of the generated constants file.",
                "default": "my-icons"
              },
              "obejctName": {
                "type": "string",
                "description": "name of the exported const - if nothing is set - default export will be used",
                "default": "icons"
              }
            },
            "required": ["fileName", "objectName"]
          }
        ]
      }
    },
    {
      "if": {
        "properties": { "conversionType": { "const": "files" } }
      },
      "then": {
        "allOf": [
          { "$ref": "#/definitions/baseOptions" },
          {
            "properties": {
              "typeName": {
                "type": "string",
                "description": "Name of the generated type.",
                "default": "myIcons"
              },
              "generateType": {
                "type": "boolean",
                "description": "Prevent generating enumeration type.",
                "default": false
              },
              "generateTypeObject": {
                "type": "boolean",
                "description": "Generate type object.",
                "default": false
              },
              "exportCompleteIconSet": {
                "type": "boolean",
                "description": "Specifies if the complete icon set should be exported or not (can be very handy for showcases)",
                "default": false
              },
              "prefix": {
                "type": "string",
                "description": "Prefix for the generated svg constants.",
                "default": "myIcon"
              },
              "interfaceName": {
                "type": "string",
                "description": "Name for the generated interface.",
                "default": "MyIcon"
              },
              "modelFileName": {
                "type": "string",
                "description": "",
                "default": "my-icons.model"
              },
              "additionalModelOutputPath": {
                "type": "string",
                "description": "if a path is specified we will generate an additional file containing interface and type to this path - can be useful to improve type safety"
              },
              "iconsFolderName": {
                "type": "string",
                "description": "name of the folder we will build the TypeScript files to",
                "default": "build"
              },
              "compileSources": {
                "type": "boolean",
                "description": "If set to false, we generate a TypeScript file for each SVG. If set to true we will allready compile those TypeScript files and generate JavaScript files and declaration files.",
                "default": false
              },
              "barrelFileName": {
                "type": "string",
                "description": "name of the generated type",
                "default": "index"
              }
            },
            "required": [
              "typeName",
              "generateType",
              "generateTypeObject",
              "exportCompleteIconSet",
              "prefix",
              "interfaceName",
              "modelFileName",
              "iconsFolderName",
              "compileSources",
              "barrelFileName"
            ]
          }
        ]
      }
    }
  ],
  "required": ["conversionType"],
  "definitions": {
    "baseOptions": {
      "type": "object",
      "properties": {
        "srcFiles": {
          "type": "array",
          "description": "Input files matching the given filename pattern.",
          "items": [
            {
              "type": "string"
            }
          ],
          "default": "['*.svg']"
        },
        "outputDirectory": {
          "type": "string",
          "description": "Name of the output directory.",
          "default": "\"./dist\""
        },
        "svgoConfig": {
          "type": "object",
          "description": "A path to your svgoConfiguration JSON file or an inline configuration object."
        },
        "delimiter": {
          "type": "string",
          "description": "Delimiter which is used to generate the types and name properties.",
          "default": "SNAKE",
          "enum": ["CAMEL", "KEBAB", "SNAKE", "UPPER"]
        }
      }
    }
  }
}
```
