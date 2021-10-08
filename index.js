

//Le service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/olfp_desktop/sw.js')
        .then(() => { console.log('Service Worker est enregistré !'); });
}

//Pour installer sur PC
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('OK');
            } else {
                console.log('REFUS');
            }
            deferredPrompt = null;
        });
    });
});