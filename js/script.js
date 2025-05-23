// Script para funcionalidade do menu mobile, interatividade da galeria e vídeos do YouTube

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um item
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Rolagem suave para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Animação para os cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Função para verificar se elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para animar elementos quando visíveis
    function animateOnScroll() {
        serviceCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicialmente definir opacidade 0
    serviceCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Chamar animação no scroll e no carregamento
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Galeria de imagens - Lightbox simples
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Criar lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close">&times;</span>
                    <h3>${title}</h3>
                    <img src="${imgSrc}" alt="${title}">
                    <p>${description}</p>
                </div>
            `;
            
            // Adicionar estilos inline para o lightbox
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(10, 59, 108, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1001';
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.position = 'relative';
            lightboxContent.style.maxWidth = '80%';
            lightboxContent.style.maxHeight = '80%';
            lightboxContent.style.backgroundColor = 'white';
            lightboxContent.style.padding = '20px';
            lightboxContent.style.borderRadius = '10px';
            lightboxContent.style.textAlign = 'center';
            
            const closeBtn = lightbox.querySelector('.close');
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '15px';
            closeBtn.style.fontSize = '30px';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.cursor = 'pointer';
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '70vh';
            lightboxImg.style.marginTop = '15px';
            
            // Adicionar ao body
            document.body.appendChild(lightbox);
            
            // Fechar lightbox
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Fechar ao clicar fora da imagem
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
    
    // Atualizar número do WhatsApp no link
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const phoneNumber = '5511947499755'; // Número real do Rodrigo Silva
    const message = 'Olá, gostaria de saber mais sobre seus serviços de instalação de carregadores.';
    
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Funcionalidade para os vídeos do YouTube
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    // Função para extrair o ID do vídeo do YouTube e criar URL de incorporação
    function getYouTubeEmbedUrl(youtubeUrl) {
        // Extrair o ID do vídeo da URL do YouTube
        let videoId = '';
        
        // Formato para shorts: https://youtube.com/shorts/VIDEO_ID?si=PARAMETER
        if (youtubeUrl.includes('youtube.com/shorts/')) {
            const urlParts = youtubeUrl.split('shorts/');
            videoId = urlParts[1].split('?')[0];
        } 
        // Formato para vídeos normais: https://youtube.com/watch?v=VIDEO_ID
        else if (youtubeUrl.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
            videoId = urlParams.get('v');
        }
        
        // Criar URL de incorporação
        return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Adicionar evento de clique para cada thumbnail
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            const embedUrl = getYouTubeEmbedUrl(videoUrl);
            
            // Definir a URL do iframe
            videoFrame.src = embedUrl;
            
            // Mostrar o modal
            videoModal.style.display = 'block';
            
            // Impedir rolagem do body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar o modal ao clicar no X
    closeModal.addEventListener('click', function() {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Garantir que as imagens genéricas sejam usadas como thumbnails
    // Removida a função generateVideoThumbnails() que sobrescrevia as imagens
});
