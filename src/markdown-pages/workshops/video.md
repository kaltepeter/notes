---
title: "AI: After Effects"
date: 2005-01-01
tags:
  - design
  - video
  - college
  - Art Institute
---

https://www.yuco.com/

## After Effects

- DI NTSC - north america, 30 fps or 29.97
- 720x 486px
- 72dspi
- do not sue 100% saturation, creates flicker
- PAL - Europe, 25 fps
- SECAM - parts of Japan
- NESECAM - almost no one

### Import PSD w/ layers

- import > file
- import as composition
- compisition > settings: change to DI NTSC

### Text

- illustrator
- create outlines > save file
- import ai in after effects

### Changing Type Effects

- Don't use tint effects - more render time
- edit orig ai
- select object in bin
- Edit original 
- save file
- automatically updates in after effects, they are linked files

### Lost Links
 - right click > choose footage file
 - double click asset in bin

### Type Mask

- import background as compisition
- pull ai file over
- duplicate background layer
- switch modes
- select alpha track matte

### compositions

- select all layers in com
- command + shift C : layer pre compose
- name it

### Mask

- use rect to make mask
- hit m
- select itmeline and adjust mask
- add feather for soft edge

### DVD Menu

- 720 x 480
- 30 fps
- import psd as composition
- use sound
- keep in folders
- render quicktime movies
- animate all menus

### 3D Layers

- Click on cube to create 3d layer
- arrange on z axis
    - 15 mm: fish eye
    - 50 mm -: wide angle
    - 50 mm: normal
    - 50 mm: + telephoto
- create camera: layer > new camera
- transforms

### Shine

- select leyer
- effect > trapcode > shine

## Links

- flashkit.com

## Adobe After Effects

- render H.264

### Pixel Aspect Ratio and working with D1/DV NTSC

Images are broken down in series of tiny picture elements called pixels. Computer screesn display pixels as square; they are as wide as they are tall. In most video formats pixels are not square; they are projected differently than the way they are seen on a computer screen.

D1 NTSC has a pixel aspect ratio of 0.9 (or 0.9 width by 1.0 height). It also has a frame aspect ratio of 4:3 (or 4.0 width by 3.0 height).

The most common proportion or image aspect ratio for TV image is four units wide to three units high - 4:3 aspect ratios. Most of the earlier generation video systems were computer software products assume pixels are square when they create and edit content. The new generation digital video (CCIR-601 or just 601) specification works a bit different although the pixel aspect ratio is still 4:3; the standard defines 486 scanlines for NTSC video not 480. It also defines 720 pixels across, not 640. In this format the image is not square when seen on a video monitor; they are shown taller than they are wide. They are caputerd and displayed this way hence working our best. However most of our computer screens and software can conceive image pixels to be square and this and display these 601 images as being wider overall than we would expect. This is visually confusing and causes problem when we are combining and adding square pixels on top of a non suare image. In mathematical terms this is how we derive the pixel aspect ratio for 601 NTSC video: 486 lines x 4/3 = 648 for a square-pixel image; 648/720 = 0.9 for a pixel aspect ratio after effects uses.

As long as we treat each source correctly as square or non-square and create our comps accordingly with correct pixel aspect ratio, after effects does the entire math to blend them together properly.

### Type Mask

- text layer in precomp
- background layer behind text
- click switches modes
- sleect bg layer
- create mask
- click alpha track matter on text layer

### add drop shadow

- precomp text mask
- create another bg layer
- effect > perspective > drop shadow > bevel alpha 

### Use Illustrator Shapes on Mask

- create path in illustrator
- copy path
- paste over simple mask

### Draw

- Use Illustrator to draw mask
- effect > Vegas

### Wavey Blur

- create comp
- create solid
- effects > text

New Comp

- new solid
- effect > norse > fractal noise
- effect > levels
- effect > adjustment > curves, use offset turblence & evolutions to create waves

New Comp

- repeat septs above use evolutions and offset turbulence

In comp 4

- drap 1-3 into 4
- on 1st layer, effects > blur/sharpen > compound blur
- effects > distortion map (layer 2)
- apply to layer 3