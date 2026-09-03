document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PAGE NAVIGATION
    ========================= */

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    function openPage(pageName) {

        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        const selectedPage = document.getElementById(pageName);

        if (selectedPage) {
            selectedPage.classList.add("active-page");
        }

        navItems.forEach(item => {
            item.classList.remove("active");

            if (item.dataset.page === pageName) {
                item.classList.add("active");
            }
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            openPage(page);

        });

    });


    /* =========================
       VIEW ALL BUTTONS
    ========================= */

    document.querySelectorAll("[data-page-target]").forEach(button => {

        button.addEventListener("click", () => {

            openPage(button.dataset.pageTarget);

        });

    });


    /* =========================
       NEW PROJECT MODAL
    ========================= */

    const modal = document.getElementById("projectModal");

    const openButtons =
        document.querySelectorAll("[data-open-modal]");

    const closeModal =
        document.getElementById("closeModal");


    openButtons.forEach(button => {

        button.addEventListener("click", () => {

            modal.classList.add("show");

        });

    });


    closeModal.addEventListener("click", () => {

        modal.classList.remove("show");

    });


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });


    /* =========================
       CREATE PROJECT
    ========================= */

    const projectForm =
        document.getElementById("projectForm");

    projectForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("projectName").value.trim();

        const description =
            document.getElementById("projectDescription").value.trim();


        if (!name || !description) {

            alert("Please enter project details.");

            return;

        }


        const projectGrid =
            document.querySelector("#projects .project-grid");


        const newCard =
            document.createElement("div");

        newCard.className = "project-card";

        newCard.innerHTML = `

            <div class="project-top">

                <div class="project-icon purple-bg">

                    <i class="fa-solid fa-folder"></i>

                </div>

                <button class="more-btn">

                    <i class="fa-solid fa-ellipsis"></i>

                </button>

            </div>


            <h3>${escapeHTML(name)}</h3>

            <p>
                ${escapeHTML(description)}
            </p>


            <div class="project-meta">

                <span>

                    <i class="fa-regular fa-calendar"></i>

                    New Project

                </span>


                <span class="status active">

                    Active

                </span>

            </div>


            <div class="progress-label">

                <span>Progress</span>

                <strong>0%</strong>

            </div>


            <div class="progress">

                <div
                    class="purple-progress"
                    style="width:0%">
                </div>

            </div>


            <div class="project-bottom">

                <div class="avatars">

                    <img
                        src="https://i.pravatar.cc/100?img=47">

                    <span>+1</span>

                </div>

                <small>0 Tasks</small>

            </div>

        `;


        projectGrid.appendChild(newCard);


        projectForm.reset();

        modal.classList.remove("show");


        alert("Project created successfully! 🎉");

    });


    /* =========================
       TASK CHECKBOXES
    ========================= */

    document.querySelectorAll(".task-check").forEach(check => {

        check.addEventListener("click", () => {

            check.classList.toggle("done");

            if (check.classList.contains("done")) {

                check.innerHTML = "✓";

            } else {

                check.innerHTML = "";

            }

        });

    });


    /* =========================
       DARK MODE
    ========================= */

    const themeBtn =
        document.getElementById("themeBtn");


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");


        const icon =
            themeBtn.querySelector("i");


        if (document.body.classList.contains("dark")) {

            icon.className =
                "fa-regular fa-sun";

        } else {

            icon.className =
                "fa-regular fa-moon";

        }

    });


    /* =========================
       SEARCH
    ========================= */

    const searchInput =
        document.getElementById("globalSearch");


    searchInput.addEventListener("input", () => {

        const value =
            searchInput.value.toLowerCase().trim();


        const cards =
            document.querySelectorAll(".project-card");


        cards.forEach(card => {

            const text =
                card.innerText.toLowerCase();


            if (text.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });


    /* =========================
       CALENDAR
    ========================= */

    const calendarGrid =
        document.getElementById("calendarGrid");

    const monthName =
        document.getElementById("monthName");

    let currentDate = new Date(2026, 7, 1);


    function generateCalendar() {

        calendarGrid.innerHTML = "";


        const year =
            currentDate.getFullYear();

        const month =
            currentDate.getMonth();


        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];


        monthName.textContent =
            `${monthNames[month]} ${year}`;


        const firstDay =
            new Date(year, month, 1).getDay();


        const daysInMonth =
            new Date(year, month + 1, 0).getDate();


        const dayNames = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];


        dayNames.forEach(day => {

            const heading =
                document.createElement("div");

            heading.style.fontWeight = "700";
            heading.style.padding = "10px";
            heading.style.color = "#858da0";
            heading.textContent = day;

            calendarGrid.appendChild(heading);

        });


        for (let i = 0; i < firstDay; i++) {

            const empty =
                document.createElement("div");

            calendarGrid.appendChild(empty);

        }


        for (let day = 1; day <= daysInMonth; day++) {

            const cell =
                document.createElement("div");

            cell.className = "calendar-day";


            const number =
                document.createElement("strong");

            number.textContent = day;


            cell.appendChild(number);


            if (
                day === 20 ||
                day === 22 ||
                day === 25 ||
                day === 30
            ) {

                cell.classList.add("event");

                const event =
                    document.createElement("small");

                event.textContent =
                    day === 20
                        ? "Login Design"
                        : day === 22
                            ? "DB Schema"
                            : day === 25
                                ? "Documentation"
                                : "Project Review";


                cell.appendChild(event);

            }


            calendarGrid.appendChild(cell);

        }

    }


    generateCalendar();


    document
        .getElementById("prevMonth")
        .addEventListener("click", () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            generateCalendar();

        });


    document
        .getElementById("nextMonth")
        .addEventListener("click", () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            generateCalendar();

        });


    /* =========================
       KEYBOARD SEARCH
    ========================= */

    document.addEventListener("keydown", event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    });


    /* =========================
       ESCAPE MODAL
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            modal.classList.remove("show");

        }

    });


    /* =========================
       HTML ESCAPE
    ========================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

});