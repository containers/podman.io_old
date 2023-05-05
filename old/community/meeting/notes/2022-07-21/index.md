# Podman Community Cabal Meeting Notes 

Attendees: Matt Heon, Nalin Dahyabhai, Paul Holzinger, Karthik Elango, Charlie Doern, Lokesh Mandvekar, Niall Crowe, Dan Walsh, Valentin Rothberg, Miloslav Trmac, Mohan Bodu, Florent Benoit, Stevan Le Meur, Eduardo Santiago, Giuseppe Scrivano, Aditya Rajan, Urvashi Mohnani, Preethi Thomas, Jake Correnti, Ashley Cui

## July 21, 2022 Topics
1. Man Page Clean Up - Ed Santiago
2. An update on Podman Desktop - Stevan Le Meur && Florent Benoit
3. Possible Topics: new OCI Runtimes?  WASM for example. Also Podman support for zstd and gzip format at the same time. 

### Meeting Notes
Video [Recording](https://youtu.be/aV6RYlF9Ocs)

Meeting start 11:02 a.m. Thursday July 21, 2022

### Man Page Clean Up - (1:12 in video) - Ed Santiago

Ed has found a number of duplicate pages in the man pages.  Has considered moving them from md format to rst.  Ed is asking for help.  Does anyone want to convert to rst?  Or are there other options?

Currently there's a way to changes a small number of md to md.in files.  Can we leverage that?  Some of the interesting challenge with this is we leverage ReadTheDocs to publish the man pages automatically.  Further investigation is needed in this space.  If we can just use the md.in files and get those into the ReadTheDocs, that might be doable.  The thing that needs to be checked if the pages would disappear from the GitHub site.

So more looking needs to be done in how GitHub handles the markdown resolution.  Dan thinks we should go forward with the change.  This will allow coders to do an update in one place for an option that is used by more than one command.

### Podman Desktop Update - (11:12 in video) - Stevan Le Meur && Florent Benoit

0.0.5 Released:
- Onboarding sequence (to initialize and/or start podman machine)
- Revamp UI for containers, images
- Windows: Installation of podman + update of podman 
- Proxies for linux/macos but not yet windows (will work with Podman 4.2)
- Help page

Early Adopter Program: Accessible from [podman-desktop.io](https://podman-desktop.io/)

Stevan showed how the new search functionality is working on the desktop.  Help system allows one to contact the developers with questions.

For Windows, they are waiting for Podman v4.2 due to proxy issues on Windows.  More work underway, and looking for contributors.

They are asking users to join the early adopter program, which is linked from the top of the web page.  They especially would like to find users for the program, not just developers.

### crun Update - Dan Walsh and Giuseppe Scrivano (18:55 in video)

Latest crun [release](https://github.com/containers/crun/releases/tag/1.5), has changes for Wasmedge 0.10 support.  This is not shipped by default.  Free to try it out right now, and they're looking for users to test with.  They hope to find people to play with this functionality. This will help to enhance the oci runtimes so you could run different runtimes more easily, such as Wasm.  Possibly this could be used for Java or Javascript.  The next version of crun in Fedora will have this subpackage, but it won't be enabled.  Need to get packages for Wasm into Fedora yet.  Krun, similar to Kata containers with full KVM separataion.  It's lighter and missing features that Kata has.  Should be able to do `podman --run krun` to enable.  Lokesh and Dan talked aobut the packaging for krun and Podman.  Dan thinks we'll have a number of packages over time.  For more [information](https://github.com/containers/crun/blob/main/docs/wasm-wasi-example.md)

#### Open discussion (29:18 in video)

1.  Pushing both images on podman push.  This comes into play when you're pushing partial images.  If we move to this, which uses zstd instead of gzip, it could potentialy break Docker and other container engine compatibility.  The thought is to give users a number of conversion formats that could be used when pushing images.  This may require two images to be pushed at the same time.  Likely a containers.conf setting to select compression algorithm or to allow multiple pushes at once.  Valentin had thought that when selecting an image from a manifest or an oci index, many clients pick the first one.  So existing clients would cointinue to work.  If we want to do the cstandard search, we'd have to traverse the full list first.  Very early design discussions are going on.  He expects cost to be minimal as traversing the manifest list is much smaller than the images on the repository.  So gzip would still be in play to keep other container engines happy, but newer versions could start pushing this new zstd format.   Once we have a prototype, this will be opened up to OCI for further review.  We could then create PR's in other container engines such as Docker.  No current design document, but one will be added to the discussion section for Podman on GitHub


### Next Meeting: Thursday August 18, 2022 11:00 a.m. EDT (UTC-5)
## August 18, 2022 Topics
1. None Discussed

### Next Community Meeting: Tuesday August 2, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. None discussed

Meeting finished 11:45 a.m.

Raw Meeting Chat:

```
You11:01 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Ed Santiago11:03 AM
https://github.com/containers/podman/pull/14931
Aditya Rajan11:21 AM
https://github.com/containers/crun/releases/tag/1.5
Aditya Rajan11:31 AM
https://github.com/containers/crun/blob/main/docs/wasm-wasi-example.md
Preethi Thomas11:43 AM
lol
voluntell
```
