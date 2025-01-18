

import * as vscode from 'vscode';


import { getAIResponse } from './aiIntegration';




async function typeTextInEditor(editor :vscode.TextEditor,text:string){
   for(let i = 0; i<text.length; i++){
       await new Promise(resolve => setTimeout(resolve, 50))
       editor.edit(editBuilder => {
           editBuilder.insert(editor.selection.active, text[i])
       })
   }  


}
async function handleUserInput(){
   const prompt = await vscode.window.showInputBox({
       prompt: "Enter prompt in natural language "


   })


   if(prompt== undefined){
       return;
   }


   const editor = vscode.window.activeTextEditor;
   if (!editor){
       return
   }


   editor.edit(editBuilder => {
       editBuilder.insert(editor.selection.active, 'Getting response......')
   })


   const botResponse = await getAIResponse(prompt)


   const loadingMessageLength = 'Fetching Response ...'.length;


   editor.edit(editBuilder => {
       editBuilder.delete(
           new vscode.Range(
               editor.selection.active.translate(0, -loadingMessageLength),
                editor.selection.active
           )
       )
   })


   await typeTextInEditor(editor, botResponse);


   vscode.window.showInformationMessage('Response fetched successfully')
  
}


export function activate(context: vscode.ExtensionContext ){
   let disposable = vscode.commands.registerCommand('extension.getAIResponse', async()=>{
       await handleUserInput()
   })


   context.subscriptions.push(disposable) 


}

