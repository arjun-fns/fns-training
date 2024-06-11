//////sidebar
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.dropbtn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;

            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
                button.classList.remove('active');
            } else {
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.classList.remove('show');
                });
                document.querySelectorAll('.dropbtn').forEach(btn => {
                    btn.classList.remove('active');
                });
                dropdownContent.classList.add('show');
                button.classList.add('active');
            }
        });
    });

    window.onclick = (event) => {
        if (!event.target.matches('.dropbtn')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                }
            });
            document.querySelectorAll('.dropbtn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    };
});
///////////////////


let checkCollapsed = () => {
    console.log('page reloaded');
    let $temp = $('.menu');
    if (localStorage.getItem('collapsed') == 'false') {
        console.log('in if block');
        $temp.each((_, item) => {
            $(item).show();
        });
    } else {
        console.log('in else block');
        $temp.each((_, item) => {
            $(item).hide();
        });
    }
};

let myFunction = () => {
    let $temp = $('.menu');
    $temp.each((_, item) => {
        if ($(item).is(':visible')) {
            localStorage.setItem('collapsed', 'true');
            $(item).hide();
        } else {
            localStorage.setItem('collapsed', 'false');
            $(item).show();
        }
    });
};

let hamShow = () => {
    $('#aside').hide();
    $('#hamburger').show();
};

let hamHide = () => {
    $('#aside').show();
    $('#hamburger').hide();
};
    
