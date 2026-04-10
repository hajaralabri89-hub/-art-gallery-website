/* ================================================
   HAJAR ART GALLERY - JAVASCRIPT
   Robust Error Handling
   Gallery System, Modals, PayPal Integration
   ================================================ */

'use strict';

/* ================================================
   GALLERY DATA
   All artwork and product photo galleries
   ================================================ */
const galleries = {
    candyhills: {
        title: "Candy Hills",
        photos: ["Candy Hills1.jpg", "Candy Hills2.jpg"]
    },
    pinklake: {
        title: "Pink Lake Memory",
        photos: ["Pink Lake Memory1.jpg", "Pink Lake Memory2.jpg"]
    },
    celestial: {
        title: "Celestial Bloom",
        photos: ["Celestial Bloom1.jpg", "Celestial Bloom2.jpg"]
    },
    emerald: {
        title: "Emerald Lake Glow",
        photos: ["Emerald Lake Glow.jpg", "Emerald Lake Glow1.jpg", "Emerald Lake Glow2.jpg"]
    },
    housesbluehill: {
        title: "Houses on the Blue Hill",
        photos: [
            "House on the blue hill.jpeg",
            "House on the blue hill1.jpeg",
            "House on the blue hill2.jpeg",
            "House on the blue hill3.jpeg"
        ]
    },
    littlehill: {
        title: "Little Hill, Quiet Sea",
        photos: [
            "Little Hill, Quiet Sea.jpeg",
            "Little Hill, Quiet Sea left view.jpeg",
            "Little Hill, Quiet Sea middle view.jpeg",
            "Little Hill, Quiet Sea right view.jpeg"
        ]
    },
    sunsetmosaic: {
        title: "Sunset Mosaic Hills",
        photos: [
            "Sunset Mosaic Hills.jpg",
            "Sunset Mosaic Hills1.jpeg",
            "Sunset Mosaic Hills2.jpeg",
            "Sunset Mosaic Hills3.jpeg",
            "Sunset Mosaic Hills4.jpeg"
        ]
    },
    gatheredsilence: {
        title: "Gathered Silence",
        photos: [
            "Gathered Silence.jpg",
            "Gathered Silence1.jpg",
            "Gathered Silence2.jpg",
            "Gathered Silence3.jpg",
            "Gathered Silence4.jpg"
        ]
    },
    quiethorizongrove: {
        title: "Quiet Horizon Grove",
        photos: [
            "Quiet Horizon Grove.jpg",
            "Quiet Horizon Grove1.jpg",
            "Quiet Horizon Grove2.jpg",
            "Quiet Horizon Grove3.jpg",
            "Quiet Horizon Grove4.jpg",
            "Quiet Horizon Grove5.jpg",
            "Quiet Horizon Grove6.jpg"
        ]
    },
    unspokenconnection: {
        title: "Unspoken Connection",
        photos: [
            "Unspoken connection.jpg",
            "Unsopken connection1.jpg",
            "Unsopken connection2.jpg",
            "Unsopken connection3.jpg"
        ]
    },
    postcards: {
        title: "Art Collection Postcards",
        photos: ["PostcardArtCollection1.png", "PostcardArtCollection2.png", "PostcardArtCollection3.png"]
    },
    bluehill: {
        title: "Houses on Blue Hill Postcard",
        photos: ["postcardhousesonbluehill.png", "postcardhousesonbluehill1.png"]
    },
    bookmark1: {
        title: "Velvet Roots Bookmark",
        photos: [
            "Bookmark Velvet Roots and Chromatic Forest Dream.png",
            "Bookmark Velvet Roots and Chromatic Forest Dream1.png",
            "Bookmark Velvet Roots and Chromatic Forest Dream2.png",
            "Bookmark Velvet Roots and Chromatic Forest Dream3.png",
            "Bookmark Velvet Roots and Chromatic Forest Dream4.png"
        ]
    },
    bookmark2: {
        title: "Candy Hills Bookmark",
        photos: [
            "Candy Hills Art Bookmark.png",
            "Candy Hills Art Bookmark1.png",
            "Candy Hills Art Bookmark2.png",
            "Candy Hills Art Bookmark3.png",
            "Candy Hills Art Bookmark4.png",
            "Candy Hills Art Bookmark5.png"
        ]
    },
    chromaticforest: {
        title: "Chromatic Forest Dream - SOLD",
        photos: ["Chromatic Forest Dream.jpg"]
    },
    quietrise: {
        title: "Quiet Rise - SOLD",
        photos: ["Quiet Rise.jpg"]
    }
};

/* ================================================
   GALLERY STATE
   ================================================ */
let currentGallery = null;
let currentPhotoIndex = 0;

/* ================================================
   GALLERY FUNCTIONS
   ================================================ */

/**
 * Open gallery modal with specified gallery ID
 * @param {string} galleryId - The ID of the gallery to open
 */
