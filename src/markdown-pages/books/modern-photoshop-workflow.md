---
title: Modern Photoshop Workflow
date: 2024-03-30
tags:
  - design
  - photography
  - book
---

https://www.amazon.com/gp/product/0988280809/ref=sw_img_1?smid=A2TJN84D5X8027&psc=1

http://www.moderncolorworkflow.com/

https://ledet.com/margulis/ppw

http://www.moderncolorworkflow.com/free-resources

http://www.moderncolorworkflow.com/private-resources

http://www.moderncolorworkflow.com/wp-content/uploads/stuff/free/PPW_5_CC_112319.zip 

http://www.moderncolorworkflow.com/wp-content/uploads/stuff/free/PPW_5_CS6_052718.zip (later)

## Terms

Bigger Hammer: technique for durastically increasing highllight and shadow. It's an action.

Channel Blending: Mergering parts of channels to create better contrast.

Color Boost: an action that is one of the principal PPW color enhancements.

Color Mode: preserves detail on the layer below.

CR-CS5 and CR-CS6: are used to differentiate the improved camera raw  structure introduced in Photoshop CS6 from the previous versions.

Darken and Darker Color: Color modes that prohibit lightening but otherwise behave like normal mode. Darken works channel by channel, Darker Color overall.

False profile: a way of tricking Photoshop into seeing a lighter image.

H-K: an action that downplays dull colors to prevent competition with brighter ones.

H/S: the Hue/Saturation command.

HDR: high dynamic range, an amporphus term used to describe extreme color and contrast effects.

Lighten and Lighter Color modes: prevent darkening but otherwise work like normal mode. Lighten works channel by channel, Lighter Color overall.

Luminosity Mode: preserves the color on the layer below.

MMM: The Modern Man from Mars action, creates color and contrast variation. 

Multiply mode: darkens everything except where the source is pure white or black.

Overlay mode: lightens the target where the overlay is light, and darken where the overlay is dark. The power behind big hammer.

PPW: the Picture Postcard Workflow

S/H: the shadow/highlights command.

SWAG: scientific wild ass guess.

Soft Light Mode: is a relative of overlay, used in the Bigger Hammer when shadows are the main target.

USM: Unsharp mask.

## Picture Postcard Workflow (PPW) Overview

### 1. Mandatory Step: Check for and Correct Color Defects

- Apply curves on an adjustment layer and set mode to color
- Save a copy, it may come in handy later

### 2. Mandatory Step: Better Contrast

- Replace a channel with a better one if needed.
- Or make a hybrid
- Set layer to luminosity
- Don't worry about wild colors
- Add contrast enhancing curve to a channel if needed

### 3. Optional: Shadow/Highlights

- Image: Apply Shadow/Highlights as default settings.

### 4. Optional: The Bigger Hammer

- Least commonly used option
- Adds complexity

### 5. Optional: Bringing Two Halves Together

- Apply for photos shot with mixed light

### 6. Optional: Alteration of Neutrals to Emphasize Brighter Colors 

- Scenes look more three-dimensional if relatively neurtral colors are darker
- It may pay to make near neutrals grayer

### 7a. Mandatory Step: The Modern Man from Mars

- Brillant color requires variation
- 

### 7b. Mandatory Step: Color Boost

- Go overboard on color and tone it down later
- 

### 8. My Method or Yours?

- The sharpen action.
- 

### 9. The Insurrance Policy

- Compare results to earlier saved conservative version

## Lessons In Color Perception

[First Draft of Chapter Swan Detail](./modern-photoshop-workflow/PCC-Ch02-swan_fragment%20030713.pdf)

1. The last thing you looked at can warp your judgment. This is the reason step 1 suggests saving a color corrected copy for comparison before making agressive changes. In the example the original was color correct and serves as the comparison. It's also noted that known colors impact judgement. e.g. white lines on streets are white and blue jeans are correct blues. The audience reacted negatively.
1. One bad apple can spoil the bunch. Deciding on how to reduce color makes the difference. This is a matter of taste and creativity. In the example the readers picked up on the blue tinge to the swan and overly green lake. The preferred example has yellows and greens in the lake and a white swan. This is to focus on step 1.
1. The first color step can be ignored some of the time, but if you ignore it most of the time a quarter of the images will be bad. To identify neutrals look at numbers. If the red, green and blue are mostly equal it's a neutral. It's better to do multiple versions quickly and combine the good parts than spend a lot of time on one image. Things to look for: better color?, better detail?, better in lighter or darker areas?, better in light or dark areas, but only in respect to color or detail?, better in certain colors but not others?, be better period.
1. Every correct image has certain strengths or weaknesses. Making extra copies and combining them can increase quality. 
1. When deciding if something is neutral, don't trust your gut, trust the numbers. 

