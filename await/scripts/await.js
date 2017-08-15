class Github {
    async interface(url) {
        let html = "";
        try {
            let res = await fetch(url);
            let userData = await res.json();
            await (html += `<h1>${userData.login}</h1>`);
            await (html += `<img src="${userData.avatar_url}" alt="">`); //头像

            let repoData = await fetch(userData.repos_url);
            let repos = await repoData.json();
            await repos.map(repo => {
                html += `<div class="repo">	
				<div class="repoName">👩‍🚒:${repo.name}</div>
				 <div class="star">⭐️:${repo.stargazers_count}</div>
				  </div>`;
            });
            return html;
        } catch (error) {
            console.log(error);
        }

    }
}

let git = new Github();
let $content = document.querySelector(".github");

git.interface("https://api.github.com/users/ibireme").then(html => $content.innerHTML = html);