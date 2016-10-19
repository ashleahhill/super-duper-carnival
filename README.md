# The Weather in Norfolk


Displaying the weather in Norfolk.

## Installation and Configuration

Clone the repository and run `npm install` in the root directory.

```bash
$ npm install

```

You will need a configuration file to build the app. An example configuration file can be found in `example.config.json`.

Copy the file and update values. Make sure the file name ends in `_.config.json`.

```bash
$ cp example.config.json <configName>_.config.json
```

Set the `CARNIVAL` variable to the first part of the config file's name.

```bash
$ set CARNIVAL=<configName>
```

Run npm start to run the app locally

```
$ npm start
```


Built with [generator-react-static](https://github.com/kriasoft/react-static-boilerplate).


### License
Copyright © 2015-present Ashley Hill. This source code is licensed under the MIT license found in [LICENSE.txt](https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt) file.

