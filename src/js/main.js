async function loadNavBar() {
    try {
        const navBarFile = await fetch('../../src/components/navbar.html');
        document.getElementById('navbar1').innerHTML = await navBarFile.text();
    } catch (error) {
        console.error("Error loading the navbar:", error);
    }

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

async function loadFooter() {
    try {
        const footerFile = await fetch('../../src/components/footer.html');
        document.getElementById('footer').innerHTML = await footerFile.text();
        document.getElementById('year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error("Error loading the footer:", error);
    }
}

async function renderCardView(file) {
    document.addEventListener("DOMContentLoaded", function () {
        let cards = [];
        file = `../../src/json/${file}`;
        fetch(file)
            .then((res) => res.json())
            .then((data) => {
                cards = data.map((item) => ({
                    text: item.text,
                    image: '../../assets/images/' + item.image,
                    title: item.title,
                    moreText: item.moreText || "Additional details not available."
                }));
                const cardContainer = document.getElementById("card-container");
                cards.forEach((card, index) => {
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("col-md-3", "mb-4");

                    cardElement.innerHTML = `
                <div class="card">
                    <img src="${card.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${card.title}</h5>
                        <p class="card-text">${card.text}</p>
                        <p class="more-text d-none">${card.moreText}</p>
                        <button class="btn btn-primary read-more-btn" data-index="${index}">Read More...</button>

                    </div>
                </div>
            `;
                    cardContainer.appendChild(cardElement);
                });

                // Add event listeners to "Read More" buttons
                const readMoreButtons = document.querySelectorAll(".read-more-btn");
                readMoreButtons.forEach((btn) => {
                    btn.addEventListener("click", function () {
                        const cardBody = this.parentElement;
                        const moreText = cardBody.querySelector(".more-text");
                        if (moreText.classList.contains("d-none")) {
                            moreText.classList.remove("d-none");
                            this.textContent = "Read Less...";
                        } else {
                            moreText.classList.add("d-none");
                            this.textContent = "Read More...";
                        }
                    });
                });
            })
            .catch((error) => {
                console.error('Error fetching the data:', error);
            });
    });
}
