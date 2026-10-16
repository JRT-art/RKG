#!/bin/bash
# usage: scripts/media.sh N   -> builds web excerpt, hover preview and poster for _source/vN.mp4 (put your source file at _source/vN.mp4 first)
B=ffmpeg   # requires ffmpeg on PATH
n=$1; s=_source/v$n.mp4
$B -v error -y -i $s -t 60 -vf "scale=720:-2:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/videos/p$n.mp4
$B -v error -y -ss 1 -i $s -t 4 -an -vf "scale=360:-2,fps=24" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart public/videos/p$n-preview.mp4
$B -v error -y -ss 2.2 -i $s -frames:v 1 -vf "scale=720:-2:flags=lanczos" -q:v 3 public/images/p$n.jpg
echo done $n
