const $form = document.querySelector('#form');
const $button = document.querySelector('#formSubmit');
const $download = document.querySelector('#download');
const $again = document.querySelector('#again');
const $errorMessage = document.querySelector('#errorMessage');

const endpoint = `${window.location.href}api/file`;

let filename = null;

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      body: data
    });

    return await response.json(); 
  }

$button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const formData = new FormData($form);

    if(!formData.get('cover').name || !formData.get('document').name) {
      $errorMessage.classList.remove('hidden');
      $errorMessage.classList.add('opacity-100');
      return 0;
    }

    if($errorMessage.classList.contains('opacity-100')) $errorMessage.classList.remove('opacity-100');

    this.classList.add('loader');

    postData(endpoint, formData)
        .then((data) => {
            console.log(data);

            filename = data.filename;
            this.classList.remove('loader');
            this.classList.add('hidden');
            $download.classList.add('opacity-100');
        });
})

$download.addEventListener('click', () => {
  if(!filename) return 0;
  
  window.location = `${endpoint}?filename=${filename}`;
  $form.classList.add('opacity-0');

  $again.classList.remove('hidden');
  $again.classList.add('opacity-100');
});

$again.addEventListener('click', () => {
  location.reload(true)
});