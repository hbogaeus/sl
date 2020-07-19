#!/bin/sh -x
yarn build
rsync -avzh --delete dist/ bogaeus:/home/henry/sl
