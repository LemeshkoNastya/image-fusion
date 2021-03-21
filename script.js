document.querySelector('.greeting__btn').addEventListener('click', () => {
    document.querySelector('.back').classList.add('back-animation');
    document.querySelector('.back').innerHTML = "";

    setTimeout(() => {
        document.querySelector('.back').innerHTML = `
            <div class="menu inactive">
                Text
            </div>
        `;
        document.querySelector('.menu').classList.remove('inactive');
    }, 1500);
});