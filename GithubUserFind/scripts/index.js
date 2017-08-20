$(function() {

    let data = {
        client_id: '6f76b1da93c7d0cb906e',
        client_secret: 'faccd0b8c5bfef960f751c8c264a98c1c3676145'
    };
    let timer;
    $(".input").on("keyup", function() {
        clearTimeout(timer);
        if ($(".input").val().length === 0) {
            clear();
            return;
        }
        timer = setTimeout(async function() {
            try {
                let res = await Promise.all([
                    fetch(`https://api.github.com/users/${$(".input").val()}`, data),
                    fetch(`https://api.github.com/users/${$(".input").val()}/repos`, data)
                ]);
                let [user, repos] = await Promise.all(res.map(res => res.json()));
                showUserInfo(user);
                showUserRepos(repos);
            } catch (error) {
                clear();
                console.log(error);
            }

        }, 500);

        function showUserInfo(user) {
            let info = `
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src=${user.avatar_url} alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>${user.login}</strong>
                                    <br>  creat at:${user.created_at}
                            </div>
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <a class="level-item" href="${user.html_url}" target="_block">
                                        <span class="icon is-small"><i class="octicon octicon-mark-github"></i></span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            `;
            $("#info").html(info);
        }

        function showUserRepos(repos) {
            let repoHtml = "";
            repos.map(repo => {
                repoHtml += `
                    <a class="panel-block" href="${repo.html_url}" target="_block">
                        <i class="octicon octicon-repo ">${repo.name}</i>
                        <i class="octicon octicon-star ">${repo.stargazers_count}</i>
                    </a>
                `
            });
            let html = `<div class="panel"><p class="panel-heading">repositories</p>${repoHtml}</div>`
            $("#repos").html(html);
        }

        function clear() {
            $("#repos").html("");
            $("#info").html("");
        }

    });
})