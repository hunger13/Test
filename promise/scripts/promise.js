(function() {
    let html = "";
    let $content = document.querySelector(".github");

    fetch("https://api.github.com/users/ibireme")
        .then(userData => userData.json())
        .then(userData => {
            html += `<h1>${userData.login}</h1>`;
            return userData;
        })
        .then(userData => {
            html += `<img src="${userData.avatar_url}" alt="">`; //头像
            return userData;
        })
        .then(userData => {
            return new Promise(success => {
                fetch(userData.repos_url)
                    .then(reposUrl => reposUrl.json())
                    .then(repos => {
                        userData.repos = repos;
                        success(userData);
                    })
            })

        })
        .then(userData => {
            userData.repos.map(repo => { //详情
                html += `<div class="repo">	
				<div class="repoName">👩‍🚒:${repo.name}</div>
				 <div class="star">⭐️:${repo.stargazers_count}</div>
				  </div>`;
            })
            return userData;
        })
        .then(userData => {
            $content.innerHTML = html;
        })

})()