function openGallery(galleryId) {
    try {
        // Validate gallery exists
        if (!galleries[galleryId]) {
            console.error(`Gallery "${galleryId}" not found`);
            return;
        }

        currentGallery = galleries[galleryId];
        currentPhotoIndex = 0;
        
        const modal = document.getElementById('galleryModal');
        const title = document.getElementById('galleryTitle');
        const totalPhotos = document.getElementById('totalPhotos');
        
        if (!modal || !title || !totalPhotos) {
            console.error('Gallery modal elements not found');
            return;
        }
        
        modal.classList.add('gallery-modal--active');
        title.textContent = currentGallery.title;
        totalPhotos.textContent = currentGallery.photos.length;
        
        updateGalleryDisplay();
    } catch (error) {
        console.error('Error opening gallery:', error);
    }
}

/**
 * Close the gallery modal
 */
function closeGallery() {
    try {
        const modal = document.getElementById('galleryModal');
        const mainImage = document.getElementById('galleryMainImage');
        
        if (modal) {
            modal.classList.remove('gallery-modal--active');
        }
        
        if (mainImage) {
            mainImage.classList.remove('gallery-modal__image--zoomed');
        }
    } catch (error) {
        console.error('Error closing gallery:', error);
    }
}

/**
 * Navigate to next/previous photo
 * @param {number} direction - 1 for next, -1 for previous
 */
function changePhoto(direction) {
    try {
        if (!currentGallery) return;
        
        currentPhotoIndex += direction;
        
        // Wrap around
        if (currentPhotoIndex < 0) {
            currentPhotoIndex = currentGallery.photos.length - 1;
        } else if (currentPhotoIndex >= currentGallery.photos.length) {
            currentPhotoIndex = 0;
        }
        
        const mainImage = document.getElementById('galleryMainImage');
        if (mainImage) {
            mainImage.classList.remove('gallery-modal__image--zoomed');
        }
        
        updateGalleryDisplay();
    } catch (error) {
        console.error('Error changing photo:', error);
    }
}

/**
 * Update gallery display with current photo
 */
function updateGalleryDisplay() {
    try {
        if (!currentGallery) return;
        
        const mainImage = document.getElementById('galleryMainImage');
        const currentPhoto = document.getElementById('currentPhoto');
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        
        if (!mainImage || !currentPhoto || !thumbnailsContainer) {
            console.error('Gallery display elements not found');
            return;
        }
        
        // Update main image
        mainImage.src = currentGallery.photos[currentPhotoIndex];
        mainImage.alt = currentGallery.title;
        
        // Handle image load error
        mainImage.onerror = function() {
            console.error(`Failed to load image: ${currentGallery.photos[currentPhotoIndex]}`);
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
        };
        
        // Update counter
        currentPhoto.textContent = currentPhotoIndex + 1;
        
        // Update thumbnails
        thumbnailsContainer.innerHTML = '';
        
        currentGallery.photos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo;
            thumb.alt = `${currentGallery.title} - Photo ${index + 1}`;
            thumb.className = 'gallery-modal__thumbnail' + (index === currentPhotoIndex ? ' gallery-modal__thumbnail--active' : '');
            
            // Handle thumbnail error
            thumb.onerror = function() {
                this.style.display = 'none';
            };
            
            thumb.onclick = () => {
                currentPhotoIndex = index;
                updateGalleryDisplay();
            };
            
            thumbnailsContainer.appendChild(thumb);
        });
    } catch (error) {
        console.error('Error updating gallery display:', error);
    }
}

/**
 * Toggle zoom on main gallery image
 */
function toggleZoom() {
    try {
        const mainImage = document.getElementById('galleryMainImage');
        if (mainImage) {
            mainImage.classList.toggle('gallery-modal__image--zoomed');
        }
    } catch (error) {
        console.error('Error toggling zoom:', error);
    }
}

/* ================================================
   ARTWORK DETAILS FUNCTIONS
   ================================================ */

/**
 * Toggle artwork details expansion
 * @param {string} detailsId - The ID of the details element to toggle
 */
