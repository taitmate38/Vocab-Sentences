

var words, definitions, wordTable, definitonTable;
//words = ["dog"] //uncomment to reset words array
//definitions = ["a thing"] //uncommet to reset defintions array
//populateStorage("words");

//tests if there is any data stored or not
if(!localStorage.getItem('words')) {
    
  document.getElementById('paragraph').innerHTML = "Status: No Data";
  populateStorage();
  
} else {
  document.getElementById('paragraph').innerHTML = "Status: Data is stored";
} 


//recalls the arrays from storage
words = recallData("words");
definitions = recallData("definitions");


if (words.length != definitions.length) {
    document.getElementById('paragraph').innerHTML = "WARNING: Arrays have unequal lengths";
}

//set the table variables
wordTable = document.getElementById('wordTable');
definitonTable = document.getElementById('definitionTable');
 

//create the tables based off of the stored arrays
for (var i = 0; i < words.length; i++) {
    tableAddInput(wordTable,words[i]);
    tableAddInput(definitionTable,definitions[i]);
}


//--------------Table-----------------------------------------


function tableAddInput(table,item) {
var row = table.insertRow(-1);
var cell = row.insertCell(0);
cell.innerHTML = item;    
}

function deleteAllRows() {
    var rowNum = wordTable.rows.length;
    var i;
    //going from 1 up ends up skipping rows, because the rows shift up
    //so need to start with last row and go down
    for (i = rowNum - 1; i > 0; i--) {
        wordTable.deleteRow(i);
        definitionTable.deleteRow(i);
    }
    
}
//--------------Storage---------------------------------------

function populateStorage(text) {
   
    switch (text) {
        case 'words':
            localStorage.setItem("words", JSON.stringify(words));
            break;
        
        case 'definitions': 
            localStorage.setItem("definitions", JSON.stringify(definitions));
            break;
    }
}

function recallData(text) {
    //should be either 'words' or 'definitions'
  return JSON.parse(localStorage.getItem(text));
}

function clearData() {
    words = [];
    definitions = [];
    populateStorage('words');
    populateStorage('definitions');
    deleteAllRows();
}

//--------------Input Data------------------------------------

function showInputData(option) {
    document.getElementById("addButton").style.display='none';
    document.getElementById("InputData").style.display='block';
}

function hideInputData() {
    //add button back
    document.getElementById("addButton").style.display='block';
    //hide input area
    document.getElementById("InputData").style.display='none';
    
    //reset fields and error messages
    document.getElementById('wordInputField').value = ""
    document.getElementById('definitionInputField').value = ""
    document.getElementById('wordErrorParagraph').innerHTML = "";
    document.getElementById('definitionErrorParagraph').innerHTML = "";
}
    
function addInput() {
    //depending on the input parameter ('words' or 'defintions'), adds the 
    //input data to the correct table & array & stores it. 
    
    //gets the current value of the input field
    var wordInput, defintionInput;
    wordInput = document.getElementById('wordInputField').value;
    defintionInput = document.getElementById('definitionInputField').value;
   
   //checks if input fields are empty, and if so displays appropriate error message
   
    if (wordInput === "" && defintionInput === "") {
        //if both fields are empty
        document.getElementById('wordErrorParagraph').innerHTML = 
        "Error: No Word Entered";
        document.getElementById('definitionErrorParagraph').innerHTML = 
        "Error: No Definition Entered";
        return;
    } else if (wordInput === "") {
        //if word field is empty
        document.getElementById('wordErrorParagraph').innerHTML = 
        "Error: No Word Entered";
        document.getElementById('definitionErrorParagraph').innerHTML = "";
        return
    } else if (defintionInput === "") {
        //if definition field is empty
        document.getElementById('wordErrorParagraph').innerHTML = "";
        document.getElementById('definitionErrorParagraph').innerHTML = 
        "Error: No Definition Entered";
        return;
    }
    
    

    document.getElementById('paragraph').innerHTML = wordInput //+ "<br>" + definitonInput;
    
    //Adds the new word to the correct array and table
    //and update storage
    words.push(wordInput);
    tableAddInput(wordTable,wordInput);
    populateStorage('words');

    //Adds the new definition to the correct array and table
    //and update storage
    definitions.push(defintionInput);
    tableAddInput(definitionTable,defintionInput);
    populateStorage('definitions');
    
    
    hideInputData();
    
    //Resets input field
    
}    

//----------------------------------------------------------

function test() {
    document.getElementById('inputField').value = "YEET";
}

function showData() {
    var stuff;
    if (words.length === 0 && definitions.length === 0) {
        stuff = "Arrays are Empty";
    } else {
        stuff = recallData("words") + "<br>" + recallData("definitions");
    }
    document.getElementById('paragraph').innerHTML = "Status:" + "<br>"
    + stuff;
    
}


