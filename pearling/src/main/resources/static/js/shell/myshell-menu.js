fetch("/html/shell/myshell-menu.html")
  .then((response) => response.text())
  .then((data) => {
    
    document.getElementById("myshell-menu").innerHTML = data;
  })
  .catch((error) => console.error(error));
