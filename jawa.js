let slideIndex = 0;
const slides = document.querySelectorAll('.slider .slider-container img');
const totalSlides = slides.length;

function showSlide() {
  // Move the slider by two images at once (for showing two images together)
  if (slideIndex >= totalSlides - 1) {
    slideIndex = 0;  // Restart the slider after the last set of images
  } else {
    slideIndex++;
  }

  // Update the transform property to show two images at once
  document.querySelector('.slider .slider-container').style.transform = `translateX(-${slideIndex * 50}%)`;
}

// Change slide every 3 seconds
setInterval(function () {
  showSlide();
}, 3000); 

function searchPage() {
    var searchText = document.getElementById('searchInput').value.toLowerCase();
    var pageContent = document.body.innerText.toLowerCase(); // Get all page content

    // Check if the search text exists in the page content
    if (pageContent.includes(searchText)) {
        highlightSearchText(searchText); // Highlight occurrences of the search text
        scrollToFirstOccurrence(searchText); // Scroll to the first match
    } else {
        alert("Sorry, no results found!");
    }
}

function highlightSearchText(searchText) {
    // Remove any previous highlights
    var highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(function(el) {
        el.classList.remove('highlight');
    });

    // Get all text nodes and highlight the search term within them
    var textNodes = getTextNodesIn(document.body);
    textNodes.forEach(function(node) {
        var textContent = node.textContent.toLowerCase();
        var index = textContent.indexOf(searchText);
        if (index !== -1) {
            var span = document.createElement('span');
            span.className = 'highlight';
            span.textContent = node.textContent.substring(index, index + searchText.length);
            node.parentNode.insertBefore(span, node);
            node.parentNode.removeChild(node);
        }
    });
}

function scrollToFirstOccurrence(searchText) {
    var firstMatch = document.querySelector('.highlight');
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Helper function to get all text nodes in an element
function getTextNodesIn(element) {
    var textNodes = [];
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    return textNodes;
}
