// THIS IS FRONT END JAVASCRIPT


const url = window.location.href;
// const edit = document.getElementById('edit');
const editButton = document.querySelectorAll('.editBtn');
const form = document.getElementById('form');

// THIS IS FOR INPUT FEILD AND IT'S REPLACABLE
const name = document.getElementById('name'),
    players = document.getElementById('players'),
    coach = document.getElementById('coach');











// THIS IS FOR TABLE NOT REPLACEABLE
const teamName = document.getElementById('teamName'),
    teamPlayers = document.getElementById('teamPlayers'),
    teamCoach = document.getElementById('teamCoach');





// console.log(allAttr(name,name.id));


const names = [name, players, coach];


// console.log(names);


// const team = [teamName, teamPlayers, teamCoach];






// console.log(form.attributes.action.value);
let edit_url = url + "edit/";

valueChange();

function valueChange() {
    editButton.forEach(edit => {
        edit.addEventListener('click', e => {
            // e.preventDefault();

            console.log(teamName.textContent);
            name.value = teamName.textContent;
            players.value = teamPlayers.textContent;
            coach.value = teamCoach.textContent;
            console.log(name.value);





            // console.log(e.target.parentNode.parentNode);
            console.log(e.target.parentNode.parentNode);
            // location.reload();
        });
    });
}






// GETTING VALUE 
const setValue=(props)=>{
    this.props = props;
    props.forEach(val => {
        this.props = val.attributes.value.value;
    });
    return this.props;
}








// if(edit_url)


// console.log(button.attributes);
// console.log(edit.attributes.id.value);



// button.forEach(btn => {
//     console.log(btn.attributes.id);   
//     if (btn.attributes.id.value === 'edit') {
//         console.log(btn.attributes.href);

//         console.log("This is edit id");
//     } 
// });



// function allAttr(array, atribt){
//     array.forEach(arr => {
//         atribt= arr.attributes;
//         console.log(atribt);

//         return arr, atribt; 
//     });  
// }


// console.log(url);

// let edit_url = url + "edit/";
// console.log(edit_url);


// console.log("something");