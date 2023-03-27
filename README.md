# @mxssfd/typedoc-theme

- demo
  - [example](https://mengxinssfd.github.io/typedoc-theme/)
  - [request-template](https://mengxinssfd.github.io/request-template/)
- [example-code](https://github.com/mengxinssfd/typedoc-theme/tree/main/example)


<img width="100%" alt="截屏2022-11-22 17 15 45" src="https://user-images.githubusercontent.com/28827520/203274626-01e0b9fe-d34a-433b-8a2e-b76831c61d8e.png">
<img width="100%" alt="截屏2022-11-22 17 15 01" src="https://user-images.githubusercontent.com/28827520/203274710-7aed38b1-9ba0-4248-8a1c-d765efc8aba6.png">


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