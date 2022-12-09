document.addEventListener('DOMContentLoaded', fetchDogs)

//fetching the dogs from the server
function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then (response => response.json())
    .then (data => renderDogs(data))
}

// The dog should be put on the table as a table row.
function renderDogs(dogs){
    const tableDogs = document.getElementById('table-body');
    dogs.map(dog => {
        const dogName = document.createElement('td');
        dogName.innerHTML = dog.name;
        const dogBreed = document.createElement('td');
        dogBreed.innerHTML = dog.breed;
        const dogSex = document.createElement('td');
        dogSex.innerHTML = dog.sex;
        const tableRow = document.createElement('tr');
        const edit = document.createElement('td');
        const editDog = document.createElement('button');
        editDog.textContent = "Edit";
        edit.append(editDog);
        tableRow.append(dogName, dogBreed, dogSex, edit);
        tableDogs.append(tableRow);
        editDogs(editDog, dog);
    })
}

//Function to edit a dog's details per index of the array
function editDogs(editDog, dog) {
    const editRowDogs = document.getElementById('dog-form');
    editDog.addEventListener("click", () => {
        const dogForm = Array.from(editRowDogs.elements); //changing into array
        const dogName = dogForm[0];
        dogName.value = dog.name;
        const dogBreed = dogForm[1];
        dogBreed.value = dog.breed;
        const dogSex = dogForm[2];
        dogSex.value = dog.sex;
    })
}



document.getElementById('dog-form').addEventListener('submit', updateDog)
function updateDog(e){
    e.preventDefault();
    console.log(e.target.sex.value)
    const addedDog = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value,
    }
    fetch("http://localhost:3000/dogs", {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(addedDog)
    })
    .then(response => response.json())
    .then(data => fetchDogs(data))
}