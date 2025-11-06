

const form = document.getElementById("search-bar");

form.addEventListener('submit', e=> {
    if (!form.checkValidity()) {// this calls for the validity check for what i did for bootstrap wit
        e.preventDefault()
    }
    form.classList.add('was-validated') // validations will only show up with this.
    })
