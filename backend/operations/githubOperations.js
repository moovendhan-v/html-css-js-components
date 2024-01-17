// const { Octokit } = require("octokit");

// const octokit = new Octokit({
//   auth: "USER_ACCESS_TOKEN", // Use the user's access token obtained through OAuth
// });

// async function approveAndPublishChanges(username, branch, changes) {
//   try {
//     // Get the latest commit SHA of the branch
//     const { data: latestCommit } = await octokit.repos.getBranch({
//       owner: "your-username",
//       repo: "your-repo",
//       branch: branch,
//     });

//     // Apply changes to the repository
//     // ...

//     // Commit the changes
//     const { data: commit } = await octokit.git.createCommit({
//       owner: "your-username",
//       repo: "your-repo",
//       message: `Approved changes by ${username}`,
//       tree: latestCommit.commit.tree.sha,
//       parents: [latestCommit.commit.sha],
//       author: {
//         name: username,
//         email: "user@example.com", // Replace with the user's email
//       },
//     });

//     // Update the branch reference to the new commit
//     await octokit.git.updateRef({
//       owner: "your-username",
//       repo: "your-repo",
//       ref: `heads/${branch}`,
//       sha: commit.sha,
//     });

//     console.log(`Changes published successfully to ${branch} by ${username}`);
//   } catch (error) {
//     console.error(`Error publishing changes: ${error.message}`);
//   }
// }
