// ======================================================
// CONNECTHUB - FINAL JAVASCRIPT
// CodeAlpha Social Media Task
// ======================================================


// ======================================================
// TOAST
// ======================================================

window.showToast = function (message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.zIndex = "99999";
        toast.style.padding = "14px 24px";
        toast.style.borderRadius = "30px";
        toast.style.background = "#222";
        toast.style.color = "#fff";
        toast.style.fontSize = "14px";
        toast.style.boxShadow = "0 8px 30px rgba(0,0,0,.25)";

        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 2200);
};


// ======================================================
// PAGE NAVIGATION
// ======================================================

window.showPage = function (pageId, clickedItem) {

    const pages = document.querySelectorAll(".app-page");

    pages.forEach(function (page) {
        page.style.display = "none";
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        console.log("Page not found:", pageId);
        return;
    }

    selectedPage.style.display = "block";
    selectedPage.classList.add("active-page");

    // Sidebar active item
    document.querySelectorAll(".sidebar-menu a").forEach(function (item) {
        item.classList.remove("active");
    });

    if (clickedItem) {
        clickedItem.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


// ======================================================
// LIKE POST
// ======================================================

window.toggleLike = function (button) {

    if (!button) return;

    const icon = button.querySelector("i");

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

        showToast("Like removed");

    } else {

        button.classList.add("liked");

        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }

        showToast("Post liked ❤️");
    }
};


// IMPORTANT:
// Some of your older HTML may use likePost()
// instead of toggleLike()

window.likePost = function (button) {
    window.toggleLike(button);
};


// ======================================================
// COMMENT
// ======================================================

window.focusComment = function (button) {

    const post = button.closest(".post-card");

    if (!post) return;

    const input = post.querySelector("input");

    if (input) {
        input.focus();
        showToast("Write your comment 💬");
    }
};


// Older HTML support
window.commentPost = function (button) {
    window.focusComment(button);
};


window.addComment = function (event) {

    if (event.key !== "Enter") return;

    const input = event.target;

    const text = input.value.trim();

    if (!text) return;

    const post = input.closest(".post-card");

    if (!post) return;

    let comments =
        post.querySelector(".comments-list");

    if (!comments) {

        comments = document.createElement("div");

        comments.className = "comments-list";

        input.parentElement.before(comments);
    }

    const comment =
        document.createElement("div");

    comment.style.display = "flex";
    comment.style.gap = "10px";
    comment.style.padding = "10px 0";

    comment.innerHTML = `
        <img
            src="https://i.pravatar.cc/50?img=47"
            style="
                width:35px;
                height:35px;
                border-radius:50%;
            "
        >

        <div>
            <strong>Amrutha Varshini</strong>
            <p style="margin:3px 0;">
                ${escapeHTML(text)}
            </p>
        </div>
    `;

    comments.appendChild(comment);

    input.value = "";

    showToast("Comment added 💬");
};


// ======================================================
// SHARE
// ======================================================

window.sharePost = function () {

    const text =
        "Check out this post on ConnectHub!";

    if (navigator.clipboard) {

        navigator.clipboard.writeText(text)
            .then(function () {
                showToast("Post link copied 🔗");
            })
            .catch(function () {
                showToast("Post shared 🔗");
            });

    } else {

        showToast("Post shared 🔗");
    }
};


// ======================================================
// SAVE POST
// ======================================================

window.toggleSave = function (button) {

    if (!button) return;

    const icon = button.querySelector("i");

    if (button.classList.contains("saved")) {

        button.classList.remove("saved");

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

        showToast("Removed from Saved Posts");

    } else {

        button.classList.add("saved");

        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }

        showToast("Saved successfully 🔖");
    }
};


// Older HTML support
window.savePost = function (button) {
    window.toggleSave(button);
};


// ======================================================
// CREATE POST
// ======================================================

