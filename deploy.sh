#!/usr/bin/env bash

# Exit on error
set -e
set -o pipefail
set -x

NUM_RELEASES=5
CURRENT_TIME=$(date "+%Y%m%d_%H%M%S")
RELEASE_PATH="/ext/ol-schedule/$CURRENT_TIME"
PM2=/root/.npm-global/bin/pm2
SSH_COMMAND="root@aarhof.eu"

npm run lint
npm run build
ssh $SSH_COMMAND "if [ ! -d $RELEASE_PATH ]; then mkdir -p $RELEASE_PATH; fi"
rsync -az .output $SSH_COMMAND:$RELEASE_PATH
scp ./ecosystem.config.cjs $SSH_COMMAND:$RELEASE_PATH

ssh $SSH_COMMAND "cd $RELEASE_PATH && $PM2 stop ecosystem.config.cjs"
ssh $SSH_COMMAND "cd $RELEASE_PATH && $PM2 delete ecosystem.config.cjs"
ssh $SSH_COMMAND "cd $RELEASE_PATH && $PM2 start ecosystem.config.cjs"

# Remove old releases
ssh $SSH_COMMAND "ls -t $RELEASE_PATH/.. | tail -n +$((NUM_RELEASES + 1)) | xargs -I {} rm -rf $RELEASE_PATH/../{}"