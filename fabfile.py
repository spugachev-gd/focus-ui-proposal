from fabric.api import *


def up(branch="jekyll-version2", repo='gp'):
    local('git checkout gh-pages')
    local('git merge %s' % branch)
    local('git push %s' % repo)
    local('git checkout %s' % branch)
