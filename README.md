# @mxssfd/typedoc-theme

- demo
  - [example](https://mengxinssfd.github.io/typedoc-theme/)
  - [request-template](https://mengxinssfd.github.io/request-template/)
- [example-code](https://github.com/mengxinssfd/typedoc-theme/tree/main/example)

![](https://user-images.githubusercontent.com/28827520/227901035-ca6c59cc-5710-40fc-bafa-c46512dd40c4.png)
![](https://user-images.githubusercontent.com/28827520/227901614-11a815bd-2d3a-4b2d-8a90-292380601aee.png)
![](https://user-images.githubusercontent.com/28827520/227901683-cee48723-e09f-45d5-87d6-7342c90c75f1.png)
![](https://user-images.githubusercontent.com/28827520/227901740-3c5d97ab-cdfe-40ef-ba52-2683e0ee8443.png)

## Installation

```shell
npm install typedoc @mxssfd/typedoc-theme -D
```

## Usage

use script command

```shell
typedoc --plugin @mxssfd/typedoc-theme --theme my-theme
```

or

use `typedoc.json`

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "plugin": ["@mxssfd/typedoc-theme"],
  "theme": "my-theme"
}
```
