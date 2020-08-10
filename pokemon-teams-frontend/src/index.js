/* <div class="card" data-id="trainer.id"><p>trainer-name</p>
  <button data-trainer-id="trainer.id">Add Pokemon</button>
  <ul id=`${trainer.id}-pokemon`>
    <li>pokemon.nickname (pokemon.species) <button class="release" data-pokemon-id="pokemon.id">Release</button></li>
  </ul>
</div> */

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(response => response.json())
        .then(trainers => {
            trainers.forEach(trainer => renderTrainers(trainer))
        })

function renderTrainers(trainer){
    const trainerContainer = document.querySelector('main')
    trainerContainer.innerHTML += trainerInfo(trainer)
    pokemonInfo(trainer)

}

function trainerInfo(trainer){
    return (`<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
    <button type="button" data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul id=${trainer.id}-pokemon>
    </ul>
    </div>`)
}

function pokemonInfo(trainer){
    const fullTeam = trainer.pokemons
    const teamCard = document.getElementById(`${trainer.id}-pokemon`)
    fullTeam.forEach(pokemon => {
        const pokeInfo = `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`;
        teamCard.innerHTML += pokeInfo
    })
}


function addClickListener(){
    const allElements = document.querySelector('main')

    allElements.addEventListener('click', function(event){
        if(event.target.tagName === 'BUTTON'){
            if (event.target.className === 'release'){            
                const pokeID = event.target.dataset.pokemonId

                const reqObj = {
                    method: 'DELETE'
                }

                fetch(`${POKEMONS_URL}/${pokeID}`, reqObj)
                .then(response => response.text()) 


                event.target.parentNode.remove()
            } else {
                const trainerID = event.target.parentNode.dataset.id
                addPokemon(trainerID)
                // trainer id should be set to the id for the parentNode
            }
        }
    })
}


function addPokemon(trainerID){
    // if trainer's team is < 6 pokemon, we can add a new one (faker)
    const memberCount = event.target.parentNode.getElementsByTagName('li').length
    const roster = event.target.parentNode.querySelector('ul')
    if (memberCount < 6 ){
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({"trainer_id": parseInt(trainerID)})
        }
        fetch(POKEMONS_URL, reqObj)
            .then(resp => {
                resp
            }).then(function(data)=> {

                // const pokeInfo = `<li>${data.nickname} (${data.species})<button class="release" data-pokemon-id=${data.id}>Release</button></li>`;
                console.log(roster)
            })
          
    } else {
        alert('Oh no! Your team is full. Please remove a member before adding.')
    }

}

addClickListener()