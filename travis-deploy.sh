#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

# Options.
DIST_DIRECTORY=dist

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
cd $DIST_DIRECTORY
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
