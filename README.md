## Twitter Large Images
[Chrome extension to get the large versions of images posted on Twitter.](https://chrome.google.com/webstore/detail/twitter-large-images/jajkeadlaiibpkpnnihopfalndpfioag?hl=en)


#### Twitter Timeline Images
Twitter stores images at two sizes:
- Normal size: up to 600x1200 in size
- Large size: up to 1024x2048 in size
Large images are scaled down to fit.

When you save an image from Twitter, sometimes you get the normal size even if Twitter has
a larger version. This can happen on your home timeline, on lists and on tweets with
multiple images. This extension makes sure you always get the largest available versions
of images.

Note: this extension does not scale the images, but gets larger originals if they exist.
It will do nothing in cases where Twitter already gives your the larger size (usually when
you read someone else's account). 

#### Usage
The extension runs automatically. You can toggle it on and off by clicking its icon at the
right of the address bar.

There are two ways to see the larger images:
* Drag and drop an image directly from timeline to a folder or the desktop (recommended)
* Right-click the image and select one of the "image" options, such as "Save image as..."

A problem with the second option is that Twitter changes the filenames of large images to
something like *Image.jpg:large*. This means that files are often saved with a
*.jpg-large* extension and you must rename to *.jpg*. Unfortunately this is difficult
to fix in an extension.
However, this problem does not affect drag-and-drop, nor the "Copy image" right-click menu
option, so use those methods.

#### Performance
When the extension is first run, or when you toggle it, any open Twitter pages will be
refreshed when you next view them. These refreshes are a bit slower than normal because it
must clear the cache. However, after that Twitter will run normally. Of course you will be
looking at larger images, so more data will be downloaded.

#### Issues
Links to twitter images from outside of twitter are also redirected but in rare cases you
may need to refresh manually.

*This was done as a personal project, so there may be other issues, please report them.*