function toggleDetails(detailsId) {
    try {
        const details = document.getElementById(detailsId);
        
        if (!details) {
            console.error(`Details element "${detailsId}" not found`);
            return;
        }
        
        const isExpanding = !details.classList.contains('artwork-card__details--expanded');
        details.classList.toggle('artwork-card__details--expanded');
        
        // Scroll to card when expanding
        if (isExpanding) {
            setTimeout(() => {
                const card = details.closest('.artwork-card');
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error toggling details:', error);
    }
}

/* ================================================
   INQUIRY MODAL FUNCTIONS
   ================================================ */

/**
 * Open inquiry modal for specific artwork
 * @param {string} artworkName - Name of the artwork being inquired about
 */
function openInquiry(artworkName) {
    try {
        const modal = document.getElementById('inquiryModal');
        const artworkInput = document.getElementById('artworkName');
        
        if (!modal) {
            console.error('Inquiry modal not found');
            return;
        }
        
        modal.style.display = 'flex';
        
        if (artworkInput) {
            artworkInput.value = artworkName;
        }
    } catch (error) {
        console.error('Error opening inquiry modal:', error);
    }
}

/**
 * Close inquiry modal
 */
function closeModal() {
    try {
        const modal = document.getElementById('inquiryModal');
        if (modal) {
            modal.style.display = 'none';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

/* ================================================
   PAYPAL FUNCTIONS
   ================================================ */

/**
 * Show/hide PayPal container
 * @param {string} containerId - ID of the PayPal container to toggle
 */
function showPayPal(containerId) {
    try {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`PayPal container "${containerId}" not found`);
            return;
        }
        
        container.classList.toggle('product-card__paypal-container--visible');
    } catch (error) {
        console.error('Error showing PayPal:', error);
    }
}

/* ================================================
   PAYPAL INITIALIZATION
   Safely render PayPal buttons only if SDK is loaded
   ================================================ */
function initializePayPal() {
    // Check if PayPal SDK is loaded
    if (typeof paypal === 'undefined') {
        console.warn('PayPal SDK not loaded. Buy buttons will not work.');
        return;
    }
    
    try {
        // Art Collection Postcard
        const container1 = document.getElementById('paypal-container-UU98YLYC4VWEQ');
        if (container1) {
            paypal.HostedButtons({
                hostedButtonId: "UU98YLYC4VWEQ",
            }).render("#paypal-container-UU98YLYC4VWEQ");
        }
        
        // Houses on Blue Hill Postcard
        const container2 = document.getElementById('paypal-container-JFLZR7HDL4QEE');
        if (container2) {
            paypal.HostedButtons({
                hostedButtonId: "JFLZR7HDL4QEE",
            }).render("#paypal-container-JFLZR7HDL4QEE");
        }
        
        // Velvet Roots Bookmark
        const container3 = document.getElementById('paypal-container-JDCUGJP5UXL92');
        if (container3) {
            paypal.HostedButtons({
                hostedButtonId: "JDCUGJP5UXL92",
            }).render("#paypal-container-JDCUGJP5UXL92");
        }
        
        // Candy Hills Bookmark
        const container4 = document.getElementById('paypal-container-4UN88NDECRJDG');
        if (container4) {
            paypal.HostedButtons({
                hostedButtonId: "4UN88NDECRJDG",
            }).render("#paypal-container-4UN88NDECRJDG");
        }
    } catch (error) {
        console.error('Error initializing PayPal buttons:', error);
    }
}

/* ================================================
   SMOOTH SCROLL FOR NAVIGATION
   ================================================ */
function initializeSmoothScroll() {
    try {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }
}

/* ================================================
   KEYBOARD NAVIGATION
   ================================================ */
function initializeKeyboardNav() {
    try {
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('galleryModal');
            
            // Only handle keyboard if gallery is open
            if (!modal || !modal.classList.contains('gallery-modal--active')) {
                return;
            }
            
            switch(e.key) {
                case 'Escape':
                    closeGallery();
                    break;
                case 'ArrowLeft':
                    changePhoto(-1);
                    break;
                case 'ArrowRight':
                    changePhoto(1);
                    break;
            }
        });
    } catch (error) {
        console.error('Error initializing keyboard navigation:', error);
    }
}

/* ================================================
   MODAL BACKGROUND CLICK HANDLER
   ================================================ */
function initializeModalClickHandler() {
    try {
        window.onclick = function(event) {
            const inquiryModal = document.getElementById('inquiryModal');
            
            // Close inquiry modal when clicking outside
            if (event.target === inquiryModal) {
                closeModal();
            }
        };
    } catch (error) {
        console.error('Error initializing modal click handler:', error);
    }
}

/* ================================================
   IMAGE ERROR HANDLING
   Add fallback for all images on the page
   ================================================ */
function initializeImageErrorHandling() {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Only add error handling once
                if (!this.dataset.errorHandled) {
                    this.dataset.errorHandled = 'true';
                    console.warn(`Failed to load image: ${this.src}`);
                    
                    // Add a subtle styling to show image failed to load
                    this.style.opacity = '0.5';
                    this.alt = this.alt || 'Image not available';
                }
            });
        });
    } catch (error) {
        console.error('Error initializing image error handling:', error);
    }
}

/* ================================================
   INITIALIZATION
   Run when DOM is fully loaded
   ================================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hajar Art Gallery - Initializing...');
    
    try {
        // Initialize all features
        initializeSmoothScroll();
        initializeKeyboardNav();
        initializeModalClickHandler();
        initializeImageErrorHandling();
        
        // Initialize PayPal buttons when SDK is ready
        if (typeof paypal !== 'undefined') {
            initializePayPal();
        } else {
            // Wait for PayPal SDK to load
            window.addEventListener('load', initializePayPal);
        }
        
        console.log('Hajar Art Gallery - Initialization complete!');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

/* ================================================
   MAKE FUNCTIONS GLOBALLY AVAILABLE
   (Required for inline onclick handlers)
   ================================================ */
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.changePhoto = changePhoto;
window.toggleZoom = toggleZoom;
window.toggleDetails = toggleDetails;
window.openInquiry = openInquiry;
window.closeModal = closeModal;
window.showPayPal = showPayPal;
