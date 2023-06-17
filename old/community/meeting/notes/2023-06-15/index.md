# Podman Community Cabal Meeting Notes 


## Attendees: 
Ashley Cui, Chetan Giradkar, Christopher Evich, Daniel Walsh, Ed Santiago Munoz, Gerry Seidman, Gerry Seidman's Presentation, Giuseppe Scrivano, Jake Correnti, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Preethi Thomas, Tom Sweeney, Tom Sweeney's Presentation, Urvashi Mohnani, Valentin Rothberg

## June 15, 2023 Topics

1. Additional Layer Storage (ALS) - Gerry Seidman
2. ipfs integration into Podman - Anders Björklund to kick off  

### Meeting Notes
Video [Recording](https://youtu.be/GYrFHoYtXDA)

Meeting start 11:02 a.m. Thursday, June 15, 2023

###  Additional Layer Storage (ALS) (0:57 in the video) - Gerry Seidman

[Slides](./AuriStor-ACA-PodmanCabal.pdf) 

What is AuriStorFS
Framing the Problem ACA Solves
Additional Image Store AIS
Alternate Layer Storage ALS
The AuriStor Container Accelerator ACA

#### AuriStorFS - The cloud file system for the 21st century
    Global Namespace
    Access Transparent
    Secure
    Cache Consistency
    Platform Independent
    AFS Volumes as Policy Containers
    High Availability
    Works Well over WAN as well as LAN
    Boundless Scalability
    Hybrid/Multi-Cloud
   
Works with Fedora 31 and higher

    ls /afs
    dnf install -y -q kafs-client
    systemctl start afs.mount
    ls /afs/cern.ch
   
Platform independent

Volume are rooted directories

Examples of Volumes
    Read Only - Machine Learning, Application Binaries, Configuration files, Static Web Content
    Read/Write - Business Documents, User Home Directories, Logs
   
Volumes are the units of Management and Policy
    AFS Volumes are named
    Special volume named root.cell
    Volume Directories can link to other volumes
   
Mounting Volumes to Local File System
    Direct Mount
        • mount --bind /afs/.@mount /<cell-name>/<vol-name>
        • ln –s /afs/.@mount/<cell-name>/<vol-name>
    Dynamic Mounting
        AFS Client side "Dynamic Root"
   
Every Volume is really an Object Store
Local Cache Consistency
   
#### Containers as Software Deployment
    Container has root file system, and you can push/pull the image.
   
Costs of pulling a container image
    Clock Time
    Network bandwidth
    CPU and I/O time spent
    Disk space
   
Large Container Images are not uncommon
    Pyton is 1GB
    Gerry has seen 40GB sized custom made.

Large Containers can add up, and you can have many on a machine.
   
#### Container Storage
    Configuration File
        /home/gerry/.config/containers/storage.conf
    Working directory
        /home/gerry/.local/share/containers

Podman Pull - object from container registry

Layer files are found under 'overlay'
   
Running a container adds the R/W layer
   
#### Additional Image Storage (AIS)

Allows multiple ./storage instances
    Images are pulled into specified ./storage
    At runtime, Images are search across AIS sequentially
    Can be share across users and machines
   
    You can list images from multiple image stores
   
#### Additional Layers Storage (ALS)

Stargz (Seekable Tar GZ)
    Attempt to solve the slow container start time
    Seekable allows lazy download of required image chunks
    Requires Augmented OCI Image
   
Alternate Layer Sstorage (ALS)
    Provides Alternate sources for Layer content (Stargz, IPFS, AuriStorFS)
    Intercepts Layer Pull/Expand
   
ALS Fuse Driver Plugin
    For Layers it support the FUSE plugin will service paths in the form
        <ALS ROOT>/<base64 Image Reference>/<Layer Digest>
           
Podman pull with ALS
    The image size was reduced by quite a lot.
           
This is deployed by Podman, but is experimental.  Gerry would like to get it promoted.
           
#### AuriStor Container Accelerator (ACA)
    ACA Root satisified ALS Path 'Services'
    Auristor ACA finds AuriStor Volume
    ACA Layer Volume Generator Service
           
#### Qustions
    Can AFS volumes store extended attributes (i.e Selinux labels)?  Not yet, but in a near future version.
           
    Are access controlled on the server or on the client?  Yes, in a number of places, being refined and needs improvement.
       
    ALS requires a huge file system, is it opensource?  Depends on which you choose.
           
    Is there a tool that creates the additional layer stores?  Yes.  
           
    Whay ALS instead of AIS.  The dynamic nature of ALS.  He would have to try and figure out AIS mapping.  
           
    In the past others have said latency is a problem with AIS.


### ipfs integration into Podman - Anders Björklund

Not discussed due to time and Anders not being able to attend.

### Open discussion (54:45 in the video)
1.  Podman v4.6 Release Update 
 
### Next Meeting: Thursday, July 20, 2023, 11:00 a.m. EDT (UTC-5)

## Possible Topics
 ipfs integration into Podman - Anders Björklund to kick off
Podman v4.7 and beyond update


### Next Community Meeting: Tuesday, August 1, 2023, 11:00 a.m. EDT (UTC-5)

### Possible Topics:
None Discussed

Meeting finished 12:02 p.m.

Raw Meeting Chat:

```
Gerry Seidman11:02 AM
https://drive.google.com/file/d/1OjaARJayC-9Z3dQ0HdubWiyyzL3XFVcY/view?usp=sharing
You11:03 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Chetan Giradkar11:03 AM
it requires access
You11:04 AM
Gerry you';re muted.
You11:06 AM
Questions in the chat please, Gerry can't hear.
Daniel Walsh11:09 AM
:^(
Christopher Evich11:12 AM
Can AFS volumes store extended-attributes (i.e. SELinux labels)?
You11:16 AM
I'll try to get him for questions at the end
Daniel Walsh11:20 AM
Are access controlled on the server or on the client? Enforcement of who is allowed to chown.
You11:28 AM
For those joining, Gerry can not hear us.
Nalin Dahyabhai11:45 AM
are your speakers muted?
ieq-pxhy-jbh
```

Raw Google Meet Transcript
```
Tom Sweeney: Wanting everybody today is Thursday June 15th, 2023. This is the Podman Community Cabal meeting. We'll be talking today about additional layer storage and we have Gerry's. I'm going to mess up your name. Jerry, is it Seidman?
Gerry Seidman: But I've been seidman. Yep.
Tom Sweeney: Seidman, And then after that we've got to talk that's kind of a generic talk. For Ipfs integration into Pod, Anders was going to delete at least take that off. I don't see offers. Yeah, so we'll see. And I know Dan had wanted to talk about that as well. And so I have hack MD set up where I'll be taking the notes today. If you have links or anything that you want to add to it or if you find that I've just described something in the notes, feel free to go ahead and change those as you see fit. And with all that, I'm gonna hand it over to Gerry's. Thanks for coming today. I'm not sure.
Gerry Seidman: somebody could just check the fact that works that Could be my presentation's life. if not, …
Daniel Walsh: He?
Gerry Seidman: because some people like to follow along and as PDF, I could have put them there. That's a good point. Right.
Gerry Seidman: Nobody's going to confirm or deny.
Tom Sweeney: While I was muted, which was very helpful. It's no like not.
Gerry Seidman: Did you get it?
Tom Sweeney: It says I need access. Question.
Gerry Seidman: All right, hold on. Anyone with the link? Not let me do it again.
Daniel Walsh: and I was now we said, Yep.
Gerry Seidman: Got it. Excellent because you don't make it easier for everybody because I'm going to talk fast. I'm from New York and I have too many flights. so hi. I'm Gerry Seidman. I'm president or a store which is a company that has a security distributed file system. I'm going to talk about our core product and also going to talk about what we're doing the container space or doing for accelerating.
Tom Sweeney: Who's Gerry now?
Ed Santiago Munoz: Very immuted.
Daniel Walsh: Gerrymuted.
Daniel Walsh: I see infinity.
Gerry Seidman: All right. Can somebody now say, Yes Gerry. I fear flies and I hear you
Daniel Walsh: Yes Gerry. I see your slides and…
Tom Sweeney: Yes.
Daniel Walsh: I hear you.
Gerry Seidman: Nobody. You.
Daniel Walsh: Yes.
Tom Sweeney: we can hear you.
Gerry Seidman: Can you hear me? So I can't hear you for some reasons, but that's okay. If you have any questions. I'll jump out.
Gerry Seidman: I've got it. All right, so I'm gonna go very quickly through a lot of topics. What I'm going to talk about what is Orest or FS. I'm gonna fake frame, the problem that
Gerry Seidman: The ores will container Accelerator solves. I'm going to very very quickly talk about container storage internals which most of you should know better than me. I'm gonna talk about additional image or which Dan certainly knows better than me. Then I'm gonna talk about additional layer stores, that's a typo,…
Tom Sweeney: Technology.
Gerry Seidman: It should be additional layer Stores, storage, and then finally, I'm going to talk about the order here accelerator Actually, I'm going to be talking about that interest first with a bunch of other stuff and specific to it. So our surprise the cloud process for the 21st century that's actually a joke because the orchestra file system has its roots in the Andrew file system, which predates NFS it was designed.
Gerry Seidman: Very presciently. but the reason or what our stores initial funding came from the Department of Energy and we got an SDAR to create a 21st Century Cloud file system that extends upon the AFS vision. so that's the joke in that. but it was designed to do a lot of things store on extends very much beyond what the open source AFS does and certainly what anybody who's AFS a long time ago, might
00:05:00
Gerry Seidman: Remember but here's the kind of the high level points and I'm going to drill into some of them, A true global namespace on that actually can span organizations not just clouds access transparent. It's just a processing files again for definition. In this case, I'm talking about the part of the file system, Not block storage. it's highly secure. I'm not going to go into the security model at all, into the catch consistency model. What that means is that, There is a local cash on that, on the machine, on each client. And if something changes in the server, it's the server's responsibility to inform the client, which means to do polling because it's done properly. Little version has the things like that. The cash actually survives a regal.
Gerry Seidman: if platform independent, the clients were on pretty much everything. I'm going to talk more about I'm going to talk about evidence, volume separately, high availability works well over the win as well as the land boundless scalability and like I said, hybrid multicloud by default. I'm just focus for a minute on these because they're just what I mean by a global namespace is if you just take a fresh install of the Dora and anything over for 31, There's a bug answer 38. But if you do a fresh install you LS slash AFS there's nothing there you install the cast client, there's an upstream when it's client that's in the main clean line, as well as in many distributions like we're going to not yet in route but we have a fine version if you're running around.
Gerry Seidman: 9.2 Ask reach out to me and I can give you this client. you just start the afs.mount service. And then if you're running there's a bug integer at 38 where you have to stand in first, permissive you don't into door up 37 and you won't or 39 and hopefully not much longer 38.
Gerry Seidman: And then just believe you're an astrophysicist or a high energy businesses and just look at files concern, LS slash AFS last cern.ch and lo and behold it works. Zero client configuration global management. Access transparent. It just looks like a file. So I'm going to just add a file from Cerns Atlas Project. Let's go from their aspected and it just work and as I said, it's platform, independent, on the one side of windows and the other side of women. I'm going to focus on the parts that are salient for ALS, the cash consistency model and the answer findings of policy containers really more than about the air that's fine in AFS again,…
Tom Sweeney: He?
Gerry Seidman: volume is highly overloaded term in AFS and abiding. It's just a rooted directory of, files And it can have, files and sim links and directories etc. an example of a volume rewrite volumes would be, for example, painting data, machine learning training that a lot models data sets application binaries, configuration files, static Web content for write, your home, directory Scratch, space log but some specific project etc.
Gerry Seidman: Volumes are the unit of management and It's the thing, you put policy upon things like quota replicas. So for example, if that's where I want high availability, I might serve it up on three fosterers in New York in Shanghai One in London. It's still globally accessible, but your client will find a closest one to get you the best performance. maximal access controls, the security thing things that you can do things like this data. Can't be the US. It's got a lot of cool stuff, but an AFS volume and the AF unit of management is called Estelle and cells have volumes in them and volumes have human readable names. so for example I could have a volume called Language Model DOT training DASH data.
Gerry Seidman: so that would be where I would put it. I didn't say that access it yet and there's also a special volume with the name Root that again there's volumes. I don't know why I have a separate. you miss, what I'm showing is that within an FS volume, you can link to another amp as volume as if you triangle are for
00:10:00
Gerry Seidman: Yeah, the triangles are showing, you can actually have hard links, you've actually have hard links as well as SIM links within a volume. You can't do hard length. but you can do mount points of the volumes. so how are you access it in? actually gave you This is the syntax not for cast but for our proprietary client but anybody can reach out, tell you how to do it or look up online. Mount Slash cell volume name gets you to a volume. That just works. There's also a dynamic route, /, By default. It could be anything else in your system. it doesn't have a lot of our banking customers, have it.
Gerry Seidman: Only locally accessible on and that's how the global names So I'll get back to that with an example. But for example, somewhere on my file system, I might want to have my, chat ABC language training data. I want to mount it there. So I just say I could do L / blah blah…
Tom Sweeney: it's
Gerry Seidman: because slash that out. / myog.com, Bush language, training directly gets me to the root of that volume. So if I link it to be there, I now have it anywhere my file system. again, that's the syntax of here, but one of the cool things is dynamic, zero, configuration Global namespace. So there is that I mentioned in passing, a slash AFS directly off of the route. That's now actually reserve name. You can't. It's
Gerry Seidman: Its official things slash AFS you can't have such anything, and the way it works, if I go AFS slash you michigan.edu or cern.edu, There are DNS service records that say, where the metadata servers are for University of Michigan or certain etc. And what happens is the client, when you say slash afs/stern.com, it goes to DNS and it finds the IP address of the metadata server. And then it dynamically mounts, the route that sell special fruit. I
Gerry Seidman: Last say the penultimate thing I want to say is afs Everything was, really, an object store. It's not really a false, Server. It's an object server where each volume is an object store and each entity in it files, links, directories etc, are objects with their unique guys object IDs. And actually the server doesn't know anything about paths, unlike NFS. the path is all the pathwork, Interpretation is always done, completely on the client.
Gerry Seidman: As I said, also said there's a cash consistency model that survives reboot so when you read from the file server, a fraction of not a copy and sync file system. it just grabs the block that you read, it stores in the cash or the least presentation you use caching on and the cash can be very very large. couple gigabytes would be a couple of terrified. So for example you doing the machine learning Up. You might want to have a very large cache. so …
Tom Sweeney: Traditionals.
Gerry Seidman: point basically networks over All right, that's all we know are all experts in or restore. now I talk a little bit about containers of software,…
Tom Sweeney: Gerry.
Gerry Seidman: deployment, inheriting, all the classic problems of software delivery. very quick slide. Just we all know this that at runtime you're using, you've got an overlay file system the presented to the run container at runtime where the route is the write layer. And then there's a list of We don't get players. On the local machine, if you built. A container with a bunch of layers, you have all the files locally in particular, you also have a manifest that are config file. Whatever, those are well dependent,
Gerry Seidman: it's just helps me about the container image. But when you say top, I've been push. It takes those files on the layers and creates a car.tz compressed version. And that's what goes up to the container registry, and the container regency stores them. And in fact, the container registry is basically an object store where the manifest even a io slash
00:15:00
Gerry Seidman: Out library slash alpine, you go to the registry and say Hey, what's its unique ID? What's the idea of its manifest? That's the only time you used, It's not object like And then from there on you just bootstrap and say Give you the man give you this object ID which is the manifest. They give me this object Died ID with coming in the manifest, the layer ID to grab the layers. and when you say Pull you do the opposite, you pull the layers and you untar them locally onto your local disk. so what are the associated costs with pulling a container? There's the clock time spent downloading the entire car.g file, which for large files, can be not insignificant that the cost of the network bandwidth.
Gerry Seidman: but if any CPU and IO spent expanding, that's hard on TV onto locales and the disk space required to store them and expand them. So effectively your container start time is the download time plus the expansion time and again these costs are only incurred the first time to container the layers full I say container image but it's per large container. Images are not uncommon. Icon is 1.1 gigabyte. Before you do anything, we have I know of customers that have just taken. Legacy systems and made them into one. Giant could 40 gigabyte Container. and then an example of that would be SAS. If you remember the old statistics programs is? Yes. That's what they did. They're not a customer bars but they have one I think there's 50 or 60 gigabytes. They just
Gerry Seidman: Big one, giant container image big deal. I'm only downloading it once no problems. So if I got a one gigabyte app, I download it to my machine or my server. I got the problem is a scale this adds up. So if I'm deploying a thousand one gigabyte images to a thousand machine a thousand. And they say, if I'm delivering a single gigabyte image to a thousand machine, that means I've got to move a terabyte over my network. which is you don't ever want to start a thing with a terabyte over your network and certainly, if you're in any industry where the network has to be really, Smooth like a bank anything is doing experimentation on it. you don't want that choppiness of the network caused by a lot of pulling of images on. And again, we're running a thousand machines is an uncommon. I mean, we have enterprise customers that are running on
Gerry Seidman: It actually running applications almost 200,000 machines. Tens of thousands of applications not uncommon for a single application, to go to a thousand machines and then we just drifted across the enterprise both locally and globally and cross-cloud. So that's not uncommon and we also have customers that have HPC compute clusters, where they got a thousand nodes and they'll just, blow out the container image To the notes in the classroom so It's not unrealistic. The other thing is that if you're running lots of containers at a single machine either individually with pod man or orchestrated by a Kubernetes, you can have a lot of containers in the machine and that actually causes a bloat in the disc
Gerry Seidman: just by the way. there's the Pie Man Group, an open ship node if you configured it with a bunch of stuff. Turned on can be up to 100 gigabytes of operator interview. So when you're creating a new openshift node, you could be pulling as much as a hundred gigabytes of container images and there are many as factors in the time but it takes about 45 minutes of setup and openshift note. so okay, so now we know, can we take as bad? their respects. so an important observation and this actually goes back, is this software delivery crop, there's over deployment problem goes back to cards, and tapes, and discs, and CDs, and RPM files. and containers, that many of the files in this offer deployment, and the container image are just not used.
Gerry Seidman: They're just not used. unless somebody put a lot of work into calling their deployment. Pretty bloated. In fact, going back to a paper on back in 2016. There's link by harder.
00:20:00
Gerry Seidman: Pulling packages accounts, for 76% of containers, start time, but only six, four percent of that data is great. That was the result of Studies their analysis over the three years ago but I suspect it's worse, not better. But There you go. So in that prior example, if I'm pushing a thousand copies of a container to, a one gig by tonight near to a thousand machines that one terabyte would go down to 6.4.
Gerry Seidman: And there's a local dishes, reduction of storage actually for more than six for more because the carballs expand again for a single image. It's not important. But I've got a machine with many images, I could have hundreds and they have hundreds of gigabytes of Actively use container images on it on a server or a coin Tom, I'm not going to dwell on this. This is from that 2006 paper, about some example slides, let me go back, What was their research was fast, distribution of lazy doctor containers, and they had this idea that if you could create an index into the target, the file you just cherry pick the
Gerry Seidman: Blocks of the Tar of the blob using HTTP get range instead of just HTTP, get all from the tainer registry. and so, their whole paper is about creating indices and creating these non -standard container images. so this is from there.
Gerry Seidman: There, non-standard implementation, but still they're getting pretty impressive, compressions and pretty significant. Start time improvement. again because it's only pulling down the files that are actually used as runtime. Or so let's not take another digression on container storage. because then this will all come together because My feeling is, never.
Gerry Seidman: Never use a technology. You don't know how to write. So I'm basically going into the internals of you understand how it works in that way? Hopefully everything is clear, container storage. again, This is talking to the choir, he's acquire or I am preaching, that you've got the storage on configuration file storage at Conf file. and then you have a local working directly where the container layers and images information stored on and at those respective paths, this is all implemented in the Storage containers slash image, subsystems,
Gerry Seidman: Just for laughs, I'm just starting with a fresh system I say podman images. And what that does is that actually populates the empty graph of the structure. I can teach drove into everything but that's the kind of the structure of storage in Edwin time with pod man. And if I look at it, when I just created empty, it's about 32k, all right. we're only going to focus on again, in these slides, the things in green are the things remind myself to talk about. There's the overall a storage and that's the storage slash over. that's what the actual files are stored for the layers and images. It's where Information about the images. is stored because again, a layer may be used by multiple image just
Gerry Seidman: All So again doing something simple like a dot pod man poll, it gives us a throws out this number which is the the layer digest of a layer outside the single layer container. this every day I'm saying works on multi-layer containers. It cools down the manifest file and then it copy signature and it goes back the id of the registry, the idea of con that's a digest of the container image and justice. So we'll see these numbers again is 31. is the layer C1, aabv is the looking inside the overlay images file. We see bear again.
00:25:00
Gerry Seidman: Corresponding to the image ID of C1a. There's a self-direct you c1a with junk under it, but it does include the manifest file and the way you find the Sea 31 e35. that's the actually manifest ID. The digest of the compressed image, not the uncompressed image, which is actually what's used in the manifest file. so the way to find the Actual digest, that layer is doing stuff.
Gerry Seidman: But extracting stuff out of the JSON bucket advo, again, I'm not going to talk it through, but the point of making is that you cannot forget about the 31 e blah blah, because it maps to one to the seven, a 78, 8 blah blah, but we're gonna want. Again let's look at the overlay folder, we see the bear lo and behold is a directly corresponding to that layer. With some files, the saline file being the diff file which contains the files from that layer and I can go directly and see those fun. All right, so we're now and then it run time.
Gerry Seidman: Everyone at runtime. You need a we'll see a second, container layers created. That's the transient regular layer of this container. when the container ends and you remove, podman RM. that layer will go away but I just want to, be clear that I run the container and break some content in it. I can see it actually under over All right. So now We all probably were experts on this before I started talking, but now we're reminded experts. so now we're talking about an additional image store and I'm additional image store, briefly on Alicia Image Store, allows you to have multiple instances of that structure that I just talked about. and
Gerry Seidman: you specify and you have one or more of those. And those are configured in the storage. I can't follow under additional image stores. and what it worked exactly like when you do a poll it looks like any pull, but you pull into a specified copy. So you have actually that directly structure multiple times in multiple plates. All right, depending on how many you have. And so if I pull busy box into that and then I go into that directly the temp slash ais. You'll see lo and behold, I get exactly what I saw before. but the AIS will only be read only. You will never ever be, it's only for the images, the layers from
Gerry Seidman: Downloaded Images. The rewrite layers at runtime, it will always put the rebite layer in your primary route. But notice, I left something out. I just want to be very clear When I ran Alpine 7.5 megabytes just remember that number 7.5, megabytes is the size of alpine, busy boxes smaller, 4.8 megabytes. and when you do a podman images, you have an extra column with them additional restore which will tell you whether it's your store it's coming from whatever you read, only layer stores.
Gerry Seidman: so what's the value, proposition of this, you get to share only layers across multiple users. for example, if the alternate image stores is on a single box, as you know, that in podman root was podman, every user has their own directly structure. Corresponding to storage on digital, allow you to have a single place rather than having every user on a machine. Downloading, the image, they can get from a shared place. another use case is you downloaded into an NSF share. And now, you have files that are being called on your local machine from an NFS share. And so instead of having copies on every machine, you have a copies just share all of this because of the whole into the alternative.
00:30:00
Gerry Seidman: Image store, it has to be administrative managed. Somebody's got to do something to do that, whether to do the Poland locally of the pull, into the end of the share, on if you haven't read it. There's Daniel Walsh's is article on exploring additional image tours in climate. So the bottom line is part, man, works pretty much to me. Additionally, the creamers standard. It's just allows to have more than one. Let's have extra real now to be contrasted with additional layer store. ALS.
Gerry Seidman: It would, the history of ALS goes back to that harder paper where they tried to create As I said, a way to lazy load containers by having an index into a GC file That's what the essence seekable tar tzus. But that stands for, and that's what they did. I'm not gonna dwell in it. But, the original approves, the concept for ALS was done by a group of NTT engineers, who did the heavy lifting of
Gerry Seidman: Implementing what the harder group did but in actually container slash images just in compares my storage as well as in container d. and it is now shipped. it is in padman today so, ALS provides or additional sources of layer content not about the whole structure of the storage. It's just A layer content on there are actually three examples of uses of ALS the star GC. The NTT one serum I think has one, but I think they may have walked away from it. There's an ipfs implementation, of course,
Gerry Seidman: so, the way you implement ALS is with a fuse driver on because you need some sort of RPC from the container runtime, to say, Hey, I need the thought content of the layer. Can you provide it? It's really what happens at runtime right? But before down do I have the files locally? it says Hey you use file system. Can you provide? And you specify the root of your ALS file system under additional layer stores in the configuration problem.
Gerry Seidman: And so what happens is at runtime, there's an intercept. if it doesn't already have the files, it asks, can you do it? And if you're also says, yes, It's okay, great. Give me your route and I'll get the files from you. we'll see a little bit more details. Don't here. So, in this example I have my Orestore ultimately stored fruit at Chiliary Slash Home slash Store by putting that in your config file. It's telling the container runtime to look
Gerry Seidman: We don't want to query you, it uses the fuses according language, it's kind of an RPC, your future, lash your ALS root slash the basically form of the image Layer Digest. And that's where it's expecting. You to provide. a different directory, as well as some info and info file and the RAW blog if it asks you for it never does. But alright. So again you have to satisfy the ALS RPC by being able to service these paths.
Gerry Seidman: But these paths by your driver. So let's look again. So here's the same thing. I did I have a blank fresh banana storage, the 32k. I do it with my ALS driver running. I saw a problem Paul, everything's the same. And now I look into a dis usage on it, and instead of being 7.5 megabytes, it's 1.4 kilometers. And 104 kilobyte and that's not going to change. The caching is done on AFS. That cash is any different place. so in this case we reduce the container storage size by quite a lot. And the interesting thing is, when I did this Dr. Paul nothing came over the network.
00:35:00
Gerry Seidman: All that happened was the ALS driver, said I can provide the services. I can provide the file. You didn't answer any file. So I'm not doing anything yet but I'm saying, I can if you false at those directories. So now let's look in the store for that's actually overlay. no this is the ALS route. what my fuse Paul system is providing and my priest is a root with the base 64 encoding of I guess that's io / Alpine. Or something like that, the digest of the layer. And I have to provide.
Gerry Seidman: Basic people of the reference slash died, layer digest, slash Bob /, stiff /, info and doing a little forward. Think notice that, what am I doing in my Orestore? They also implementation. I am I'm just doing a link to a volume on the cell DVD that I mx.com blah blah. Coincidentally with the name, very similar. I'm truncating, the names just for you either use and again just to prove I did an echo of that z blah blah through based 64 decode and yes in fact it is / liver.
Gerry Seidman: going back to container storage. what I'm seeing is that A Digest ID, I see. Under the death rather than the files which I saw before. I just see a symbolic link. again, I did that's what it really is but below I kind of abbreviated so The Overlay slash Layer Digest. Glitch GIF is really a symbolic into that AFS about into that path, which in fact is Going to give you the content of the day ARS or volume.
Gerry Seidman: And I'm just kind of showing you that really works on the slash info just gives you a standard information of the information of that layer. That's a image standard. and if I do a stat - l of the blob file, it says that in fact, if Laos driver can give you the part of the file of that, layer, and it's gonna be three point four, 3.4 mega. and of course, if I run the end and if I just run it, everything runs as normal. So again, the only, I ran this and the storage size, one from seven point five megabytes, a hundred, and four kilobytes.
Gerry Seidman: So that's the trick behind ALS to be many. You can put NFS behind Ali but if the fundamental difference in ALS and AIS, is that, as has a complete replication of that complicated structure, which allows us to reuse a lot of code, it's using the same code as container storage. But,
Gerry Seidman: but with ALS, you're just grabbing the layers on the Web. All right, so this is currently Deployed in pod, You can run it today in five, but if you look in this source code, it says Experimental. And if you look the band page for storage comp, there's no reference. So one of my missions is to get it promoted. and Dan suggested the following route, give a presentation of the pod, man. Cabal, this write a blog article about it.
00:40:00
Gerry Seidman: Update the man pages to storage account.
Gerry Seidman: Describes additional layer store and makes them create some as a test. I can be run in the continuous integration, I think for the storage fiber. So finally, yes, there are some container accelerator. again, I really want to already All it is a fuse driver at runtime, it's a fuse driver. That maps, those munched names of lake of container image references slash layers to AF volume names in a well-defined manner. How is it configured? Actually look at this actually have in a cell
Gerry Seidman: I have this layer volume that file so actually that path is the same path. That I put in Assuming I'm sorry configuration storage account in the ALS client configuration, give it a path that they bootstrap I don't want Put information on I'm a distributed file system. I might as well have to configuration where it should be. and what that's saying is that The cell name ABC Direct ids.com will service layers.
Gerry Seidman: these are from these repos and you will find it in that cell under the layer name, J-1 Underscore Blah, where the blood and I strip out this shot to pick the same. so that's the mapping to find the air or volume, from from the image and Up. Why does it work where these layers coming from? There's a service called the oyster layer.
Gerry Seidman: Volume generation service that either can be hooked by a webhooks for your container registry or through. A command line tool where you say L V I'll be c Ingest docker.io slash Alpine and all it does does it goes to the container registry, it grabs the manifest? And then, for each of the DIP layers, it says, If I haven't already created an IFS volume corresponding to that in the appropriate cell. I download it and I untar it and then I create an Amazon volume with that. and so that's what the later generation service does, that's it. So now I'm gonna stop sharing and I think I was not too over and I haven't heard anything. So hopefully
Daniel Walsh: Can you hear us now?
Gerry Seidman: Hopefully people here, it might get presentation. Good can't hear you.
Daniel Walsh: Yes.
Gerry Seidman: Could somebody say something our speakers muted?
Daniel Walsh: we're trying to talk, you can't
Gerry Seidman: No, they're not. Okay, so people are speaking. I'm gonna just
Daniel Walsh: Can you hear us now?
Gerry Seidman: Okay. Tom. You raise his hands.
Gerry Seidman: Are you speaking time? And hold on a second,…
Tom Sweeney: Can you hear anything? At all during
Gerry Seidman: I'm sorry.
Tom Sweeney: Can you check chat?
Tom Sweeney: And here's
Gerry Seidman: My Bluetooth. I'm having technology problems. I apologize.
Ed Santiago Munoz: first past,
Gerry Seidman: and so,
Tom Sweeney: I don't think he's on board yet. you can hear us. Okay.
Gerry Seidman: I can hear you now. Yeah, my Bluetooth. Down.
Gerry Seidman: Who knows all these screen sharing things do weird,…
Tom Sweeney: I'll be.
Gerry Seidman: things that Bluetooth and it turns out the speakers on my laptop don't work. So I had to put an external speaker.
Tom Sweeney: Okay, so We do have a couple questions that were queued up while you were talking,…
Gerry Seidman: I apologize.
Tom Sweeney: and we couldn't get your attention. So Chris had one that was can volume store extended attributes,…
Gerry Seidman: Absolutely.
00:45:00
Tom Sweeney: ie SE Linux labels
Gerry Seidman: extended attributes're currently not supported, they will be supported in the next release of our store. and I'm guessing you asked that because the overlay file system wants speaks so it turns out pod man is good Kubernet. Openshift is bad because POD Man default to fuse overlay at this. I refuse every AFS I can provide them the dot, the white app files But in the next version of Aura Store, we'll be able to do that. We're actually doing some other stuff. We're also doing verities checking and things like that which will make us the only just distributed file system that can do that. That's already if and when you care on etc.
Daniel Walsh: Gerry. I asked Access control. Is that done on the server side,…
Gerry Seidman: Yes. there,…
Daniel Walsh: or the client side?
Gerry Seidman: there's a problem. Ask the control of an interesting thing, because there's actually three different places where your Baptist control. You have the Unix bits that are in the container images. Those are preserved by container of the standard pipeline, there's the permission to download the layers on the container registry. And then there's the permission to access the AFS volume.
Gerry Seidman: All right, three different places We can restrict.
Gerry Seidman: A runtime application to access the files in an AFS volume. We can do that. We can put access control on the volume. We can't do it on the per file because I can't be worth that. Can't be represented, we actually can but it makes no sense in the whole container model. but if you would really want to do that, you would want to have a container registry that would never serve the product PZ.
Daniel Walsh: yeah, yeah, because we've been in the past if I put stores on And network file store. For instance, NFS. It doesn't understand username space. So if I'm in using a space and I tried to chone a file, the service says, no because it doesn't want, UID the Walsh to Jones. Uid 100,000 Yeah.
Gerry Seidman: Got it. Yeah. Yeah, I don't think yeah, good.
Daniel Walsh: I think it Would AFS work same way.
Gerry Seidman: And that's the book. No, I guess would work. I don't,…
Daniel Walsh: What?
Gerry Seidman: I don't know why it's out of my pay grade but if I …
Daniel Walsh: So, you think Andrew would allow that?
Gerry Seidman: I believe. So I could run a quick check, but I believe it does. But take that as a qualified. Yes.
Daniel Walsh: All right, so yeah, when you were showing the additional layer store, you have a tool.
Gerry Seidman: And hopefully, I'll play it in this representational image store.
Daniel Walsh: No, no additional. But I liked a lot of lights and it'd probably be helpful. If we got some of those slides up to basically describe all this stuff all works the ALS Though.
Gerry Seidman: Every.
Daniel Walsh: You say there's a fuse file system that's required, we is that fuse file system open source at this point.
Gerry Seidman: It's an implementation specific thing, the start the MTT one, the star gz one is the orcer.
Daniel Walsh: Right. Okay.
Gerry Seidman: One is not but
Gerry Seidman: It's a Long story. As to why or store is not open source? We'd love to be.
Daniel Walsh: Right.
Gerry Seidman: We just can't eat and build in source.
Daniel Walsh: That's fine. So, you have a tool that is creating these additional layer stores.
Daniel Walsh: in a format that we can get some to buy making consume. Hi.
Gerry Seidman: Yep.
Gerry Seidman: Yeah, yeah, I think it's that the image layer digest to layer, the orcer layer volume. Configuration is, this is shared by the server and the service that creates them as well as the client. yeah.
Daniel Walsh: and lastly, the
Gerry Seidman: Anything and there's a little thing I want it. Also mentioned Big organizations that have a lot of apps over. A lot of time have a lot of problems with Cullen. when when you call something and our customers are always asking what can we do to help and it's not a lot we can do to help because you can only at best in for certain things, but and the container images you have this an even worse problem because you are Ask you be, cashed far away, and have it for a long time. And so we posited that we could get some some users metrics from our ALS drunk from our fuse driver. Of the weather layers are being used, would you?
00:50:00
Daniel Walsh: Yeah. So if he had a layer that has been used in three years that you can get rid of it.
Gerry Seidman: Right. Exactly.
Daniel Walsh: other questions, anybody?
Daniel Walsh: So, why would you prefer to use ALS rather than just doing? Ais.
Gerry Seidman: This. One is the dynamic nature of it that there's no pull. The other with. Areas is, I would have to figure out how to do it. Because I'm mapping, I'd have to do something in image store, to do From. The appropriate path where ALS jumps off. where was storage? as it's just the standard storage, overlay slash blah. I don't know how I would even look into that without doing some. Plumbing. In story. Right.
Daniel Walsh: I guess, lastly, the reason've people have said they won't use Ais in the past has been laden. so that you're running a container, it's running fine for a long period of time and…
Gerry Seidman: Okay.
Daniel Walsh: then all of a sudden decides to access some piece of data that is in cash. And It goes into a pause.
Gerry Seidman: Yeah, I mean but yes the answer is one of the events of a alsover. Over AIS in that regard is the cash. If you hit something, you haven't hit the long time. it may still be in the cash for the NFS. You're always doing it whether you voted it recently or not. Could be cashing is much.
Gerry Seidman: And not as good. which,
Gerry Seidman: and one of the things they did in East RG, the Star Gz project which we have talked about doing as well to That problem is to create a manifest of files to pull the pold to populate to feed the cash. When I was at Redhead Summit, I spoke extensively with somebody who works as a cruise line and a ship is one giant. Open ship cluster. And they have a lot of pain bouncing that off of a satellite network. That's extensive and slow and loss and unreliable.
Gerry Seidman: So to meet their needs, we talked about adding functionality of, like I said, a seat a seed, set of these are files, you should preload and those can be obtained by observing fire runs of the application on. That's already implemented again in Star Gz, You look at there's a way to somehow I forget how but somehow specify however how to pre-pull Anyway this is funny because it sounds the fast start but by default it then lazy loads the whole image. So you're going to fast start, but eventually you have all the fossils.
Tom Sweeney: Okay, I'm gonna have to hold questions here because we are way over time and…
Gerry Seidman: So sorry.
Tom Sweeney: yeah, no problem. but thank you Gerry's, very interesting. And if we'd love to have you back in the future,
Gerry Seidman: Okay, I'm gonna post that I post. Only I possibly, you guys have. Yeah. Hopefully that wasn't too fast.
Tom Sweeney: Yeah, we have the link.
Tom Sweeney: That briefly.
Matt Heon: That's delay until Monday. Four minutes is a little late to talk about this and I don't want pushes. or without we'll delay this,…
Tom Sweeney: Okay.
Matt Heon: until next time we can
Tom Sweeney: Okay, yeah, it's gonna be a couple.
Daniel Walsh: I get.
Tom Sweeney: Yeah. This.
Daniel Walsh: Yeah, just for those I guess we're not gonna start for another week for that sex is what bottom line, right?
Matt Heon: Yeah, at this point I would like to get things rolling but we can probably get the ball rolling during the planning on Tuesday and then see things roll from there. I would hope to have an RC out in two weeks maximum.
00:55:00
Tom Sweeney: Yeah, and our end goal for four sixes to have something out by mid to late August.
Matt Heon: No, that's four seven and go for four,…
Matt Heon: six is to have something out very early July. Hopefully
Tom Sweeney: But much more expedient that I had Given that I think I'm going to wrap up this meeting and just I do.
Gerry Seidman: I'm going to question…
Tom Sweeney: No, I do the Sure.
Gerry Seidman: if I make is really advanced when we met you, we talked about there should be a man page other than storage on Conf Where would man information go? I can't think of any place because there's no just storage.com Good.
Daniel Walsh: Right. You're going to Storage.com. Yeah.
Gerry Seidman: Okay, I just wanted to confirm that. Thank you.
Tom Sweeney: Okay, so our next cabal meeting will be on July 20th. Same time, 11 o'clock in the morning eastern time and then our next community meeting will be happening on Tuesday, August 1st. I'd like to thank Gerry very much for coming here. Presenting today is great information and for everybody participating and with that, I'm going to turn off the recording.
Tom Sweeney: And so many buttons to click to turn off the recording, Anybody want to say anything or comment anything? Without recording going on.
Tom Sweeney: Because a big fat no and say let's go get some lunch dinner and get out of here. Right.
Daniel Walsh: Nope. Gerry I'm glad I could attend but I was supposed to be on a flight out to Europe and never made…
Gerry Seidman: I'm glad you got made it…
Daniel Walsh: So, I'm stuck in DC right now. So,
Gerry Seidman: hopefully, it clarified a little bit more what we're doing.
Daniel Walsh: Yeah, know I found an interesting. It's
Gerry Seidman: Yeah. This scary thing is how incredibly simple it is. and…
Daniel Walsh: yeah.
Gerry Seidman: it works because we have a million lines of code of a really good secure distribution policy system underneath but the ALS part and…
Daniel Walsh: Right.
Gerry Seidman: they container part it's trivial.
Daniel Walsh: What was AFS first introduced,
Gerry Seidman: It isn't a history of the brief history. once upon a time, There were no computer science departments, there were math, departments at ED Departments, and back in 1982, CMU was forming a computer science department and IBM. And if you want to start a department, you need researchers to pull it in. So, I'd be able to length and seven of the researchers, when IBM did real research and gave them 35 million dollars and said, Focus on distributed computing. And that was the start of the CMU Department and the start of the Andrew project.
Gerry Seidman: And many things came out of the Andrew Project. IBM's distributed transaction processing system came out of that and they made a billion dollars on that. So they got their money back in spades and the end system came out of it, too. the intention was to spin off companies FS on into plans are IBM, which was a product. No idea in real life, AFS doesn't sell hardware and they decided sunset, it and ended up and open source. and it struggled in open source and forest formed by them primary open source, people to Make it good. And he mentioned,…
Daniel Walsh: It's cool.
Gerry Seidman: who's using it, by the Department of Defense is used by Horn of Energy. She's my major banks, many different use cases.
Tom Sweeney: The PCE back in the day. Also, Do you know was a part of DCE distributed computing environment.
Gerry Seidman: it was,…
Tom Sweeney: That was a
Gerry Seidman: There was a fork of it. That went into that, I think. Again, that's way before my time. You…
Daniel Walsh: Thank you.
Gerry Seidman: I'm relatively new to this world. In historical.
Daniel Walsh: Dte DC came a few years later. So,
Gerry Seidman: Yeah.
Tom Sweeney: There are some early 90s.
Daniel Walsh: but,
Gerry Seidman: Yeah. What happened was got Guam density, Athena project. If you remember the Athena project MIT, which you did okay.
Daniel Walsh: I worked on it being a project, so
Gerry Seidman: Which led to some licensing issues and it issues and questions that Dot, It was a different world. But how software was?
Gerry Seidman: Used by different people.
Tom Sweeney: Banner,…
Daniel Walsh: Yeah.
Tom Sweeney: you're making it to check. Are you coming back to me?
Daniel Walsh: I am making it to check and flying out at 5:30 tonight. And Mandela,…
Tom Sweeney: Choices.
Daniel Walsh: I'm right outside of Dulles airport right now. Waiting to Have any extended stay at a hotel room.
Daniel Walsh: Late. Check out.
Tom Sweeney: Yikes.
Daniel Walsh: alright. Good Gerry, good step, one done. I need step two, three four. And we'll
Gerry Seidman: Okay, I've written the documentation, but the problem is that, I think I wrote too much For the Man page but I'll run that by you.
01:00:00
Daniel Walsh: Yeah, you're probably confused the all right.
Gerry Seidman: Excuse me.
Daniel Walsh: You'll probably confuse everybody by putting a huge section. Yeah.
Gerry Seidman: The Man page for AIS is one line. Put stuff here.
Gerry Seidman: I could do that too.
Daniel Walsh: Alright.
Gerry Seidman: Thank you guys. Have a great afternoon.
```
