---
title: Video Tools
date: 2019-09-16
tags:
  - tools
---

capturing screen: quicktime or giffy capture

## convert mov to gif

```bash
brew install ffmpeg
```

```bash
ffmpeg -i socket-start-no-rabbit.mov -vf "fps=10,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 socket-start-no-rabbit.gif
```

https://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality

https://medium.com/@colten_jackson/doing-the-gif-thing-on-debian-82b9760a8483

https://ffmpeg.org/ffmpeg.html#filter_005foption
