document.querySelector('.btn-pre').addEventListener('click', function () {
    // Show the popup
    document.getElementById('popup').style.display = 'block';
  
    // Redirect after 3 seconds (3000 milliseconds)
    setTimeout(function () {
      window.location.href = 'https://www.buymeacoffee.com/someone_';
    }, 4000);
  });
  