var selectedRow = null
//when submit the form check the all condition to insert name
function onFormSubmit() {
    if (validate()) {
        if(existRecord()){
           var formData = readFormData();
           if (selectedRow == null)
              insertNewRecord(formData);
            else
              updateRecord(formData);
            resetForm();
        }
        else{
            document.getElementById("alreadyExist").style.display="block";
            setTimeout(removeAlreadyExist,1500);
        }
    }
}
//this is used for read forn date
var nameArray=Array();
function readFormData(){
    var inputVal = document.getElementById("name1");
    var valIn=inputVal.value;
    nameArray.push(valIn);
    //nameArray[nameArray.length]=valIn; //above line23 use or this line both are same
    return valIn;
}
// check the name already exist
var nameArray= Array();
function existRecord(){
     var inputVal = document.getElementById("name1");
     var valIn=inputVal.value;
     var inculding=new Boolean(false);
     inculding=nameArray.includes(valIn);
    if(!inculding&&nameArray.length>0){
        inculding=true;
    }
    else if(nameArray.length===0){
        inculding=true;
    }
    else{
        inculding=false;
    }
    return inculding;
}
//remove the label already exist
function removeAlreadyExist(){
    document.getElementById("alreadyExist").style.display="none";
} 
//insert the new record in table
function insertNewRecord(data) {
    var table = document.getElementById("nameList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
   // cell1.innerHTML = data.name1;
   cell1.innerHTML = data;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = `<button onClick="onEdit(this)"><i class="fa fa-edit"></i></button>
                       <button onClick="onDelete(this)"><i class="fa fa-trash"></i></button>`;
}
//this is reset the form
function resetForm() {
    document.getElementById("name1").value = "";
    selectedRow = null;
}
//this function for when click the edit button
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name1").value = selectedRow.cells[0].innerHTML;
    var index=nameArray.indexOf(selectedRow.cells[0].innerHTML);
    nameArray.splice(index, 1);
    change();
}
//this for change the button name from addname to edit
function change(){
    document.getElementById("addName").value="Edit";
}
//update the record in table
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData;
    success1();
    unChange();
}
//this function for show edit successfully
function success1(){
    document.getElementById("editSucessful").style.display="block";
    setTimeout(success2,1500);
}
function unChange(){
    document.getElementById("addName").value="ADD NAME";
}
//this function for hide edit successfully
function success2(){
    document.getElementById("editSucessful").style.display="none";
}
//delete the record
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("nameList").deleteRow(row.rowIndex);
        var index=nameArray.indexOf(row.cells[0].innerHTML);
        nameArray.splice(index, 1);
        resetForm();
    }
    success3();
}
////this function for show deleted successfully
function success3(){
    document.getElementById("deleteSucessful").style.display="block";
    setTimeout(success4,1500);
}
////this function for hide deleted successfully
function success4(){
    document.getElementById("deleteSucessful").style.display="none";
}
//form validate function
function validate() {
    isValid = true;
    if (document.getElementById("name1").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}