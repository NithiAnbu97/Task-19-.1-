// on window load getData() should fetch
getData();

// Submittting our Form data througth API..(POST method)
var editClicked = false;
var currentId;

function decide() {
    if (editClicked == false) {
        postData();
    } else {
        upd(currentId);
        editClicked = false;

    }

}




async function postData() {

    try {
        var formData = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            qual: document.getElementById("qual").value,
            state: document.getElementById("state").value,
            pincode: document.getElementById("pincode").value,

            gender: document.getElementById("gender").value,
            country: document.getElementById("country").value,
            // state: document.getElementById("state").value,
            food: document.getElementById("food").value,

        }
        var userEnteredData = await fetch("https://61f12259072f86001749f04f.mockapi.io/userdata", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json"
            }
        });
    } catch (err) {
        alert("Failed Try Again later...");
    }
    alert("User Successfully Registered");
    getData();
    clear();
}

async function getData() {
    try {
        var allData = await fetch("https://61f12259072f86001749f04f.mockapi.io/userdata")
        var userData = await allData.json();
        document.getElementById("tbody").innerHTML = " ";
        userData.forEach((ele) => {
            var id = ele.id;
            var name = ele.name;
            var age = ele.age;
            var qual = ele.qual;
            var state = ele.state;
            var pincode = ele.pincode;
           
            var gender = ele.gender;
            var country = ele.country;
        
            var food = ele.food;

            var trBody = document.getElementById("tbody");

            var tr = document.createElement("tr");
            trBody.appendChild(tr);

            var Idtd = document.createElement("td");
            Idtd.innerText = id;

            var Nametd = document.createElement("td");
            Nametd.innerText = name;

            var Agetd = document.createElement("td");
            Agetd.innerText = age;

            var Qualtd = document.createElement("td");
            Qualtd.innerText = qual;

            var Statetd = document.createElement("td");
            Statetd.innerText = state;

            var Pincodetd = document.createElement("td");
            Pincodetd.innerText = pincode;

            var gendertd = document.createElement("td");
            gendertd.innerText = gender;

            var countrytd = document.createElement("td");
            countrytd.innerText = country;
            

            var foodtd = document.createElement("td");
            foodtd.innerText = food;

            var edit = document.createElement("td");
            edit.innerHTML = `<a href="#" id="edit"><i class="fa fa-edit"></i></a>`;

            var deleteTd = document.createElement("td");
            deleteTd.innerHTML = `<a href="#" id="delete"><i class="fa fa-times"></i></a>`;

            tr.append(Idtd, Nametd, Agetd, Qualtd, Statetd, Pincodetd, gendertd, countrytd, foodtd, edit, deleteTd);



            edit.addEventListener("click", () => {
                currentId = id;
                editClicked = true;
                // decide();
                updateInputFieldData(currentId);
            })

            deleteTd.addEventListener("click", () => {
                currentId = id;
                del(currentId);
            })

        });
    } catch (err) {
        console.log("Wait an Moment .. Try after some time")
    }
}



async function updateInputFieldData(id) {

    console.log(editClicked);
    var initialData = await fetch(`https://61f12259072f86001749f04f.mockapi.io/userdata/${id}`)


    var renderedData = await initialData.json();
    document.getElementById("name").value = renderedData.name;
    document.getElementById("age").value = renderedData.age;
    document.getElementById("qual").value = renderedData.qual;
    document.getElementById("state").value = renderedData.state;
    document.getElementById("pincode").value = renderedData.pincode;

    document.getElementById("gender").value = renderedData.gender;
    document.getElementById("country").value = renderedData.country;
    document.getElementById("food").value = renderedData.food;


    console.log(editClicked);
    editClicked = true;
}


async function upd(id) {
    var updatedValue = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        qual: document.getElementById("qual").value,
        state: document.getElementById("state").value,
        pincode: document.getElementById("pincode").value,

        gender: document.getElementById("gender").value,
        country: document.getElementById("country").value,
        food: document.getElementById("food").value,

    }


    var render = await fetch(`https://61f12259072f86001749f04f.mockapi.io/userdata/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedValue),
        headers: {
            "content-type": "application/json"
        }

    });

    alert("Updated Successfully");
    getData();
    clear();

    //  currentId = null;
}



//  Delete an Record 
async function del(id) {
    console.log(id);
    var deleteReq = await fetch(`https://61f12259072f86001749f04f.mockapi.io/userdata/${id}`, {
        method: "DELETE",
    });
    alert("Data Successfully Deleted");
    getData();
}



// Clears an input field after submit/update
function clear() {
    document.getElementById("name").value = " ";
    document.getElementById("age").value = " ";
    document.getElementById("qual").value = " ";
    document.getElementById("state").value = " ";
    document.getElementById("pincode").value = " ";

    document.getElementById("gender").value = " ";
    document.getElementById("country").value = " ";
    document.getElementById("food").value = " ";

} 