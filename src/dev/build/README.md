# dev/build

Build the default and OSS distributables of Kibana.

# Quick Start

```sh

# checkout the help for this script
node scripts/build --help

# build a release version
node scripts/build --release

# reuse already downloaded node executables, turn on debug logging
node scripts/build --skip-node-download --debug
```

# Fixing out of memory issues

Building Kibana and its distributables can take a lot of memory to finish successfully. Builds do make use of child processes, which means you can increase the amount of memory available by specifying `NODE_OPTIONS="--max-old-space-size=VALUE-IN-MEGABYTES"`.

```sh

# Use 4GB instead of the standard 1GB for building
NODE_OPTIONS="--max-old-space-size=4096" node scripts/build --release
```

# Structure

The majority of this logic is extracted from the legacy grunt build, and is designed to maintain the general structure grunt provides including tasks and config. The [build_distributables.js] file defines which tasks are run.

**Task**: [tasks/\*] define individual parts of the build. Each task is an object with a `run()` method, a `description` property, and optionally a `global` property. They are executed with the runner either once (if they are global) or once for each build. Non-global/local tasks are called once for each build, meaning they will be called twice be default, once for the OSS build and once for the default build and receive a build object as the third argument to `run()` which can be used to determine paths and properties for that build.

**Config**: [lib/config.js] defines the config used to execute tasks. It is mostly used to determine absolute paths to specific locations, and to get access to the Platforms.

**Platform**: [lib/platform.js] defines the Platform objects, which define the different platforms we build for. Use `config.getTargetPlatforms()` to get the list of platforms we are targeting in this build, `config.getNodePlatforms()` to get the list of platform we will download node for, or `config.getPlatform` to get a specific platform and architecture.

**Log**: We use the `ToolingLog` defined in [@kbn/tooling-log]

**Runner**: [lib/runner.js] defines the runner used to execute tasks. It calls tasks with specific arguments based on whether they are global or not.

**Build**:  [lib/build.js], created by the runner and passed to tasks so they can resolve paths and get information about the build they are operating on.

[tasks/\*]: ./tasks
[lib/config.js]: ./lib/config.js
[lib/platform.js]: ./lib/platform.js
[lib/runner.js]: ./lib/runner.js
[lib/build.js]: ./lib/build.js
[build_distributables.js]: ./build_distributables.js
[@kbn/tooling-log]: ../../../packages/kbn-tooling-log