window.createPost = function () {

    const input =
        document.getElementById("postInput");

    if (!input) {
        showToast("Post box not found");
        return;
    }

    const text = input.value.trim();

    if (!text) {
        showToast("Write something first ✍️");
        input.focus();
        return;
    }

    const container =
        document.getElementById("postsContainer");

    if (!container) {
        showToast("Posts area not found");
        return;
    }

    const post =
        document.createElement("article");

    post.className = "post-card card";

    post.innerHTML = `

        <div class="post-header">

            <div class="user-info">

                <img
                    src="https://i.pravatar.cc/100?img=47"
                    class="avatar"
                >

                <div>
                    <h4>Amrutha Varshini</h4>
                    <p>Just now · 🌎</p>
                </div>

            </div>

            <button class="more-btn">
                ⋯
            </button>

        </div>

        <p class="post-text">
            ${escapeHTML(text)}
        </p>

        <div class="post-stats">

            <span>0 likes</span>

            <span>
                0 comments · 0 shares
            </span>

        </div>

        <div class="post-actions">

            <button onclick="toggleLike(this)">
                <i class="fa-regular fa-heart"></i>
                Like
            </button>

            <button onclick="focusComment(this)">
                <i class="fa-regular fa-comment"></i>
                Comment
            </button>

            <button onclick="sharePost()">
                <i class="fa-solid fa-share"></i>
                Share
            </button>

            <button onclick="toggleSave(this)">
                <i class="fa-regular fa-bookmark"></i>
                Save
            </button>

        </div>

        <div class="comment-box">

            <img
                src="https://i.pravatar.cc/50?img=47"
                class="small-avatar"
            >

            <input
                type="text"
                placeholder="Write a comment..."
                onkeydown="addComment(event)"
            >

        </div>
    `;

    container.prepend(post);

    input.value = "";

    showToast("Post published successfully 🎉");
};


// ======================================================
// PHOTO POST
// ======================================================

window.openImagePost = function () {

    const imageInput =
        document.getElementById("imageInput");

    if (imageInput) {

        imageInput.click();

    } else {

        showToast("Image upload not available");
    }
};


document.addEventListener("DOMContentLoaded", function () {

    const imageInput =
        document.getElementById("imageInput");

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            function () {

                const file = this.files[0];

                if (!file) return;

                const reader =
                    new FileReader();

                reader.onload = function (event) {

                    const container =
                        document.getElementById(
                            "postsContainer"
                        );

                    if (!container) return;

                    const post =
                        document.createElement("article");

                    post.className =
                        "post-card card";

                    post.innerHTML = `

                        <div class="post-header">

                            <div class="user-info">

                                <img
                                    src="https://i.pravatar.cc/100?img=47"
                                    class="avatar"
                                >

                                <div>
                                    <h4>Amrutha Varshini</h4>
                                    <p>Just now · 🌎</p>
                                </div>

                            </div>

                        </div>

                        <p class="post-text">
                            Shared a new photo 📸
                        </p>

                        <img
                            src="${event.target.result}"
                            style="
                                width:100%;
                                max-height:450px;
                                object-fit:cover;
                                border-radius:16px;
                                margin-top:12px;
                            "
                        >

                        <div class="post-actions">

                            <button onclick="toggleLike(this)">
                                ❤️ Like
                            </button>

                            <button onclick="focusComment(this)">
                                💬 Comment
                            </button>

                            <button onclick="sharePost()">
                                ↗ Share
                            </button>

                            <button onclick="toggleSave(this)">
                                🔖 Save
                            </button>

                        </div>

                        <div class="comment-box">

                            <input
                                type="text"
                                placeholder="Write a comment..."
                                onkeydown="addComment(event)"
                            >

                        </div>
                    `;

                    container.prepend(post);

                    showToast(
                        "Photo posted successfully 📸"
                    );
                };

                reader.readAsDataURL(file);
            }
        );
    }

});


// ======================================================
// FRIENDS
// ======================================================

window.toggleFriend = function (button) {

    if (!button) return;

    const text =
        button.innerText.trim();

    if (
        text === "Add Friend" ||
        text === "+"
    ) {

        button.innerText =
            "Request Sent ✓";

        showToast(
            "Friend request sent 👥"
        );

    } else if (
        text.includes("Request")
    ) {

        button.innerText =
            "Add Friend";

        showToast(
            "Friend request cancelled"
        );

    } else {

        button.innerText =
            "Add Friend";

        showToast(
            "Friend removed"
        );
    }
};


// ======================================================
// FRIEND SUGGESTIONS
// ======================================================

window.toggleSuggestion = function (button) {

    if (!button) return;

    if (
        button.innerText.trim() === "+"
    ) {

        button.innerText = "✓";

        button.style.background =
            "#22c55e";

        button.style.color =
            "#fff";

        showToast(
            "Friend request sent 👥"
        );

    } else {

        button.innerText = "+";

        button.style.background = "";

        button.style.color = "";

        showToast(
            "Request cancelled"
        );
    }
};


// ======================================================
// REELS LIKE
// ======================================================

window.reelLike = function (button) {

    if (!button) return;

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");

        showToast(
            "Reel like removed"
        );

    } else {

        button.classList.add("liked");

        showToast(
            "Reel liked ❤️"
        );
    }
};


