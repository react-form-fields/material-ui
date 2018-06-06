set -e

BASEDIR=$(cd `dirname $0` && pwd)

(cd $BASEDIR/project && yarn build)

rm -rf $BASEDIR/build
rsync -avzP $BASEDIR/project/build/ $BASEDIR/

rm -rf $BASEDIR/project/build
