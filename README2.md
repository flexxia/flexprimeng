


# composer
sudo php -d memory_limit=-1 /Users/Dong/Documents/app/composer/1.10.19/composer.phar require "flexxia/flexprimeng:dev-master"

## 有时需要加 --dev
sudo composer require --dev flexxia/flexprimeng:dev-master

## 指定版本
sudo php -d memory_limit=4096M /usr/local/bin/composer require "flexxia/flexprimeng dev-master#b8a83d3"


###
\\ Remove
sudo composer remove flexxia/flexprimeng
sudo php -d memory_limit=4096M /usr/local/bin/composer remove flexxia/flexprimeng

composer show flexxia/flexprimeng

sudo git rm -f --cached web/libraries/flexprimeng

sudo git add -f web/libraries/flexprimeng/*

<!--  -->

# node
node --version
node -v
nodejs -v

# ng build
### Run `ng build` to build the project.
cd web/libraries/flexprimeng/primeng7app
ng build

/usr/local/Cellar/node/11.12.0/bin/ng build

ng build --prod


<!--  -->
# .gitignore
# Do not Ignore flexservice folder
######################
!web/modules/custom/flexservice/
!web/modules/custom/flexservice**/*
!web/modules/custom/flexservice/*
