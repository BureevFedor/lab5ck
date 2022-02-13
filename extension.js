const vscode = require('vscode');

let ftextStatusBarItem = null;
let StatusBar_item_visible = 0;

function updateStatusBarItem() 
{
	if(ftextStatusBarItem == null)
		return;

	if(StatusBar_item_visible == 0){
		ftextStatusBarItem.hide();
		return;
	}

	let editor = vscode.window.activeTextEditor;

	if(editor){
		let lines = 0;
		let vowels = 0;
		let consonants = 0;
		let digits = 0;	
		
		let document = editor.document;
		let selection = editor.selection;
		let text = document.getText(selection);

		if(text){
			let lines_res = text.match(/\n/g);
			if(lines_res){
				lines = lines_res.length;
			}

			let vowels_res = text.match(/[aeiou]/ig);
			if(vowels_res){
				vowels = vowels_res.length;
			}

			let consonants_res = text.match(/[bcdfghjklmnpqrstvwxyz]/ig);
			if(consonants_res){
				consonants = consonants_res.length;
			}

			let digits_res = text.match(/\d/g);
			if(digits_res){
				digits = digits_res.length;
			}
		}
		
		ftextStatusBarItem.text = `Lines:${lines} Vowels:${vowels} Consonants:${consonants} Digits:${digits}`;
		ftextStatusBarItem.show();
	}
	else{
		ftextStatusBarItem.hide();
	}
}

function activate(context) 
{
	vscode.window.showInformationMessage('### extension ftext is now active');

	// create statusbar item and register show and hide commands
			
	ftextStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
	context.subscriptions.push(ftextStatusBarItem);
			
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	let showinfo_command_item = vscode.commands.registerCommand('extension.ftext.showinfo', () => {
		StatusBar_item_visible = 1;
		updateStatusBarItem();
	});
	
	context.subscriptions.push(showinfo_command_item);
	
	let hideinfo_command_item = vscode.commands.registerCommand('extension.ftext.hideinfo', () => {
		StatusBar_item_visible = 0;
		updateStatusBarItem();
	});
	
	context.subscriptions.push(hideinfo_command_item);

	// register reverse command

	let reverse_command_item = vscode.commands.registerCommand('extension.ftext.reverse', () => {
		
		let editor = vscode.window.activeTextEditor;

		if (editor) {

			vscode.window.showInformationMessage('### Reverse selected text');

			let document = editor.document;
			let selection = editor.selection;
			let text = document.getText(selection);

			let reversed = text.split('').reverse().join('');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, reversed);
			});
			updateStatusBarItem();
		}
		else
			vscode.window.showInformationMessage('### active text editor is not found');

	});

	context.subscriptions.push(reverse_command_item);

	// register uppercase command

	let uppercase_command_item = vscode.commands.registerCommand('extension.ftext.uppercase', () => {
		
		let editor = vscode.window.activeTextEditor;
	
		if (editor) {
	
			vscode.window.showInformationMessage('### Uppercase selected text');
				
			let document = editor.document;
			let selection = editor.selection;
			let text = document.getText(selection);
			
			let uppercased = text.toUpperCase();
			editor.edit(editBuilder => {
				editBuilder.replace(selection, uppercased);
			});
			
			updateStatusBarItem();
		}
		else
			vscode.window.showInformationMessage('### active text editor is not found');
	
	});
	
	context.subscriptions.push(uppercase_command_item);

	// register lowercase command

	let lowercase_command_item = vscode.commands.registerCommand('extension.ftext.lowercase', () => {
		
		let editor = vscode.window.activeTextEditor;

		if (editor) {

			vscode.window.showInformationMessage('### Lowercase selected text');
			
			let document = editor.document;
			let selection = editor.selection;
			let text = document.getText(selection);
			
			let lowercased = text.toLowerCase();
			editor.edit(editBuilder => {
				editBuilder.replace(selection, lowercased);
			});
			updateStatusBarItem();
		}
		else
			vscode.window.showInformationMessage('### active text editor is not found');

	});

	context.subscriptions.push(lowercase_command_item);
}

function deactivate() {}

module.exports = {activate, deactivate}