const elList = document.querySelector(".content-list");
const elTemplete = document.querySelector(".user__template").content;

const elPostList = document.querySelector(".content-list__post");
const postTempletepage = document.querySelector(
    ".user--post--template"
    ).content;
    
    const elComment = document.querySelector(".content-list__comment");
    const elComentTemplete = document.querySelector(
        ".user--comment--template"
        ).content;
        
        let posts = [];
        let comments = [];
        
        function randerUsers(arr, node) {
            node.innerHTML = null;
            
            const usersFragment = document.createDocumentFragment();
            
            arr.forEach((row) => {
                const userTemplate = elTemplete.cloneNode(true);
                
                userTemplate.querySelector(".name").textContent = row.name;
                userTemplate.querySelector(".user--email").href = "mailto:" + row.email;
                
                userTemplate.querySelector(".user--email").textContent = row.email;
                userTemplate.querySelector(".user--adress").textContent =
                row.address.street +
                " " +
                row.address.suite +
                " " +
                row.address.city +
                " " +
                row.address.zipcode;
                
                userTemplate.querySelector(".user--phone").textContent = row.phone;
                userTemplate.querySelector(".user--website").textContent = row.website;
                userTemplate.querySelector(".company").textContent =
                row.company.name + "" + row.company.catchPhrase + row.company.bs;
                userTemplate.querySelector(".button-more").dataset.userId = row.id;
                usersFragment.appendChild(userTemplate);
            });
            
            node.appendChild(usersFragment);
        }
        
        async function getUsers() {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            
            const data = await response.json();
            randerUsers(data, elList);
        }
        getUsers();
        
        // Users post
        function randerUsersPost(arr, node) {
            node.innerHTML = null;
            
            const postsFragment = document.createDocumentFragment();
            arr.forEach((post) => {
                const postTemplate = postTempletepage.cloneNode(true);
                postTemplate.querySelector(".post__title").textContent = post.title;
                postTemplate.querySelector(".post__body").textContent = post.body;
                postTemplate.querySelector(".commentbtn").dataset.idButtonCom = post.id;
                postsFragment.appendChild(postTemplate);
            });
            node.appendChild(postsFragment);
        }
        
        async function getPosts(userId) {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
            
            const data = await response.json();
            
            posts = data.filter((post) => post.userId == userId);
            
            randerUsersPost(posts, elPostList);
        }
        elList.addEventListener("click", (evt) => {
            if (evt.target.matches(".button-more")) {
                elComment.innerHTML = null;
                const userId = evt.target.dataset.userId;
                getPosts(userId);
            }
        });
        //comets
        function renderComment(arr, node) {
            node.innerHTML = null;
            const usersFragment = document.createDocumentFragment();
            
            arr.forEach((row) => {
                const commentTemplate = elComentTemplete.cloneNode(true);
                commentTemplate.querySelector(".comment__title").textContent = row.name;
                commentTemplate.querySelector(".commentlink").href = "mailto:" + row.email;
                commentTemplate.querySelector(".commentlink").textContent = row.email;
                commentTemplate.querySelector(".comment-body").textContent = row.body;
                
                usersFragment.appendChild(commentTemplate);
            });
            node.appendChild(usersFragment);
        }
        
        async function getComments(postId) {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/comments?postId=" + postId
                );
                
                const data = await response.json();
                
                renderComment(data, elComment);
            }
            
            // getComments();
            
            elPostList.addEventListener("click", (evt) => {
                const comButton = evt.target.matches(".commentbtn");
                if (comButton) {
                    const isButton = evt.target.dataset.idButtonCom;
                    
                    getComments(isButton);
                }
            });
            