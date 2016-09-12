#!/bin/bash
dst=$1

if [ "${dst}" == "" ];then
  exit -1
fi

if [ ! -e ${dst} ];then
  mkdir -p ${dst}
  ret=$?
else 
  ret=1
fi

exit ${ret}
