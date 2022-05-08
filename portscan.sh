#!/bin/bash
set +v
set +x
comp='^[0-9,.]+$'
read -p 'Domain: ' usrInput
if ! [[ $usrInput =~ $comp ]];
    then
    ip=$(host $usrInput | awk 'FNR == 1 { print $4 }')
    else
    ip=$usrInput
fi

 reSult='timeout --signal=9 0.7 telnet '$ip''
  for i in 80 21 22 23 53 67 123 179 443 500 3389 8080 8443
  do
     $reSult $i | if grep -q "Connected";
             then
             echo "Port $i is open"
             elif grep -q "refused";
             then
             echo "casdasd"
             else
             echo "Port $i is closed"
             fi
  done