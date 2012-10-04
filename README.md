Dev requirements
----------------
To start development install required Ruby gems:
gem install jekyll
gem install haml
gem install foreman
gem install watchr  --source=http://gemcutter.org

Some of them may require sudo.


Dev process
-----------
Checkout working directory (currently jekyll-version2).
Start Foreman  (invoke foreman in root directory).
Go to ./haml/, edit, save.
Every file created under ./haml/ will be compiled into html and created under root directory.
See changes at http://localhost:4008/.


Publish target
--------------
Merge changes to branch gh-pages and push it to https://github.com/spugachev-gd/focus-ui-proposal.git branch gh-pages.


Dev anatomy
-----------
Procfile contains settings for Foreman.
watchrconfig.rb contains configuration for Watchr.