## 1. Once for Color, Early Detective Steps

This is the step 1 of the workflow. Most images need nothing. The goal is to find and fix wrong colors and ignore all other issues. This is because the later steps will exagerate wrong colors and need to be toned down, but not changed.

### Settings

- Make sure dropper preferences are 3x3 instead of point sample
- Set the default right side of the info pallate to LAB instead of CMYK


### Shortcut that is not as good (alt)

1. make a duplicate layer
1. Image: Adjustments > Curves
1. Click the middle eye dropper
1. Click a light neutral area e.g. clouds
1. Click OK
1. Change the top layer mode to color
1. Lower opacity until things blend right. maybe 50-60%

### Corrections

Formulas for skies: ignore L, B can be ignored unless too positive. A should be between (5)<sup>A</sup> and (3)<sup>A</sup>

Very light clouds are white, as they get darker they get blue, they should have a B close to 0 or be negative.

Vegetation/greenery: A should be negative and B should be positive. B should be 1.5 - 2.5 times further from 0 than A. (non-conserative 1.2-3.0) e.g. (10)<sup>A</sup> should have a B between 15<sup>B</sup> and 25<sup>B</sup>.

Warm light is preferred. Like Sun. Where the light hits a neutral may be warmer. Shadows tend to be cooler but humans don't like cool casts.

Shift + Command + Click will put points on all three curves when the curves dialog is open. The one launched from PPW, not the adjustment layer one.

### Identifying the lightest significant point

This is important for contrast, not during the color correct step. This is a good time to analyze. Significant is the operative word, you don't want to loose detail in important parts. If an area is already blown out that is lightest.

If you have trouble identifying the lightest point add a threshold adjustment layer. Set opacity to 50% and adjust the slider until you find the light points. Set your sample point and trash the layer. 

The lightest point doesn't have to be the literal lightest point. It should be the lightest point you care about.

### Evaluating Color

Known neutrals should shoot for 0<sup>A</sup> 0<sup>B</sup>. If there is warm light it may be slightly warm.

Faces: skin is always red -- positive A and B. B is usually higher. Some children and caucasian adults have higher A. As a rule too high of A should raise suspicion of being too purple. The author ignores active faces because they could be more red.

Greenery: should have negative A, positive B. The B is almost always further away from 0 than A. If the B is less than 1.5 times further than A, that suggests too blue. If more than 2.5 times that suggests yellow.

Skies: blue. Negtive B. No rules on how negative. The A should be near zero. If not, it's like more negative (greener or cyan) than positive (purple). Values lower than (5)<sup>A</sup> suggest excessive greeness, values 3<sup>A</sup> suggest the image is too purple. 

### Steps

1. Evaluate for color, look for known neutrals and casts. If no known neutrals look for the key things that are known such as skies, faces, etc. Watch out for lighting warmth vs. cool shadows.
1. Set controls points. Up to four. Have a pattern for setting control points, such as lightest to darkest. If you can't find the lightest significant point (neutral), use threshold and set that point.
1. Add curves and adjust. The goal is no wrong colors, ignoring contrast and better color. Setting to the max of four points is hard. Focus on the lightest and see where the others land. If you get frustrated try the shortcut to start.
1. Set the layer mode to color. Ignore the tempation to choose the enhanced contrast, that will come in later steps.

### Gray Cards 

Photographers use them to place in the scene near the object. Later a curve is built from the gray card and replayed on other images.

This can help when there are no known neutrals. It can be a detriment when you have known neutrals in the subject.

The techniques for color correction can work better without a gray card too.

### Perceptions

Ideal goal is to make the image look like how a human would perceive it. This is hard.

- Humans break colors apart more than cameras. This is the law of simultaneous contrast. We perceive more variation than the camera does in forests, faces, and other areas of a large single color. The desire for variation is an arugument for LAB.
- We adjust immediately to unbalanced lighting that's violent enough to provoke a color cast. For example a yellow cast at a hockey rink with white uniforms, in person we adjust. The image has a yellow cast. This is chromatic adaptation.
- We are less disturbed by conditions that are too light or too dark than the camera. We have to darken photographs taken in strong sunlight and lighten photographs taken in low light.
- The human visual system will adjust to many lighting conditions. We adapt to conditions with strong and low light. The camera will not. It's important to adjust images that have multiple casts.  

