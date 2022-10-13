- a [[recipe]].
  - in server (where you'll listen to music): `pactl load-module module-native-protocol-tcp port=8888 listen=192.168.1.253`
  - in client (where you'll produce sound): `pactl load-module module-tunnel-sink server=tcp:192.168.1.253:8888`

