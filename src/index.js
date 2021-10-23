document.addEventListener('DOMContentLoaded', () => {
    loadDogs()
    dealWithFilter()
}) 

function loadDogs(filter = false){
    const dogBar = document.getElementById('dog-bar')
    dogBar.innerHTML = ''
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        for(const dog of dogs){
            const span = document.createElement('span')
            span.textContent = dog.name
            if(filter === false){
                dogBar.appendChild(span)
            } else if(filter === true && dog.isGoodDog === true){
                dogBar.appendChild(span)
            }

            span.addEventListener('click', () => {
                dealWithChosenDog(dog)
            })
        }
    })
}

function dealWithChosenDog(dog){
    const dogInfo = document.getElementById('dog-info')
    dogInfo.innerHTML = ''
    
    const img = document.createElement('img')
    const name = document.createElement('h2')
    const isGoodDog = document.createElement('button')

    img.src = dog.image
    name.textContent = dog.name
    if(dog.isGoodDog === true){
        isGoodDog.textContent = 'Good Dog!'
    } else{
        isGoodDog.textContent = 'Bad Dog!'
    }

    dogInfo.appendChild(img)
    dogInfo.appendChild(name)
    dogInfo.appendChild(isGoodDog)

    isGoodDog.addEventListener('click', () => {
        if(dog.isGoodDog === true){
            isGoodDog.textContent = 'Bad Dog!'
            dog.isGoodDog = false
            updateDog(dog, false)
        } else{
            isGoodDog.textContent = 'Good Dog!'
            dog.isGoodDog = true
            updateDog(dog, true)
        }
    })
}

function updateDog(dog, isDogGoodDog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({'isGoodDog': isDogGoodDog})
    })
}

function dealWithFilter(){
    const filter = document.getElementById('good-dog-filter')

    filter.addEventListener('click', () => {
        if(filter.textContent === 'Filter good dogs: OFF'){
            filter.textContent = 'Filter good dogs: ON'
            loadDogs(true)
        } else{
            filter.textContent = 'Filter good dogs: OFF'
            loadDogs()
        }
    })
}