const imageInput = document.getElementById('imageInput');
const textWrapper = document.getElementById('textWrapper');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            textWrapper.style.backgroundImage = `url(${reader.result})`;
        }
        reader.readAsDataURL(file);
    }
});