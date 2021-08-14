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

- after [[caching]]
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
Document Length:        86661 bytes

Concurrency Level:      10
Time taken for tests:   2.709 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      8685300 bytes
HTML transferred:       8666100 bytes
Requests per second:    36.91 [#/sec] (mean)
Time per request:       270.912 [ms] (mean)
Time per request:       27.091 [ms] (mean, across all concurrent requests)
Transfer rate:          3130.81 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       83   85   1.7     85      91
Processing:   164  170   4.2    169     194
Waiting:       54   56   1.2     55      61
Total:        248  255   4.8    254     279

Percentage of the requests served within a certain time (ms)
  50%    254
  66%    256
  75%    258
  80%    258
  90%    261
  95%    265
  98%    266
  99%    279
 100%    279 (longest request)
```