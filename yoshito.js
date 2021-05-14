// taranslation function for onclik
function translation(argLang) {
  //Get Elements
  let elm = document.getElementsByClassName("cngLang");

  for(let i=0; i<elm.length; i++){
    //Active a selected langage and deactive the other.
    if(elm[i].getAttribute("lang")== argLang){
      elm[i].style.display = '';
    }
    else{
      elm[i].style.display = 'none';
    }
  }
}

translation("en");
