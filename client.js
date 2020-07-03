let form = document.querySelector('form');

form.onsubmit = sendData;
function sendData(e){
    e.preventDefault();

        let formData =  new FormData(form);

    let Params = {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstname: formData.get('firstname')
        }),
        method: "POST"
    }
    fetch('http://locathost:4000/formData',Params)
    .then(response =>response.json())
    .then(data =>{
        let error = document.querySelector('.error');
        data.errors.forEach(function(err){
                error.innerHTML += `<li>${err.msg}</li>`
        });
        console.log(data);
    })
    .catch(err => console.log(err))
}