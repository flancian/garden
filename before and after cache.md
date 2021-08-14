# before and after cache

- before [[cache]] as of [[2021-08-14]]:
```
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 1.anagora.org (be patient).....done


Server Software:        nginx/1.14.2
Server Hostname:        1.anagora.org
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        1.anagora.org

Document Path:          /index
Document Length:        86661 bytes

Concurrency Level:      10
Time taken for tests:   8.594 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      8685300 bytes
HTML transferred:       8666100 bytes
Requests per second:    11.64 [#/sec] (mean)
Time per request:       859.357 [ms] (mean)
Time per request:       85.936 [ms] (mean, across all concurrent requests)
Transfer rate:          986.99 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       83   86   4.7     85     118
Processing:   508  709 387.8    615    2408
Waiting:      394  596 387.8    502    2295
Total:        591  794 389.3    700    2497

Percentage of the requests served within a certain time (ms)
  50%    700
  66%    726
  75%    743
  80%    751
  90%    782
  95%   1816
  98%   2471
  99%   2497
 100%   2497 (longest request)
```

- after adding [[nginx caching]] / [[uwsgi caching]]:
```
flancian@paramita:/etc/nginx/sites-enabled$ ab -n 100 -c 10 https://1.anagora.org/index
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 1.anagora.org (be patient).....done


Server Software:        nginx/1.14.2
Server Hostname:        1.anagora.org
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        1.anagora.org

Document Path:          /index
Document Length:        86773 bytes

Concurrency Level:      10
Time taken for tests:   2.907 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      8696500 bytes
HTML transferred:       8677300 bytes
Requests per second:    34.39 [#/sec] (mean)
Time per request:       290.748 [ms] (mean)
Time per request:       29.075 [ms] (mean, across all concurrent requests)
Transfer rate:          2920.98 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       83   87  11.4     85     196
Processing:   165  171   6.8    170     208
Waiting:       54   56   2.2     56      65
Total:        249  259  13.7    255     364

Percentage of the requests served within a certain time (ms)
  50%    255
  66%    257
  75%    260
  80%    262
  90%    275
  95%    276
  98%    303
  99%    364
 100%    364 (longest request)
```

- in [[thecla]], before and after for same config change, with [[async search]] already deployed:

```
flancian@paramita:/etc/nginx/sites-enabled$ ab -n 100 -c 10 https://anagora.org/index
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking anagora.org (be patient).....done


Server Software:        nginx/1.14.2
Server Hostname:        anagora.org
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        anagora.org

Document Path:          /index
Document Length:        42600 bytes

Concurrency Level:      10
Time taken for tests:   8.310 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      4279200 bytes
HTML transferred:       4260000 bytes
Requests per second:    12.03 [#/sec] (mean)
Time per request:       830.959 [ms] (mean)
Time per request:       83.096 [ms] (mean, across all concurrent requests)
Transfer rate:          502.90 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       63   66   2.8     65      76
Processing:   313  716 772.1    431    3046
Waiting:      312  715 772.2    430    3045
Total:        378  782 773.8    496    3120

Percentage of the requests served within a certain time (ms)
  50%    496
  66%    528
  75%    538
  80%    554
  90%   2674
  95%   2885
  98%   3018
  99%   3120
 100%   3120 (longest request)
```

```
flancian@paramita:/etc/nginx/sites-enabled$ ab -n 100 -c 10 https://anagora.org/index
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking anagora.org (be patient).....done


Server Software:        nginx/1.14.2
Server Hostname:        anagora.org
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        anagora.org

Document Path:          /index
Document Length:        42600 bytes

Concurrency Level:      10
Time taken for tests:   1.352 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      4279200 bytes
HTML transferred:       4260000 bytes
Requests per second:    73.96 [#/sec] (mean)
Time per request:       135.205 [ms] (mean)
Time per request:       13.521 [ms] (mean, across all concurrent requests)
Transfer rate:          3090.79 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       63   67   3.1     67      80
Processing:    42   52  38.3     44     393
Waiting:       40   46  12.2     42      95
Total:        105  120  38.2    111     458

Percentage of the requests served within a certain time (ms)
  50%    111
  66%    112
  75%    114
  80%    117
  90%    143
  95%    153
  98%    215
  99%    458
 100%    458 (longest request)
```