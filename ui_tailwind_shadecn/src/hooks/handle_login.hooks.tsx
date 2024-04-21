
export const HandleLogin = () => {

    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = 'http://localhost:5174';
    const scope = 'user';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = githubOAuthUrl

   

  };