let scrollY = 0;
const dimmer = document.getElementById('dim');

function disableScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
}

function enableScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
}

window.closePopup = function(id) {
    const popup = document.querySelector(`.popup[data-id="${id}"]`);
    if (popup) {
        popup.classList.add("scale-0");
        popup.classList.remove("scale-100");
        setTimeout(() => {
            popup.classList.add("hidden");
        }, 300);
        enableScroll();
        dimmer.classList.add('hidden');
    }
}

window.openPopup = function(id) {
    const popup = document.querySelector(`.popup[data-id="${id}"]`);
    if (popup) {
        popup.classList.remove("hidden");
        setTimeout(() => {
            popup.classList.remove("scale-0");
            popup.classList.add("scale-100");
        }, 10);
        disableScroll();
        popup.focus();
        dimmer.classList.remove('hidden');
    }
}

async function loadEvents() {
    const response = await fetch('./events.json');
    const events = await response.json();
    renderEvents(events);
}

function renderEvents(events) {
    const container = document.getElementById("event-container");

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "flex flex-col justify-center text-gray-900 dark:text-gray-100 rounded-xl p-10 max-w-sm bg-white dark:bg-gray-800 shadow-xl bg-opacity-80 dark:bg-opacity-80 backdrop-blur-2xl transition-smooth hover:scale-105 hover:shadow-2xl hover:-translate-y-2";
        card.innerHTML = `
            <div class="flex flex-col mb-4">
                <span class="text-3xl font-bold">${event.title}</span>
                <span class="text-xl tracking-widest text-gray-800 dark:text-gray-200">${event.subtitle}</span>
            </div>
            <div class="text-sm md:text-base mb-6 text-gray-700 dark:text-gray-300 line-clamp-5">
                ${event.description}
            </div>
            <button class="px-4 py-2 bg-cyan-500 dark:bg-cyan-600 text-white rounded-full w-1/3" onclick="openPopup(${event.id})">
                Details
            </button>
        `;
        container.appendChild(card);

        renderPopup(event);
    });
}

function renderPopup(event) {
    const popup = document.createElement("div");
    popup.className = `popup fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[50vw] h-[90vh] md:h-[70vh] bg-white dark:bg-gray-800 backdrop-blur-3xl bg-opacity-75 rounded-xl shadow-xl z-50 scale-0 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden`;
    popup.setAttribute("data-id", `${event.id}`);

    const details = event.details;
    const dateLine = details.date ? `Date: ${details.date} <br>` : "";
    const deadlineLine = details.deadline ? `Deadline: ${details.deadline} <br>` : "";
    // const submissionLine = details.submission_link ? `Submission Link: <a href="${details.submission_link}" class="text-blue-500 underline" target="_blank">Click Here</a><br>` : "";
    submissionLine = "";

    popup.innerHTML = `
        <div class="flex justify-end p-4 z-10">
            <button class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200" onclick="closePopup(${event.id})">
                <ion-icon name="close-outline" class="text-3xl"></ion-icon>
            </button>
        </div>
        <div class="px-12 text-gray-900 dark:text-gray-100">
            <p class="text-3xl font-bold mb-1">${event.title}</p>
            <p class="text-xl font-medium mb-4 tracking-widest">${event.subtitle}</p>
        </div>
        <div class="px-10 py-4 flex-1 overflow-y-auto custom-scrollbar">
            <p class="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-200 max-w-prose">
                Number of members per team: ${details.team_size} <br>
                Teams per school: ${details.teams_per_school} <br>
                Eligibility: ${details.eligibility} <br>
                ${dateLine}
                ${deadlineLine}
                ${submissionLine}
            </p>
            <p class="text-lg mb-4 text-gray-700 dark:text-gray-300 max-w-prose" style="white-space: pre-line;">
                ${event.description}
            </p>
        </div>
    `;

    popup.setAttribute("tabindex", "-1");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    document.body.appendChild(popup);
}

loadEvents();