### Adjustments to Workflow

Typically step 1 is color only and 2 is contrast only. In an image where it makes sense to transpose these steps that can be easier.

## 2. Once for Contrast, a Whole Exceeds the Sum of It's Parts

The goal is to adjust contrast, i.e. finding better blacks and whites. Color is ignored. Luminosity mode is used. Command + 2 all channels, Command + 3 will target the 1st channel, Command + 4 the second, etc.

Blending: Using Image: Apply Image is most flexible. 

### Apply Image

- Apply Image only works with images that have same pixel sizes.
- They must have the same bit depth
- Can be used to merge images
- Targets the current active layer
- It targets the active channels and any channel, including alpha can be a source or a merged version. 
- There are many blend modes as well. 
- There is no constraint on the colorspace
- You can apply image from one mode to another. Example C from CMYK on RGB duplicate layer and set blend mode to darken and layer mode to luminosity and tune down opacity. This made the sky more dramatic.
- Using copy/past would have you select the color space to be ignored or applied

e.g. Removing Blue Screen from model and motorcycle with blue screen

1. Duplicate image
1. Set duplicate image to LAB and leave original in RGB
1. B channel has most contrast. Select it.
1. Edit: Fill with 50% gray in darken mode, 100% opacity.
1. Apply auto levels to the B channel, becomes a black and white mask
1. In the RGB image add a layer mask to the original
1. Click on the mask, apply image, from LAB version, modified B channel in darken mode at 100% opacity.
1. Refine the layer mask using Image: Apply Image, select original file, layer 0 (original layer), channel is layer mask, overlay blend mode, 100% opacity. 
1. To clean up mask, select brush tool, white color in overlay mode and paint the white areas. 
1. You will have to take care of blue reflections

### Image: Calculations

- Doesn't work on existing channels
- Select two sources and blend modes
- Very similar to apply image

### Evaluating

- Use the channels pallete to evaluate the contrast of each channel. 
- Channels should always be evaluated in grayscale, there is a setting that someone may have that shows them in color. Photoshop: Perferences > Interface, uncheck 'show channels in color'
- Preference to blend first if the image is fairly good, curve first if flat. Either order works.

### Curves

The idea is to make a steeper curve for more contrast without blowing out highlights and shadows. If a channel is good but could be better you can apply an s curve to steepen the channel.

### Steps

