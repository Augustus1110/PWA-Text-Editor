const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Stores the triggered events
    window.deferredPrompt = event;

    // Removes the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
  });

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Shows prompt that reads "Install!"" grabbed from HTML line 24
  promptEvent.prompt();
  
  // Resets the deferred prompt variable, button can only be clicked once.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

// Adds a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clears prompt and disables initial install button
  window.deferredPrompt = null;
}); 
