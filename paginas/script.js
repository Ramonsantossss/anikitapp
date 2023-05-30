      // Função para atualizar a imagem
function updateImage() {
    // Fazer uma solicitação para a API de imagens de animes
    fetch('https://trevorestapi.onrender.com/api/anime/elaina?apikey=clover')
        .then(response => response.json())
        .then(data => {
            const imageGallery = document.getElementById('imageGallery');
            imageGallery.innerHTML = ''; // Limpar as imagens anteriores

            // Verificar se a resposta contém a propriedade 'url'
            if (data.url) {
                // Criar elemento de imagem e definir a URL da imagem
                const imgElement = document.createElement('img');
                imgElement.src = data.url;
                imgElement.classList.add('image');

                // Criar contêiner para a imagem
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                // Adicionar a imagem ao contêiner
                imageContainer.appendChild(imgElement);

 // Criar botão de download
const downloadButton = document.createElement('button');
downloadButton.innerHTML = '<i class="fas fa-download"></i>';
downloadButton.classList.add('download-button');
downloadButton.addEventListener('click', function() {
    // Lógica para download da imagem
    const link = document.createElement('a');
    link.href = data.url;
    link.download = 'imagem.jpg';
    link.click();
});

// Adicionar o botão de download ao contêiner
imageContainer.appendChild(downloadButton);


                // Criar botão de atualização
                const updateButton = document.createElement('button');
                updateButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
                updateButton.classList.add('update-button');
                updateButton.addEventListener('click', updateImage);

                // Adicionar o botão de atualização ao contêiner
                imageContainer.appendChild(updateButton);

                // Adicionar o contêiner de imagem à galeria
                imageGallery.appendChild(imageContainer);
            }
        })
        .catch(error => console.log(error));
}

// Chamar a função para exibir a primeira imagem
updateImage();
//setInterval(updateImage, 5000);


    var header           = document.getElementById('header');
    var navigationHeader = document.getElementById('navigation_header');
    var content          = document.getElementById('content');
    var showSidebar      = false;

    function toggleSidebar()
    {
        showSidebar = !showSidebar;
        if(showSidebar)
        {
            navigationHeader.style.marginLeft = '-10vw';
            navigationHeader.style.animationName = 'showSidebar';
            content.style.filter = 'blur(2px)';
        }
        else
        {
            navigationHeader.style.marginLeft = '-100vw';
            navigationHeader.style.animationName = '';
            content.style.filter = '';
        }
    }

    function closeSidebar()
    {
        if(showSidebar)
        {
            showSidebar = true;
            toggleSidebar();
        }
    }

    window.addEventListener('resize', function(event) {
        if(window.innerWidth > 768 && showSidebar) 
        {  
            showSidebar = true;
            toggleSidebar();
        }
    });