1. Use a duplicate layer
1. Select the active layer to work on  (duplicate)
1. Select the active channels to target. e.g. all of them to apply to all layers
1. Select the source (doesn't matter here, the dupe is the same as bottom), source channel to apply. e.g. red to apply to all three channels. 
1. Set mode to normal at 100% opacity
1. Adjust mode to luminosity mode
1. You can repeat these steps for other channel blends to find the best one.

### Guidelines

- Compare the red and blue channels. (These are more important, usually red for landscape) Some kind of blend will suggest itself. Often the blend is in darken mode, especially if it's blue into red.
- If you have blended the blue into red, look to curving to increase contrast. If the other way around don't bother, the blue won't have enough impact.
- The green channel is usually the flatest and responds well to curving.
- The author usually blends first and curves afterward. You can reverse the order. You can also do second rounds as necessary.
- A lighter color requires a very light channel somewhere. If the picture has several light colors it may be hard to do anything. 
- You don't have to achieve perfection or even shadow/highlight, later steps will help.
- The process starts slow and gets fast with practice.
- Be wary of yellow when blending blue. Yellow is light color but dark in blue.
- Blending in green is usually avoided. Camera manufactuers devote more sensors to green and blending red or blue into green can increase graininess.
- An orange cast can create the illusion of sunlight. Redder casts add warmth.
- Green casts are univerally hated. They make images look sick.

### Step by Step for the Flower Image

e.g. a picture of red/pink hibiscus and green background. The red channel blend didn't provide or other channels.

1. Check for color, apply step 1 if needed.
1. Duplicate the layer, evaluate the channels and decide on a strategy
1. The green will respond well to a curve. The red will not with out blowing out the flowers. Blend the blue into the red. A curve that returns the flower to near white will increase the contrast.
1. Active red channel and Image: Apply Image
1. Layer is irrelevant. Channel source: Blue, Blending: normal, opacity: 70%. 70% is a SWAG (scientific wild ass guess), if to little the process can be repeated, if too much you can start with the original red
1. With the modified red channel still active, Image: Adjustements: Curves. Sweep the highlight part toward the center until the lightest part of the flowers blows out. 
1. Activate the green channel and apply the curve.
1. Change layer to luminosity and compare to original.
1. The flowers are too light. Activate the red channel on the top layer. Image: Apply Image, layer: background, channel: green, blending: darken, opacity: 30%. This is usually done in normal mode for easier comparisions before setting to luminosity. Darken mode doesn't permit pixels to get lighter but works like normal mode.
1. Continue to next steps in the workflow

### The Case for Channel Blending

- When one channel is clearly better than others. Or one channel lacks and the other two do not. When one channel is better than two, apply to the composite RGB image.
- As a defense against later damage from a curve. In red/orange objects the red channel is so light it will get blown out. A common counter measure is to apply some of the blue at a low opacity in darken mode. This is because blue is likely darkest.
- To simulate a durastic change in lighting. This is when an image clearly has two halves. The goal is two bring the two halves of the image closer together.

### Fixing Two Halves

1. Correct for color
1. Duplicate the layer
1. Apply Image to all channels, use the layer with the detail to preserve. Use normal with an opacity that makes sense. e.g. Blue at 55% for gators with a dark swamp. The opacity was chosen by viewing the changes on the green channel, targeting all channels with the blue source. This let the author see when the halves come together.
1. Find the lightest significant point with threshold.

### Repeated Blending - The Fourth Channel

RGB composite when applied is grayscale.

e.g. A violently red flower lacking detail. The red channel is blown.

1. Duplicate layer
1. Replace red channel with the RGB grayscale and apply a curve to enhance contrast
1. Duplicate layer
1. Apply the new RGB grayscale to the green channel at 35%
1. Duplicate layer
1. Replace the red channel with new RGB grayscale, apply curve to red to boost contrast
1. Change top layer to luminosity
1. If too much red, duplicate top luminosity layer and change mode to color and drop opacity low, 15% used.
1. Now you can convert the image to CMYK or LAB without flattening and see if color is better.

### Choices for a Blown Green Channel

e.g. very green lake picture, green channel is flat and very important

- A curve similar to before on the green channel, drag light half in to blow out highlight and curve three quarter tone
- Applying the blue channel to the green at less than 100% opacity
- Replacing the green with either the graysacle RGB or L channel followed by a curve.
- multiplying the bogus black (CMYK) into green

Author used a black of CMYK version curved beyond print. Why this works. CMY are close cousins of RGB, part of the CMY are subtracted to build the Black channel. Normally we keep it in reason for print. For these purposed we can go further. It's heaviest in neutral areas and non-exisitent in colorful areas. The 'bogus' black is created by screening three RGB channels into each other.

1. Apply false CMYK to a duplicate flattened image
1. discard the CMY channels
1. Apply curve to enhance contrast, go beyond print
1. In the Original apply the false CMYK to the green channel in multiply mode at 75% opacity (depends on image)

### Final Overly Neutral Image

e.g. New York Stock Exchange, washed out, very neutral with red stripes

This step of the workflow is fruitless. Skip it. It requires too many layers and can be solved better in the next step.

## 3. Once More for Color, How Much is Too Much?

e.g. yellowish house, skies in background, overall blue cast

- step 1: remove cast
- step 2: contrast
  - skies are best in red channel, but the yellows will dissappear
  - blend red into rgb in darken mode
  - blend blue into red, darken to strengthen buildling and sky
  - straightline curves to red and green to lighten clouds
  - luminosity mode

1. Apply Color Boost Action and decide how much to cut. Just lowered opacity
1. Adjust endpoints as needed. Look at lightest cloud for highlight.
1. Sharpen 
1. Prepare for output.

### Color Boost Action

1. Window: Actions to bring up actions panel
1. Click New Action. Give it a name and click Record
1. Image: Mode > LAB mode
1. Add a curves adjustment layer and call it color boost. Adjust the A/B channel curves. These are straightline, about 3-1/3 small grid lines in on A and 3 on B. For A this is 33 and 66%, for B 30 and 70.
1. Change layer opacity to 75%.
1. Add a second curves adjustment layer and name it endpoint adjustment. Click ok so it does nothing.
1. Make the color boost layer the active layer
1. Click stop recording and your done

**NOTE**: In the LAB workflow book the author recommended equal straighline curves. In this modern workflow he recommends a steeper A: 33, 66 vs. B: 30, 70. 

As a general rule bolder/brighter colors will intensify faster thn duller colors. If that is not the preference for the image simply lowering opacity won't work and you can use techniques to adjust.

**NOTE**: The defaults work for MOST images, stronger A than B. If you option click the action a panel comes up with options to set defaults and to choose A>B, A=B, or B>A. 

### Adjusting the Blend With a Mask

e.g. a field with elk, very yellow field, the elk need more color

- Adjust the endpoint layer first if needed. The lightness is brought to 33%
- Activate the color boost layer mask
- Image: Adjustments > Invert to fill the mask black
- Set foreground color to white
- Activate paint brush, soft brush and a good size, normal mode, 100% opacity
- Quickly paint the two animals, the author deliberately added background behind the front female almost as big as her
- Lighten the layer mask, adjust curves while the mask is active. e.g. drop top right 4 small grids down, 60%. The mask becomes gray and white blending the layers. Alternatively use the denisty adjustment from the adjustment layer panel.
- reduce opacity of layer to taste. e.g. 53%

This workflow bypassed the first two steps of PPW, making it about 1 min, applying MMM + CB would yeild better results nearly as fast.

### Blending Adjustments

- Author says straight opacity is about 30% of the time.
- Typically he recommends using the L channel as a layer mask and adjust to taste.
- Masking is a last resort

### Using the L Channel as a Mask

- Apply color boost
- Active mask of color boost layer
- Image: Apply Image, L channel
- adjust opacity to taste, may have to go up
- adjust endpoints layer

### When CMYK is the Destination

- Trying to push color out of gamut won't help. To view CMYK use View: Proof Colors, it's not perfect but close. Reduce color to in gamut for CMYK
- Colors are out of CMYK gamut in three ways primarily: brillant blues are impossible, pastels (very light pure colors) can't be duplicated unless the paper is brillant white, and vivid colors that are also dark can't be achieved.
- CMYK has the advantage for shadow detail. Adjust that in the black. 

### Shape of The Layer Mask Curve

- **Lightening the Midpoint:** makes a vivid picture but most of the color is added to the midrange. It's not the same look as increasing layer opacity.
- **Lightening the Quartertone Point:** is a quandry, it will either work really good or really bad. 
- **Moving the Highlight:** toward center, retaining a straight line, favors the lightest colors because they fall in a steeper part of the curve. Everything will gain contrast but the lighter parts will gain more.
- **Lightening the Shadow:** by moving the dark endpoint vertically, thus retaining straightlines, favors the darkest colors.
- **Moving both Highlight and Shadow:** to retain the same angle while moving towards lightness creates almost the same effect as lowering opacity.

When retouching the most appropiate curve looks like an 'S', when changing for color it looks like a 'U'.

### Using Blend If

- If you need the change to affect only part of the image, e.g. blue sky in mostly yellow picture
- If the isolation could be on either layer, use the more colorful of the two

How to find what affects?

1. Create an invert color adjustment layer above the color boost layer. The image turns into a negative.
1. Create a clipping mask on the invert adjustment layer. The parts affected by blend if turn gray.
1. When you move the blend if slider on this layer, the excluded parts look normal. If underlying layer, the opposite will happen.
1. When done delete the invert layer

### Color Boosting When the Image is Flat

e.g. a thermal pond, the water should be very blue, too much yellow competes, steam offuscates the blues. Standard practice make colors wild, the L can't be a mask. The off colors are seen when the color boost is 100% opacity. The yellows are too vivid and the split between blue/yellow is mangled.

Solution: use the B channel, the channel is too flat, needs to be inverted (mask yellow, not blue), and B is noisy, so it will need blurring.

1. Apply B to mask inverted.
1. Add a curve to the mask to add contrast to blues
1. blur with surface blur
1. Color Boost layer is at 100% opacity

Better, need more options.

1. Duplicate color boost with mask
1. Second layer is at 35% opacity

Steam needs to be more neutral.

1. On the second layer, apply the inverted L in darken mode at 100% opacity
1. Both color boosts were 100% opacity and color excessive.
1. Turn off original layer
1. Duplicate 2nd color boost
1. Set one to 100% opacity and 1 to 65%

### Rules of Color Boost

e.g. greenish river in yellowstone, the glacier melt produces more green and unusual colors

- If the color is unusual boost it
- It the color is disaggreeable try not to strenghten it

Attempt 1:

1. Adjust luminosity, applied red to RGB 
1. Applied color boost
1. Applied inverted A to mask of color boost, normal 100%
1. Blur mask, surface
1. Enhance contrast, Image: Auto Tone
1. apply inverted u curve to mask

Attempt 2:

1. Skip color correction step
1. On a duplicate layer apply red to blue
1. Adjust the midtone of the green to be lighter for more detail
1. Apply false profile with blurred mask multiplied (ch 11)
1. Apply updated MMM action

## The Modern Man from Mars

The action is about 60 steps. It's preferred to combine with CB but having them separate can help learning.

- Select an area of importance in the picture, or multiple, you can also feather
- Play the action
- Adjust the color and luminosity layers to taste or remove either if needed

### How Often

The MMM + CB is used in nearly image. 1/3 of the time the author junks the MMM luminosity layer. About 1/3 of the time the author junks the MMM color layer or severely lowers opacity.

### FAQS

- What images benefit most?
  - Images with large significant ares of little color variation
  - Shots dominated by a single color
  - Faces if large enough

- What does this action do?
  - Evaluates the selection for how to apply
  - Discards the selection and applies to the whole image

- What problems can this cause?
  - Loss of detail in areas not matching the selection
  - Vibrant shifted colors in places you don't want them

- Why did light clouds not change?
  - The orginal action would have made them purple
  - The updated version masks out near neutrals to avoid shifting neutrals
  - Humans won't accept color shift of known neutrals and that limited the utility of the original action.
  - 

  ### Selections

  - Any selection can work
  - A better selection includes large areas of focus to balance color
  - select all can work 

  ### Histograms

  The author hates them, and doesn't show them. There is an equalize command that spreads pixels lightness equally. Usually with worse results. If you select before running you get other options.

  MMM takes the selection and equalize approach but applies smartly.

  ### MMM Action Steps

  - Convert to LAB color and flatten
  - On a duplicate layer, apply Equalize to each channel. Choose use the selection as a base and apply to the whole channel
  - Immediately after each one apply fade. A is faded less than B.
  - Name the layer MMM Color and change the mode to color mode at a low opacity (30%)
  - Duplicate the MMM color, rename it and change mode to luminosity
  - Group the two layers
  - Add a mask to the MMM luminosity to avoid damaging highlight and shadows when the action increases tonal range
  - Add a mask the MMM color layer to minimize change to near neutrals. 

  ### Note on Faces

  Three categories to avoid with MMM
  
  1. fleshtones that are beet-red
  2. green-haired blonds
  3. contrast that ages the skin

- #3 is easily avoided by dropping the MMM luminosity layer.
- Color can be handled by not overdoing initial corrections, i.e. removing too much pink
- Selecting all colors of fleshtones
- Blending the green channel at a lower opacity and adjusting curves
- Apply shadow/highlights commands
- sharpening

### Advanced Uses

Option + Click the MMM + CB will provide more options, including adding a saturation layer to dull the effects. 

## Shadows/Highlights

In graphic design images are divided into five tones. Highlight, quartertone, midtone, three-quartertone and shadow.

Shadow is referring to the darkest parts.
Highlights is referring to the lightest parts.

This is the optional step between luminosity and color steps.

Is it needed?

- No. It's unimportant, possibly counter productive.
- Yes. It would be nice to add to one of these zones.
- Yes. It is absolutely critical to inject more detail into at least one of these two zones.

If it's option 1 skip it. If 2 or 3 continue.

### Settings Change

Image: Adjustments > Shadows/Highlights

Open advanced options, enter the following settings and save as defaults.

- Shadows - amount: 18%, tonal width: 25%, radius: 30px
- Highlights - amount: 9%, tonal width: 25%, radius: 30px
- Adjustments - Color Correction: +20, Midtone Contrast: 0, Black Clip: 0.01%, White Clip: 0.01%

PPW should have these defaults set.

## Creative Uses

- Use Hue instead of color for a lighter color touch
- option + click and experiemnt with selections

### When to Apply