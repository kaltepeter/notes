# certs

## generate cert for local dev and xip.io

replace {ip} with your ip.

```bash
openssl req -x509 -days 365 -out "${__dir}/../certs/xip.io.crt" -keyout "${__dir}/../certs/xip.io.key" \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN={ip}.xip.io' -extensions EXT -config <( \
   printf "[dn]\nCN={ip}.xip.io\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:*.{ip}.xip.io, DNS:{ip}.xip.io\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")  
```

## trust on local machine (mac)

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "xip.io.crt"
```