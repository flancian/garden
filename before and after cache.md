# before and after cache

- before [[cache]]
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

- after [[nginx caching]]
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