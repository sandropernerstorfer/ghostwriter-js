// ----------------------------------------- Navbar Events ----------- //

// ----- contact ----- //

const contactForm = document.getElementById('ghostwriter-contact');
const contactName = document.getElementById('name');
const contactEmail = document.getElementById('email');
const contactText = document.getElementById('message');
const contactSubmit = document.getElementById('submit-button');

$("#name,#email,#message").on("change keyup paste", function(){

  if(!contactName.value == "" && !contactEmail.value == "" && contactEmail.value.includes('@') && contactEmail.value.includes('.')  && !contactText.value == ""){
    contactSubmit.disabled = false;
  }
  else{
    contactSubmit.disabled = true;
  };

});

$('#contact-close').click(function() {
  setTimeout(`contactForm.reset(); $('#submit-button').html('Send');`,300);
});

$("#submit-button").click(function(){
  $("#submit-button").html('<i class="fas fa-heart"></i>');
  setTimeout(`$('#contact-modal').modal('hide');`,1000);
  setTimeout(`contactForm.reset(); $('#submit-button').html('Send').prop('disabled', true);`,1200);
})

// ------ light / dark mode ------ //

const lightBtn = document.getElementById('light-btn');
const darkBtn = document.getElementById('dark-btn');
const localTheme = localStorage.getItem('ghostwriterTheme');
lightBtn.addEventListener('click',function(){renderColor("light");localStorage.setItem('ghostwriterTheme','light');},false);
darkBtn.addEventListener('click',function(){renderColor("dark");localStorage.setItem('ghostwriterTheme','dark');},false);

if(localTheme === null || localTheme === 'light'){
  localStorage.setItem('ghostwriterTheme','light');
  document.body.setAttribute('data-theme', 'light');
}
else if(localTheme === 'dark'){
  document.body.setAttribute('data-theme', 'dark');
}

function renderColor(x){

  if(x === "dark"){
    if(localStorage.getItem('ghostwriterTheme') == "dark") return;
    $('#theme-page').css({'opacity':'1','background-color':'#242425','z-index':'200','width':'100vw'});
    $('#theme-icon').css({'opacity':'1','color':'#fff'}).removeClass('fa-sun').addClass('fa-moon');
    setTimeout(function(){
      document.body.setAttribute('data-theme', 'dark');
    },750);
    setTimeout(function(){
      $('#theme-page').css({'opacity':'1','z-index':'200','width':'0vw'});
      $('#theme-icon').css({'opacity':'0'});
    },1000);
  }
  else if(x === "light"){
    if(localStorage.getItem('ghostwriterTheme') == "light") return;
    $('#theme-page').css({'opacity':'1','background-color':'#fff','z-index':'200','width':'100vw'});
    $('#theme-icon').css({'opacity':'1'});
    $('#theme-icon').css({'opacity':'1','color':'coral'}).removeClass('fa-moon').addClass('fa-sun');
    setTimeout(function(){
      document.body.setAttribute('data-theme', 'light');
    },750);
    setTimeout(function(){
      $('#theme-page').css({'opacity':'1','background-color':'#fff','z-index':'200','width':'0vw'});
      $('#theme-icon').css({'opacity':'0'});
    },1000);
  }

}

// ---------------------------- Code Copy Functionality ---- //

document.getElementById('copy-html').addEventListener('click', function(){collectToCopy('code-html');if(tooltipReady){showTooltip('tooltip-html');}});
document.getElementById('copy-js').addEventListener('click', function(){collectToCopy('code-js');if(tooltipReady){showTooltip('tooltip-js');}});
document.getElementById('copy-both').addEventListener('click', function(){collectToCopy('code-html','code-js');if(tooltipReady){showTooltip('tooltip-html','tooltip-js');}});

function collectToCopy(a,b){
  if(b==undefined){
    const singleCopy = document.getElementById(a).innerText;
    copyToClipboard(singleCopy);
  }
  else{
    const firstText = document.getElementById(a).innerText;
    const secondText = document.getElementById(b).innerText;
    const combinedText = firstText.concat('\n','\n',secondText);
    copyToClipboard(combinedText);
  }
}

function copyToClipboard(i){
  let tempTextarea = document.getElementById('copy-textarea');
  tempTextarea.innerHTML = i;
  tempTextarea.select();
  try{
    document.execCommand('copy');
  }
  catch{
    alert('Copy command failed to execute due to incompatibilities')
  }
}

// ---------------------------------- Code Copy Popup ----- //

let tooltipReady = true;

function showTooltip(a,b){
  tooltipReady = false;
  if(b==undefined){
    $('#'+a).toggleClass("toggle-hide toggle-show");
    setTimeout(() => {
      $('#'+a).toggleClass("toggle-hide toggle-show");
      tooltipReady = true;
    },600);
  }
  else{
    $('#'+a).toggleClass("toggle-hide toggle-show");
    $('#'+b).toggleClass("toggle-hide toggle-show");
    setTimeout(() => {
      $('#'+a).toggleClass("toggle-hide toggle-show");
      $('#'+b).toggleClass("toggle-hide toggle-show");
      tooltipReady = true;
    },600);
  }
}


// ------------- User Input ------------ //
const slider = document.getElementById("input-range");
const text = document.getElementById('input-text');
const output = document.getElementById("timeInput");
const preview = document.getElementById("dynamic-preview");
const codeText = document.getElementById('dynamic-text');
const codeTime = document.getElementById('dynamic-time');
const userBtn = document.getElementById('run-preview');
const endBtn = document.getElementById('cancel-preview');

output.value = slider.value;

text.oninput = function(){
  codeText.innerText = this.value;
}

slider.oninput = function(){
  output.value = this.value;
  codeTime.innerText = this.value;
}

output.oninput = function(){
  slider.value = this.value;
  if(this.value==''){slider.value = '0';};
  codeTime.innerText = this.value;
  if(codeTime.innerText==''){codeTime.innerText = '0';}
}

output.onkeydown = function(e){
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        return false;
    }
}


userBtn.addEventListener('click',function(){dynamicInsert();});

let counter = 0;
let isRunning = false;

function dynamicInsert(){

    if(isRunning){
      clearInterval(timer);
      isRunning = false;
      return;
    }
    else if(!isRunning){
      preview.textContent = '';
      userBtn.textContent = 'Stop';
      isRunning = true;
      var timer = setInterval(() => {
        const dynamicText = text.value.split('');
        if (counter < dynamicText.length) {
          preview.textContent += dynamicText[counter];
        }
        if (counter >= dynamicText.length || !isRunning){
          clearInterval(timer);
          counter = 0;
          userBtn.textContent = "Run";
          isRunning = false;
          return;
        }
        counter++;
      }, output.value);
    }
};