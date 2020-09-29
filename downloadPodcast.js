function activateExtension() {
    console.log("activateee");
    const playButtons = document.getElementsByClassName("replay-button paused aod")

    // Get the ULR of the resource (the image on web_accessible_resources of manifest.json) in the format "moz-extension://<extension-UUID>/images/my-image.png"
    // const myImage = browser.runtime.getURL("icons/Cloud-Download-256.png");
    const myImage = browser.extension.getURL("icons/Cloud-Download-256.png");
    
    // For each button in the array playButtons, use getAndDisplayDlLink function
    for (let pB of playButtons) {
        getAndDisplayDlLink(pB);
    }
    
    // Function to (1) get the link for mp3 and (2) display a button to download
    function getAndDisplayDlLink(pB) {
        const link = getDownloadLink(pB);
        displayDownloadLink(pB, link);
    }
    
    // Find the link to mp3 ressource 
    function getDownloadLink(pB) {
        return pB.getAttribute("data-asset-source")
    }
    
    
    /**
     * 
     * @param pB : button element
     * @param link : download link
     */
    function displayDownloadLink(pB, link) {
        // 1. In JS, create HTML <a href= link download> + add img + add class for css
        const text = "download" 
        var a = document.createElement('a');
        a.href = link;
        a.setAttribute('download',link);
        a.setAttribute('target',"_blank");
        a.innerHTML = text;
        a.innerHTML = `<img src=\"${myImage}\"/>`;  
        pB.parentElement.appendChild(a);
    
        a.classList.add("addButton"); 
    }
}

// Keep last url to compare with new one
let windowLocation = window.location.href;
// First load
activateExtension();

// Check url every 200ms and reload extension if needed 
window.setInterval(() => {
    // If url change realod extension and update windowLocation var.
    if (windowLocation != window.location.href) {
        windowLocation = window.location.href;

        activateExtension();
    }
}, 200)
