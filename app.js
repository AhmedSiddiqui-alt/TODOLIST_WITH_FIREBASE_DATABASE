var parent_List = document.getElementById('parent_List');
function add_Items() {
    var user_Task = document.getElementById('user_Task');
    var child_List = document.createElement('li');
    var txt_Child = document.createTextNode(user_Task.value);
    var delete_Button = document.createElement('button');
    var txt_Button = document.createTextNode('Delete Task');
    delete_Button.setAttribute("onclick", "delete_Tasks(this)");
    delete_Button.appendChild(txt_Button);

    var edit_Button = document.createElement('button');
    var txt_Button_1 = document.createTextNode('Edit Task');
    edit_Button.setAttribute("onclick", "edit_Tasks(this)");
    edit_Button.appendChild(txt_Button_1);
    child_List.append(txt_Child);
    child_List.append(delete_Button);
    child_List.append(edit_Button);
    parent_List.append(child_List);
    var key = firebase.database().ref('Tasks').push().key;
    var Tasks = {
        key: key,
        task: user_Task.value
    }
    var key = firebase.database().ref('Tasks/' + key).set(Tasks);

    user_Task.value = "";
}

function get_Tasks() {
    firebase.database().ref('Tasks').once("value", getuserData)
}
function getuserData(snapshot) {
    snapshot.forEach(userSnapshot => {
        var k = userSnapshot.key;
        var task = userSnapshot.val().task;
        var child_List = document.createElement('li');
        var txt_Child = document.createTextNode(task);
        var txt_key = document.createTextNode(k);
        var delete_Button = document.createElement('button');
        var txt_Button = document.createTextNode('Delete Task');
        delete_Button.setAttribute("onclick", "delete_Tasks(this)");
        delete_Button.appendChild(txt_Button);
        var edit_Button = document.createElement('button');
        var txt_Button_1 = document.createTextNode('Edit Task');
        edit_Button.setAttribute("onclick", "edit_Tasks(this)");
        child_List.setAttribute('class', "class_List_Style")
        edit_Button.appendChild(txt_Button_1);
        child_List.append(txt_key);
        child_List.append(txt_Child);
        child_List.append(delete_Button);
        child_List.append(edit_Button);
        parent_List.append(child_List);
    });
}
get_Tasks()

function edit_Tasks(e) {
    console.log(e.parentNode.childNodes[0].nodeValue);
    console.log(e.parentNode.childNodes[1].nodeValue);
    var edit_Tasks=prompt("Enter Your Tasks",e.parentNode.childNodes[1].nodeValue);
    
    firebase.database().ref('Tasks/'+e.parentNode.childNodes[0].nodeValue).set({
        key:e.parentNode.firstChild.nodeValue,
        task:edit_Tasks
    });
    location.reload(true);
}
// function delete_Tasks(e) {
//     e.parentNode.remove();
// }
// function edit_Tasks(e) {
//     var editTasks = prompt("Enter Task Name", e.parentNode.firstChild.nodeValue);
//     e.parentNode.firstChild.nodeValue = editTasks;
// }