# "Visual Studio Code Extensions", a tool for managing VScode extensions
#    -> install via: npm install -g vsce
VSCE = vsce
PACKAGE_VERSION = 0.0.1

clean:
	rm -f solidity-*.vsix

package:
	$(VSCE) package

install:
	code --install-extension solidity-$(PACKAGE_VERSION).vsix

.PHONY: package install clean
