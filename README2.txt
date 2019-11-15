


###
sudo composer require --dev flexxia/flexprimeng:dev-master
sudo php -d memory_limit=2048M /usr/local/bin/composer require "flexxia/flexprimeng:dev-master"
sudo php -d memory_limit=2048M /usr/local/bin/composer require "flexxia/flexprimeng dev-master#b8a83d3"


###
sudo composer remove flexxia/flexprimeng
sudo php -d memory_limit=2048M /usr/local/bin/composer remove flexxia/flexprimeng

composer show flexxia/flexprimeng


sudo git rm -f --cached web/libraries/flexprimeng

sudo git add -f web/libraries/flexprimeng/*
