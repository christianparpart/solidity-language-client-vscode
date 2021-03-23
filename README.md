# Native Solidity Language Server for Visual Studio Code

**IMPORTANT: THIS PROJECT IS IN ALPHA STAGE & ACTIVE DEVELOPMENT**

This Visual Studio Code extension is using the `solc` builtin language server to provide
LSP capabilities to the editor.

### Configuration

* `Solidity.solc.path`: path to native solc executable or `null` to use the bundled solc binary.
* `Solidity.solc.logpath`: path to logfile `solc` should log to or `null` to disable logging.
* `Solidity.trace.server`: One of `Off`, `Messages`, `Verbose` to configure LSP level logging on the client side.

### Note

The bundled `solc` binary was built on Ubuntu 20.10 and may not work on every machine.
This will be changed to a static build for Linux and also extended to OS/X and Windows binaries soon.

### Remarks

Some source files (`solidity-snippets.json`, `solidity-syntax.json`, `solidity-configuration.json`) were
originally taking from https://github.com/juanfranblanco/vscode-solidity/.
