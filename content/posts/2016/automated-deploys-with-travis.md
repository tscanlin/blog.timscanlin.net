---
title: Automated Deploys With Travis
layout: Post
date: 2016-10-28
---

Using [Travis CI](https://travis-ci.org/) is a great way to automate repetitive tasks like building and testing your projects. But recently I've been using it to automate deployments to github pages and it's been great. I have read a [few](https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db#.2mit50e96) [tutorials](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd) [that](http://www.steveklabnik.com/automatically_update_github_pages_with_travis_example/) outlined similar steps, but they didn't quite have the results I wanted so I decided to write my own. To automate deploying to github pages with [Travis](https://travis-ci.org/), here's the steps I followed:

1. [Get a personal access token from github.com](https://github.com/settings/tokens) Note: You only get to see this key once.

2. Setup your repository in Travis (at https://travis-ci.org/)
I also suggest limiting concurrent builds to 1 in the repo's Travis settings so that builds run sequentially.

3. `npm install -g travis-encrypt` (https://www.npmjs.com/package/travis-encrypt)

4. `travis-encrypt -r [repository slug] GITHUB_TOKEN=[personal access token]` Note: The repository slug includes your username.


5. Then setup your .travis.yml file, you need to changes the `GITHUB_REPO` and `secure` options.

```yaml
language: node_js
node_js:
  - "6.9"
sudo: false
branches:
  only:
    - master
install:
- npm install
script:
- npm run build
after_success:
- bash ./travis-deploy.sh
env:
  global:
    - GITHUB_REPO: [repository slug]
    - secure: [result from travis-encrypt command]
```

6. And include the travis-deploy script:

```sh
#!/bin/bash
set -o errexit

# Info.
echo "Running deploy script"
echo "Branch: $TRAVIS_BRANCH"
echo "Is a Pull Request: $TRAVIS_PULL_REQUEST"

# Exit if the branch is not the master branch.
if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master. No deploy."
  exit 0
fi

# Exit if the commit is a pull request.
# We only want to build / deploy when pull requests are merged into master.
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  echo "This commit is a pull request. No deploy."
  exit 0
fi

# Git config.
git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

# Build steps (taken care of beforehand)

# Deploy.
cd build
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
```

7. Also, make the `gh-pages` branch on github before running the above script from travis-ci just to be safe.

This will deploy to the gh-pages branch on any commits into master as long as the build finishes successfully [even if not done through a pull request in case of emergencies ;)]. On pull requests, travis will still try and build the branch to make sure that succeeds, but it won't push any of the changes to gh-pages branch.

See this in action in the github repo for this blog at  [https://github.com/tscanlin/blog.timscanlin.net](https://github.com/tscanlin/blog.timscanlin.net)
