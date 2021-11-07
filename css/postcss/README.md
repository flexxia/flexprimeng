### README.txt


<!--  -->
# PostCSS

# 打包 Run 在vagrant machine里，不是Docker里
cd /var/ubuntushare/www/flexprimeng/css/postcss
gulp

## @deprecated
/usr/local/Cellar/node/11.12.0/bin/gulp



<!--  -->
# Verify your gulp versions#
gulp --version


<!--  -->
# Ubuntu 20默认的软件源，安装的是 nodejs v10
## Node.js v12, v14 and v16 are available
### First, we will install the PPA in order to get access to its packages. From your home directory, use curl to retrieve the installation script for your preferred version, making sure to replace 14.x with your preferred version string (if different).

# 替换想要的版本
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh

### Refer to the NodeSource documentation for more information on the available versions.
### Inspect the contents of the downloaded script with nano (or your preferred text editor):

nano nodesource_setup.sh

### When you are satisfied that the script is safe to run, exit your editor,

sudo bash nodesource_setup.sh

### The PPA will be added to your configuration and your local package cache will be updated automatically. You can now install the Node.js package in the same way you did in the previous section:

sudo apt install nodejs

#
node -v
npm -v

<!--  -->
## Install the gulp package in your devDependencies and PostCSS with the Node Package Manager (NPM):

> npm install gulp --save-dev
> npm install gulp-postcss --save-dev


