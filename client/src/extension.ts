import * as path from 'path';
import * as vscode from 'vscode';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Trace,
	TransportKind,
} from 'vscode-languageclient';

let client: LanguageClient;

interface SoliditySettings {
    // option for backward compatibilities, please use "linter" option instead
    solcPath: string | null;
	linter: boolean | string;
    enabledAsYouTypeCompilationErrorCheck: boolean;
    compileUsingLocalVersion: string;
    compileUsingRemoteVersion: string;
    nodemodulespackage: string;
    defaultCompiler: string;
    soliumRules: any;
    solhintRules: any;
    validationDelay: number;
    packageDefaultDependenciesDirectory: string;
    packageDefaultDependenciesContractsDirectory: string;
}

interface Settings {
    solidity: SoliditySettings;
}

export function activate(context: ExtensionContext)
{
	let config = vscode.workspace.getConfiguration('Solidity');
	let solcPath = config.get<string>("solc.path");
	let solcLogPath = config.get<string>("solc.logpath");
	let traceServer = config.get<string>("trace.server");

	const builtinSolcPath = context.extensionPath + '/libexec/solc-linux64';

	if (solcPath == null || solcPath.trim() == '')
		solcPath = builtinSolcPath;

	console.log("Using solc binary: " + solcPath);
	
	let solcArgs = [];
	solcArgs.push('--lsp');
	if (solcLogPath != null && solcLogPath.trim() != '')
	{
		solcArgs.push('--lsp-trace');
		solcArgs.push(solcLogPath);
	}

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run:   { transport: TransportKind.stdio, command: solcPath, args: solcArgs },
		debug: { transport: TransportKind.stdio, command: solcPath, args: solcArgs }
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'solidity' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'SoliditylanguageServer',
		'Solidity Language Server',
		serverOptions,
		clientOptions
	);

	// Configure communicatio1111n trace level.
	client.trace = Trace.fromString(traceServer);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