// ======================================================
// FOLLOW
// ======================================================

document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;

    if (
        button.innerText.trim() === "Follow"
    ) {

        button.innerText =
            "Following ✓";

        showToast(
            "Following user ✓"
        );
    }

});


// ======================================================
// NOTIFICATIONS
// ======================================================

window.markNotificationsRead =
    function () {

        document
            .querySelectorAll(
                ".notification-item"
            )
            .forEach(function (item) {

                item.classList.remove(
                    "unread"
                );
            });

        document
            .querySelectorAll(
                ".menu-badge, .notification-dot"
            )
            .forEach(function (badge) {

                badge.style.display =
                    "none";
            });

        showToast(
            "All notifications marked as read ✓"
        );
    };


// ======================================================
// MESSAGES
// ======================================================

window.sendMessage = function (event) {

    if (
        event &&
        event.key &&
        event.key !== "Enter"
    ) {
        return;
    }

    const input =
        document.getElementById(
            "messageInput"
        );

    if (!input) {
        showToast("Message box not found");
        return;
    }

    const text =
        input.value.trim();

    if (!text) return;

    const messages =
        document.querySelector(
            ".chat-messages"
        );

    if (!messages) {
        showToast("Chat area not found");
        return;
    }

    const message =
        document.createElement("div");

    message.className =
        "message sent";

    message.innerText =
        text;

    messages.appendChild(message);

    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;

    showToast(
        "Message sent 💬"
    );

    // Fake reply
    setTimeout(function () {

        const reply =
            document.createElement("div");

        reply.className =
            "message received";

        reply.innerText =
            "That's great! 😊";

        messages.appendChild(reply);

        messages.scrollTop =
            messages.scrollHeight;

    }, 1000);
};


// ======================================================
// CHAT SWITCH
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .querySelectorAll(".chat")
            .forEach(function (chat) {

                chat.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".chat"
                            )
                            .forEach(function (item) {

                                item.classList.remove(
                                    "active-chat"
                                );
                            });

                        chat.classList.add(
                            "active-chat"
                        );

                        const name =
                            chat.querySelector(
                                "strong"
                            );

                        const image =
                            chat.querySelector(
                                "img"
                            );

                        const header =
                            document.querySelector(
                                ".chat-header"
                            );

                        if (
                            header &&
                            name &&
                            image
                        ) {

                            const headerImage =
                                header.querySelector(
                                    "img"
                                );

                            const headerName =
                                header.querySelector(
                                    "strong"
                                );

                            if (headerImage) {
                                headerImage.src =
                                    image.src;
                            }

                            if (headerName) {
                                headerName.innerText =
                                    name.innerText;
                            }
                        }

                        showToast(
                            "Chat opened with " +
                            name.innerText
                        );
                    }
                );
            });

    }
);


// ======================================================
// DARK MODE
// ======================================================

window.toggleDarkMode = function () {

    const checkbox =
        document.getElementById(
            "darkMode"
        );

    if (!checkbox) return;

    document.body.classList.toggle(
        "dark-mode",
        checkbox.checked
    );

    localStorage.setItem(
        "connecthubDarkMode",
        checkbox.checked
    );

    if (checkbox.checked) {

        showToast(
            "Dark mode enabled 🌙"
        );

    } else {

        showToast(
            "Light mode enabled ☀️"
        );
    }
};


// ======================================================
// SEARCH
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        if (!searchInput) return;

        searchInput.addEventListener(
            "input",
            function () {

                const value =
                    this.value
                        .toLowerCase()
                        .trim();

                const items =
                    document.querySelectorAll(
                        ".post-card, .friend-card, .suggestion"
                    );

                items.forEach(function (item) {

                    const text =
                        item.innerText
                            .toLowerCase();

                    if (
                        value === "" ||
                        text.includes(value)
                    ) {

                        item.style.display = "";

                    } else {

                        item.style.display =
                            "none";
                    }
                });
            }
        );
    }
);


// ======================================================
// DARK MODE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const saved =
            localStorage.getItem(
                "connecthubDarkMode"
            );

        const checkbox =
            document.getElementById(
                "darkMode"
            );

        if (saved === "true") {

            document.body.classList.add(
                "dark-mode"
            );

            if (checkbox) {
                checkbox.checked = true;
            }
        }

    }
);


// ======================================================
// HELPER
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ======================================================
// TEST MESSAGE
// ======================================================

console.log(
    "✅ ConnectHub script.js loaded successfully"
);