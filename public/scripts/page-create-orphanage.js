const map = L.map('mapid').setView([-26.9886589,-53.5335547], 16);

// Create and add TileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// Create Icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// Create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;
    
    // Remove icon
    marker && map.removeLayer(marker)

    // Add icon tileLayer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

// Add photo field

function addPhotoField() {
    // Pegar o container de fotos #images
    const container = document.querySelector('#images')
    // Pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // Realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    // Verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == "") {
        return
    }
    // Limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    // Adicionar o clone ao container de #imagens
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // Deletar o campo
    span.parentNode.remove()
}

// Selecionar Sim ou Não

function toggleSelect(event) {
    // Retirar a classe .active dos botões
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active'))
    // Colocar a classe .active no botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    // Atualizar meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    // Verificar se é Sim ou Não
    input.value = button.dataset.value
}