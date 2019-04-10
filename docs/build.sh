set -e

BASEDIR=$(cd `dirname $0` && pwd)

rm -rf $BASEDIR/static
rm -rf $BASEDIR/asset-manifest.json
rm -rf $BASEDIR/favicon.ico
rm -rf $BASEDIR/index.html
rm -rf $BASEDIR/manifest.json
rm -rf $BASEDIR/service-worker.js

(cd $BASEDIR/project && yarn && yarn build)

rsync -avzP $BASEDIR/project/build/ $BASEDIR/

rm -rf $BASEDIR/project/build
