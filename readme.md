> This cannot reconstruct the missing text on blurred pages. If someone finds a solution to this, feel free to create a PR. Curren research in the bottom.

# StuDocu Unblocker

![button](https://github.com/mono424/studocu_unblocker/blob/main/img/cover.png "Button")

A Chrome Extension which 1-Click unblocks studocu documents. It removes blur and the ad-banner.

## Features

- Unblur Images
- Remove banners
- Add PrintView

## Install

1. Clone or download this repo

2. Go to `chrome://extensions/`

3. Click `Load unpacked extension`-Button

4. Select the studocu folder

# Research to get Document text

All document ressources are loaded from cloudfront. These are:

- Blurred Images
- Background Images (Unblurred)
- Document Text (html)

The requests are authenticated by query params:

- Policy (Base64Url encoded string, containing information about what ressource is allowed to be accessed)
- Signature (Most probably something like a hash, that proofs that the policy is from an authentic source)

The url is build like this:

- `https://<some-identifier>.cloudfront.net`
- `/<document-identifier>/html/`
- then the ressource you want to access

An URL could look like this:

```
https://d3tvd1u91rr79.cloudfront.net/a873241ef30e9b2948a49cfe5eb432e4/html/a873241ef30e9b2948a49cfe5eb432e4.html?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6XC9cL2QzdHZkMXU5MXJyNzkuY2xvdWRmcm9udC5uZXRcL2E4NzMyNDFlZjMwZTliMjk0OGE0OWNmZTVlYjQzMmU0XC9odG1sXC8qLmh0bWwiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3MDg5NDUwNTZ9fX1dfQ__&Signature=Sc7wVbi-SKLeY0xW0U3PPKwp6Py3vSO5DjWmV8by3e6r8Ku2oJcu0mttu0L2TtjpKcNOubfush-avnWgiZ68RcGM73OHMSeOX--O2WQLPhIaytvIbLGDbqKmOYqDOW9nqg~Ip7cKY24zz5MHaLsfJPf-x24R7XbNWkm10kxq0HTSV6hUTLSvUmKaw06GtLZW1iVO7T9p4p93SDJNi93G1-cnVfRRjTWtbCnuVmDfvz-gP8QGDsGeE6b0~DKQkYZIu1uwa1kr3nbSS~zgTiuvmjefD8dC17mvvf7PjAYQX6Y4NmipoC1gQ8NF-gPGZAndUXGmcCwhfNaY7s0XWpmxtA__&Key-Pair-Id=APKAJ535ZH3ZAIIOADHQ
```

Have fun! :D