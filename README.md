## twitter-large-images
Chrome extension to use large versions of images in Twitter timelines.

#### Twitter Timeline Images
Twitter stores images in two sizes:
- Normal size: up to 600x1200 in size
- Large size: up to 1024x2048 in size

If someone uploads a larger image it is shrunk to fit these sizes. When you view or save
an image, Twitter will often use the smaller size. So for people who want to download or 
view the larger images this Chrome extension uses the large version always.

#### Usage
The extension runs automatically. You can toggle it on and off by clicking its icon at the
right of the address bar.

There are two ways to see the larger images:
* Drag and drop an image directly from timeline to a folder or the desktop (recommended)
* Right-click the image and select one of the "image" options, such as "Save image as..."

A problem with the 2nd option is that Twitter changes the filenames of large images to
something like *Image.jpg:large*. This means that files are often saved with a
*.jpg-large* extension and you must rename to *.jpg*. Unfortunately this is difficult
to fix in an extension.
However, this problem does not affect drag-and-drop, nor the "Copy image" option, so use
those methods.

#### Performance
When the extension is first run, or when you toggle it, any open Twitter pages will be
refreshed when you next view them. These refreshes are a bit slower than normal because it
must clear the cache. However, after that Twitter will run normally. Of course you will be
looking at larger images, so there will be more data downloaded.

#### Issues
Links to twitter images from outside of twitter are also redirected but in rare cases you
may need to refresh manually.

*This was done as a personal project, so there may be other issues, please report them.*
