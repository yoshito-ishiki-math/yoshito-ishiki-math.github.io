// Translation function for onclick
function translation(argLang) {
  //Get Elements
  let elm = document.getElementsByClassName("cngLang");

  for(let i=0; i<elm.length; i++){
    // Activate the selected language and deactivate the other.
    if(elm[i].getAttribute("lang")== argLang){
      elm[i].style.display = '';
    }
    else{
      elm[i].style.display = 'none';
    }
  }
}

translation("en");
