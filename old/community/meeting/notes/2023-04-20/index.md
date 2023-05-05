# Podman Community Cabal Meeting Notes

Attendees: Matt Heon, Paul Holzinger, Lokesh Mandvekar, Valentin Rothberg, Eduardo Santiago, Giuseppe Scrivano, Preethi Thomas, Ashley Cui, Brent Baude, Chris Evich, Urvashi Mohnani, Martin Jackson, Mohan Boddu, Dan Walsh, Anders Bjorklund, Shion Tanaka, Stevan Le Meur,

## April 20, 2023 Topics

1. Possible Podman 5 features - Dan Walsh/All
	*SQLite
	* hyperV
	* Mac Native Virt
	* Drop CNI
	* Drop Cgroup V1
	* ZSTD By default
	* podman build -> build farm support
	* (refactor podman machine) <-- not "feature" but ...
	* making manifest lists by default
	* Use OCI images for podman machine
    	* podman <-> podman machine versioning ...
	* assimilate podman machine services

2. Bug week reminder/participation invitation - Matt Heon
    

### Meeting Notes
Video [Recording](https://youtu.be/_NnWUqyaBmw )

Meeting started at 11:02 a.m. Thursday, April 20, 2023

###  Possible Podman 5 features (1:14 in the video) - Dan Walsh - 1

* SQLite - Works underway.
* hyperV - Up for testing. Talk to Brent about the "decoder ring"
* Mac Native Virt - doing qemu not on Mac, Apple is making qemu less attractive for multi-arch, so we're looking at Mac native virtualization and working on it today, targeting Podman v4.6.
* Drop CNI - Looking at dropping the CNI network.  Currently, Netavark is the default for the latest. We are looking at dropping CNI as of RHEL 10.  If we don't, then the RHEL team will need to support it for ten years or so from when RHEL 10 is released.  Matt thinks the code cleanup is the most significant benefit.
* Drop Cgroup V1 - Similar to dropping CNI and more important to Dan as systemd is about to drop support for cgroup v1. We are looking at Podman v5.0 for this too.  We need to be sure that we don't mess up partners such as Ubuntu LTS.  Another thing to watch for is Chromebook users use a Debian base, and that might be problematic too.  Anders pointed out that his Ubuntu 22.04 has systemd/cgroups v2
* ZSTD By default - using the ZSTD compression algorithm instead of gzip.  Older versions of Docker don't support ZSTD, so that's a bit of a concern.  The thought is to let the user pick or push to versions of the image.  A lot quicker downloads with ZSTD over gzip.  A problem with pushing two images, people may have to pay for storing or pushing multiple images.  The thought is to default to ZSTD and allow users to configure back to gzip in their containers.conf file.  The compression happens only during push/pull.  The format of the image on disk or in the registry remains the same.  Brent would like to get buy-in from Quay, but they won't likely step up until we, or someone else, starts using ZSTD more frequently.  The Moby shipped with Fedora now uses ZSTD.
* podman build -> build farm support - Nalin is working on this to allow building of an image for multiple architectures.  Nalin is making it a very easy to specify with podman build command line options.  You wouldn't need to deal with manifests nor have any need to deal with a second VM running another architecture, it would just work.  It will build natively, not in emulation mode.  Under development at the moment.  
* (refactor podman machine) <-- not "feature" but ... - After the Apple hypervisor work is complete, some refactoring of the podman machine might be a good thing to do for speed.  This might be done earlier than Podman v5.  Dan also noted that we're thinking about moving podman machine to a separate repo.  We might draw more interest in contributing if we did move it.
* making manifest lists by default - when you pull an image to a system, by default, you don't always get a list.  If you have a multi-arch image, this can be a problem.  Looking into being able to pull manifest lists down so multi-arch images could be better supported.  The thinking is to turn this on by default in Podman v5 and then allow users to opt out of it.  Matt is concerned that someone might get angry as manifest lists (JSON file) will show up that haven't been there before.  Brent suggests we hide the lists as much as possible.
* Use OCI images for podman machine
* podman <-> podman machine versioning ... This allows you to enforce that the version of the client dictates the version of the guest podman machine.  That way you run only the version that is supported in your environment.  This also helps the development team by not needing to supporting multi version combinations.	 
* assimalate podman machine services - for running a podman machine depending on the hypervisor and the Operating System, it is required to have a number of services running due to a number of microservices.  The talk is to move it all under one potentially.
* Anders talked about some storage ideas (`ipfs://`) that had been kicked around in the past and is wondering if any work has gone on that.  It would allow layers to be split across multiple files.  This would be in c/storage.  Matt thinks
https://archive.fosdem.org/2022/schedule/event/container_ipfs_image/


###  Bug Week (54:51 in the video) - Matt Heon

Podman/Buildah teams are doing a bug fix week next week.  We're encouraging people to help or point out bugs important to you.  Then stability releases after that.  So afterward, we'd be at Podman v4.5.1.


#### Open discussion (49:00 in the video)

1. Martin was asking about Quadlet and was it going from tech preview to fully supported.  Martin uses Quadlet and is really liking it.  He thinks it's one of the best features in Podman.  Dan noted we've gotten a lot of nice feedback, but now we need to get the word out.  As we move to edge devices, Quadlet will be more critical.
2. Dan talked about Valentin's thought to never break on upgrade to a new version.  For Dan it's more about pushing the envelope, otherwise you get old code.  Dan has broken things in the past  to secure code.  Dan believes both viewpoints are valid.  Matt suggests that we might support a v4.0 Podman for a while longer, but that would only have bug fixes, not new enhancements.
 
 
### Next Meeting: Thursday, May 18, 2023, 11:00 a.m. EDT (UTC-5)

## Possible Topics
1. containersh - Dan Walsh
2. Storage - allow layers to be split across multiple files. - Anders Bjorklund


### Next Community Meeting: Tuesday, June 6, 2023, 11:00 a.m. EDT (UTC-5)

### Possible Topics:

None Discussed

Meeting finished 11:58 a.m.

Raw Meeting Chat:

```
You11:02 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:05 AM
Please sign in or add to the meeting notes: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Anders F Björklund11:17 AM
my Ubuntu 22.04 has systemd/cgroups v2
Brent Baude11:22 AM
ty Anders
Brent Baude11:51 AM
i need to drop as well
Anders F Björklund11:51 AM
https://archive.fosdem.org/2022/schedule/event/container_ipfs_image/
ieq-pxhy-jbh

```

Raw Transcript
```
ieq-pxhy-jbh (2023-04-20 17:03 GMT+2) - Transcript
Attendees
Anders F Björklund, Ashley Cui, Brent Baude, Christopher Evich, Daniel Walsh, Ed Santiago Munoz, Lokesh Mandvekar, Martin Jackson, Matt Heon, Mohan Boddu, Paul Holzinger, Preethi Thomas, Shion Tanaka, Stevan Le Meur, Tom Sweeney, Tom Sweeney's Presentation, Valentin Rothberg
Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: Have and there it is. Welcome everybody. This is April 20th 2023. This is the Podman Community cabal meeting for this meeting. We usually talk about design issues or thoughts for Pod, man. And today we have a good slate of stuff for Pod Man, 50 features, which is coming up. Container essay, and then also talk about Bug Week. So We have a hack MD going, I've put a link into the comments here for Google meet. Please go ahead and add your comments since there is we go along or if I'm going to try and take notes and if I mess up, please go ahead and correct me or add links as appropriate. So giving all that I have Dan walshill first with possible pod, man, 5 features and
Daniel Walsh: Okay, can you put up the
Daniel Walsh: You put up the feet, the slide or…
Tom Sweeney: Yeah.
Daniel Walsh: whatever. thing, everybody slides, shining it shining into
Daniel Walsh: Okay. so, I view Major releases in two ways, and balance is going to be pushing back on this. So it could get entertainment entertaining a little bit. I view a major release as being A milestone of marketing more than just being, you know, having it like In the real world when relate. Well, nine well-10 comes out. It's not only a chance to say we have new functionality but it's also a chance for marketing. You know, isn't it great that we move this far ahead? So I'd like to, you know, over the years when we had different versions of Pod Man, Come Out. It was not only we didn't do it just for breaking changes but we also did it so much from marketing. So I think with podman 2 came out, we added
Daniel Walsh:  We moved. I think we that was the first time we added in the new API and FOD, Man, 3 came out. We added appointment, three came out, we had a new API and pod, man. 4 came out, We added, You know, some of the pipe, my machine functionality and other things like that. So when we look at now, it's been well. This is probably planned for the end of the year early next year. So it's gonna be two years since Pod, Man Full came out at that point. So the question I have is what, what did the long-range things that we'd like to see in a marketing event for five man. Five on a second thing is, is when we come up with the major release, it gives us a chance to change the defaults in such a way that potentially, they could break break people. And obviously that's something that we want to avoid.
Daniel Walsh:  If at all possible but sometimes it's it's necessary in order to move forward. So things I threw down for ideas for podman 5 and again, these don't have to wait for apartment five. They're just major things that are going on in the Pod, Man world right now.
Daniel Walsh:  That I I see moving forward and I just threw down a few ideas right now this for those. That don't know, there is a pod man, internal database right now is based on multi B and it's felt by the maintainers of the database that it was important to force to support ability. We saw a lot of corruptions happening and multi B and we felt that the upstream for both DB was not as responsive or not as active as we'd like. And so we wanted to switch to something a little more stable which was ask you a light. And so that's actually in Part-man 405 right now, you can actually test With.
Daniel Walsh:  SQLite. But I'm at apartment 5, we'd switch. The default to SQL Light. Obviously upgrades would continue in both DB, but if you did a restart reset, then you switched SQLite There's also a big effort for the lots and lots of uses on Windows cannot support.
Daniel Walsh:  Wsl. Usually it's something inside the company that says, they don't like wsl or whatever reason it is and they've asked us to support five main machine for Native virtualization. So on Windows, the first version of that is going to be Hyper-V, which is being heavily worked on right now. When Brent is there? Is that available at all right? Now for testing
00:05:00
Brent Baude: It's actually done.
Brent Baude:  There's some official stuff that needs to go into fossa and ignition. But and some nits to smooth over in podman. but, Yeah, you just need the secret decoder ring. For me to get the image.
Daniel Walsh: Yeah. And I don't I mean again this you know probably obviously is going to come out probably in four six might be you know just you won't need the Dakota ring to turn it on at that point or but it's it's something that we want to again market that we have new architecture. Just are not new virtualization support.
Brent Baude: Yep.
Daniel Walsh:  Secondarily to that is on the max right now. We support qemu for running our podman machines. And there's been a lot of requests for sporting that native virtualization. Mac apples actually, making it much more attractive or
Daniel Walsh:  Making c** you much less attractive as a solution based on some of this stuff they're doing for support of multi-atch building. So that's sort of driving us towards native virtualization Plus, we believe that we can get better performance by using Verdeo of SD instead of playing nine for volume mounting into the containers. This is something the darker currently supports. So we will be doing some time in the next six months or so we moving, or adding support for native Mac. Virtualization anything you want to say on that Brent.
Brent Baude: Started working on it today, hope to have it done for four six.
Daniel Walsh: Okay. The next one is, now we start to get into system controvers. So, not only three above would necessarily be breaking changes.
Daniel Walsh:  The next one would be potentially more controversial, which would be to drop CNI support right now. We if you run containers, With pod man. The default that you get on a fresh installed pod, man is neta back for networking stack. We currently also continue to support CNI, but the idea would be, Can we get rid of the CNI code? Can we get rid of the support headache of CNI? And really, this to me, is more guided towards a real 10 type release thing and that
Daniel Walsh:  when we sign up for new version of podman releases on a particular rail, we're signing up for 10 years of support. So the question is, Do we want to support? CNI 12 years from now on top of Pod, Man. Now, obviously, we can never break. We can't break REL support on Level Eight Row 9. So CNI support. But can we start to get rid of it by default? and I think that, Mainly for people on here that ends up being somewhat of a time sink. For a matte and Paul.
Daniel Walsh:  Hopefully would start to disappear as we move forward and more people use it, but it would clean up the code base to get rid of C and I altogether out of it. Any comments by Matt Paul on that.
Daniel Walsh: Yeah, I mean the one benefit also of saying we're dropping CNI is that it can convince people to switch over to Netovac easier than feeling like they're gonna get it supported for? Forever.
Martin Jackson: That.
Martin Jackson:  There.
Daniel Walsh:  The next one is also similar and probably more to me, more important. Is that we right now, I believe system D is about to drop support for C groups, V1, Um, so that I think, I don't know if it's Fedora 38, if there are 39 is no longer going to support sea Groups, B to be one. So can we start to look at dropping support for cigarettes for you, one for our tool chain. So I think the primary tool there would be like Seron and run c start to think about it as well as I'm not sure how much We do in Pod man for that, but it's probably they're certain flags. That would have to be start to be removed since then. All I can make sense in the cedar must be two worlds. Um, and again, I think that's just for long range support. right now, from a rel,
00:10:00
Daniel Walsh:  point of view around 9:00 defaults to see groups V2 relate on the single three one but rallied is going into
Daniel Walsh:  Support mode. I think, either, I think in either the next release of the one after is going to be in full support mode so that We shouldn't be. Adding new features to see them to be one or in that dying out. Anybody want to comment on that?
Brent Baude: I do proposed timing. of the podman 5, I think would have A big influence on that particular topic. I actually really like this idea.
Brent Baude:  There's some distribution benefits to this.
Brent Baude:  But I think one of the things we'll have to do is if we did it today, we'd be cutting off. The two lts's of Ubuntu, right? Is that correct? Is a mantu gone to see groups, we too. They might happen to know.
Christopher Evich: I think the latest one is.
Anders F Björklund: I think 22.
Brent Baude: Okay. Yeah, so it's just something to contemplate as Who we lose? If we do that and but otherwise, I'm completely comfortable with this.
Christopher Evich: But the old ubuntu's, the old lts a bunches, they just won't update. Right. They they're going to just keep running the older apartment. Should.
Brent Baude: Yeah, it was sort being unaware that their V2 now so is our V2 lts.
Valentin Rothberg: No.
Brent Baude: That's what we need.
Valentin Rothberg: I also think that who's is using V1 still. So, if we Cut, or if we would drop.
Daniel Walsh: Christopher.
Martin Jackson: A lot of Chromebook users are on old Debians…
Brent Baude: So, maybe
Martin Jackson: because of the Chromebook Chromebook default virtualization scheme and I think they might be stuck to.
Brent Baude:  So, Dan sounds like, maybe we need to Kind of understand what everyone else is V2 plans. Sort of look like But again. we could theoretically, just Do it and
Brent Baude:  deal with the consequences.
Daniel Walsh: Yeah.
Paul Holzinger: I one question.
Daniel Walsh: so,
Paul Holzinger: how much C group code is actually important because isn't most of it done by the runtimes,
Matt Heon: There's a fair bit of complexity involved in how we do system unit container and how we do the Pod C groups in particular Pod, resource limits involve a fair bit of, super one for C2 last, I checked those would be the big ones. I would say. It's not a huge amount of code, but it is, it is some of the most complicated code. If you've ever seen the code to set up our potsy groups, It's a horrifying massive. If statements
Daniel Walsh: Yeah.
Brent Baude: I like the idea. I'd sure like to keep kicking it around.
Daniel Walsh: So the next one will get even more controversial, which is so we've been kicking around this idea of moving away from Jesus image format. to Zstd both have been supported for several years and
Martin Jackson: it's
Daniel Walsh:  The spec. but, Docker did not release for over three years. So, Giuseppe had a pull request into Docker. Back in 2002 and that finally got merged and they released a version with it. In March. so, they had him released from March of twenty two, thousands of my 2023. The.
00:15:00
Daniel Walsh:  We have women kicking around the idea of supporting what we've currently support both zsdd. And Jesus format for images. And it's been supported for many years. In Container D, Cryo and the rest of the world other than darker, And it's been in pod man. For I think every version of pod man, all the way back to one dot six. Maybe not 106. So which is or else seven?
Daniel Walsh:  The problem is that no one creates images with this format because Of Docker, not being able to support the older versions of darker, not being able to support it. we have ideas about potentially, Allowing you users to Check Pick which format they want to basically in containers duck off, pick which formats, that they want to push images to container registry with, and the options would be zstd gzip or a combination of both. So they could basically have but use it within have to pay the price of Pushing two versions of images to container registries and container registries, that would have to store.
Daniel Walsh:  Two versions of the same image. One compressed with each one of them and pod, man, and tools, based on Containers image would be smart enough to pick out the zestd one. If it existed. So, the benefits of their cost and benefits. And we stick with Gzip, we're stuck with the same format that we've been using for years, but old dark versions of darker support it And they can continue to use it. If we force everybody to go to Zstd then old versions of dark are don't support it but everybody in
Daniel Walsh:  The new versions of Pod Man. Not new versions of darker and all versions of our tool change. Get the benefits of better, better compression Quicker downloads in the case of Pod Man and Cryo and those tools they get you weight Grow quicker downloads since it's the pulling down individual files instead of entire images just a different false at a difference. The third option that combination of both has the Problem of you would have to if you're paying for the bandwidth of pushing images that you'd have to pay for additionals, content being pushed, as well as if you're paying for the cost of storing of images. Then you have to pay for both and we potentially could hear bad things from container. Registries who don't want, you know, who are paying the content paying to store both types of content. So,
Daniel Walsh:  the my proposal for Ralph's, for
Daniel Walsh: Five would be to, we just switch the default to ZSTD thinking that to be a large enough install base of of dockers out there at that point and for people who don't want to use it, they could just simply change the containers that cost to point to Jesus want to to do both. And, but my fear is that we don't do this then. When Pod Man 6 comes up three years from now we're still going to be having this this debate. So you know can we push this forward?
Matt Heon: I think risk here is a lot lower than the CNI. And what do you call it secrets? We want stuff because we're not dropping code.
Daniel Walsh: Yeah. Also distributions can, if distributors want to ship a Canadian stock off, that stays the Gzip, then they have the full ability to do it, This just questioning what should be the default format? We go forward with at that point.
Daniel Walsh:  Any other comments?
Brent Baude: Yeah. How does it? How does it work? In terms of you, you mentioned push but in terms of run or other actions, if, if the STD is the default, Are we saying, can you have a local container storage that has both formats?
Daniel Walsh: So it's only I'm push and pull. So when it, when it gets put on to your desk, you don't have the format any longer. The big think of this is more pushing and…
Brent Baude:  Okay.
Daniel Walsh: this is the problem is if you've tried to pull one these images with an older version of Docker, you will fail. It'll come back with that saying,…
00:20:00
Brent Baude:  Okay, but
Daniel Walsh: unsupported format.
Brent Baude: But I think what you're saying is, there's, you know, both formats would still be perfectly usable. It's just be a swap.
Daniel Walsh: Yes. Which means…
Brent Baude: So if container registries didn't
Daniel Walsh: if I meant stats to push images, that can't be used by older versions of darker. That's that's with the dot, that's where we're gonna get. We're gonna get paid as being anti-unity or anti You know. Oci or something at that point.
Brent Baude: So, I I would, I would be in favor of this. The one thing I would want some sort of commitment from Let's say somebody like Cui. That they would be there be a way to build. Zstd. On their end.
Brent Baude:  because, A lot of us. Use. Combinations of GITHUB and CUI. And auto building.
Daniel Walsh: Yeah.
Brent Baude:  and one one, like one image, I can think of in particular is Fedora chorus has a
Brent Baude:  They have a image they use for building for coros. And that image is updated weekly. And it's four and a half gig. But I believe it's built, you know, hands off. So it'd be one of those. One of my questions would be If we if we switch, that would be, this would be more effective if if more people could take advantage of it,
Daniel Walsh: Yeah, but to me to me that's this is where the check of the egg situation is sort of like the old before we force sea groups, V2. Like Oh no. One support secretly too. Why don't they support it? Because no one uses secret too. So, until we start pushing zsdd images. if you went to Cui and said, You know, will you build with CSD? They're like, well, no one uses the STD so it's sort of
Daniel Walsh:  yeah.
Valentin Rothberg: The problem with cstd is that it's in contrast to see Group C group. You fail immediately on the client. So the users. While with Csdd, it may be a silent change entirely transparent to the user. But when they pushed their images, some of their clients may break because they're still using older. so the let's say, The the error multiplication happens, much further. And much more transitively than for secret security.
Daniel Walsh: Right.
Daniel Walsh: Yeah. And I guess so that to follow, I mean, I would argue that we are We did this. When we started supporting OCI because older versions of darker, at the time didn't support OCI images. But at that time, Paul Man was brand new so it wasn't I guess people who would expect it to, Potentially cause more breakage than it would now.
Valentin Rothberg: But also, any any breakage can be negative marketing as well. As much as any major major version. I personally perceive major version bumps as all yet, another breaking change.
Daniel Walsh: So we can't we can hold off on that one that argument to the end. Since that's the
Daniel Walsh:  I don't see that. I mean potentially we push both but then we're gonna get bad news, you know, by the fall but then we get bad. Press from people saying we're using up twice as much bandwidth twice, as much storage.
Daniel Walsh: But maybe that's the value one but I don't think it valid one is. Oh, we'll just wait, Yes more before. Does anybody ever use a zdd because You know, at some point in the future, there's gonna be enough docker clients out there that Supporting an old ones and…
Valentin Rothberg: Like, I think it should be a
Daniel Walsh: I could hear you autos Old Ubuntu is an old. rails and all, well must bad shape, but
Anders F Björklund: but I think,
Valentin Rothberg: I think it should be stepwise migration where, you know, since it's a containers, conflict can be configurable. So Fedora can go first and just Change the standard compression in only in Fedora to see standard without this being built-in, default, setting for Portman, which would then affect all other distributions as well. so, I think that there are ways to, you know, increase, The usage and…
00:25:00
Daniel Walsh: Yeah.
Valentin Rothberg: the user-based step by step and not use the big hammer and switch or try to switch everybody at the same time. I think in Fedora, you know, this is probably at least in this immediate community an easier. Test that
Daniel Walsh: It and in the movie that she and the Moby that ship by Fedora supports the format. So it's not if you live in a fedora pure environment, you're not going to be bit by this.
Daniel Walsh:  So I could go along with that. Just doing his containers.com and leave the standard. Leave it to fall to the STD for built into package, config into common. Yeah.
Brent Baude: Yeah.
Daniel Walsh:  Okay.
Daniel Walsh:  I guess. Those that on the call right now, the next one is the concept of the build farm. And nalin. Did a demo of this? I don't know if that was an internal or external. a few weeks ago, the basic idea is as We're hearing more and more people who want to build. Images for multiple formats. So from multiple architectures, And a lot of people, it's a fairly complex. Tooling of fairly complex effort to build image for multiple architectures, especially if you're not building them with some kind of emulation mode. Um, So the the basic idea would be say you're on a Mac. You're saying, I'm too Mac and you're building.
Daniel Walsh:  I'm chips based images and then you want to build x86 image and you want to push both of those to a registry so that you create a new full buyer image and it's too architectures. While doing that is fairly complex and what? Nowlin is demonstrated with the tool. He called Build Farm was the ability to Do that automatically taking advantage of.
Daniel Walsh:  Connections. So now on you on the call,
Daniel Walsh:  Put you on the spot.
Tom Sweeney: Nobody's no way on pidgeot today.
Daniel Walsh:  That one's away on Pto. Okay? So the the basic idea would be to to you do a pod man. Build - platform equals am AMD, 64 comma. I'm calm or power and what would happen is odd, Man. Built Odd, Man client would look through its connection database to see if it has connections to the different architectures and then would launch the bills on the different architectures. So say you had set up three ssh connections to build service to be able to perform the builds on a remote system. Then it would pull the images back to the local system create a manifest list and actually assembly entire image and push it out to a registry. So it wouldn't be you wouldn't have to deal with manifest. You wouldn't have to deal with
Daniel Walsh:  Any any special needs for running multiple, you're sitting on a Mac and two and you had two VMs running two podium machines running one for X86 and one for on then if you build with a - platform I'm an x86 they would go out and to the two different VMs on the local Mac and would build the images and then reassemble them back on the default one and then push that to a registry. So that's what we're looking at for podman, builds farm support. And again, it's not looking at emulation mode. This is looking to build natively or On a native VM running an emulation mode, but as opposed then other basically allowing us to fully assemble those on it.
Daniel Walsh:  Any questions on that?
Anders F Björklund: and I think that Bill Kit is doing this and I think the killer feature for Kubernetes was Windows containers, being able to build those remotely Because most of the Linux ones could be cross-compiled but not windows.
Daniel Walsh: The problem across compilation, is, as well as twofold one, it's low, and it's potentially very buggy. I know that in the real world, Well, if you refuses to support cross compilation because it's just not this exact same as native. Now, certain architects, if you're building golang code, it's not as big a problem, but if you're building standard seat code, just to see libraries, I just felt to be way too risky to to support cross country.
00:30:00
Anders F Björklund: no, the equipment, this one was gold coat and I mean, and also You couldn't do workarounds if there was some across compilation issues but it's still a good feature. Of course, to be able to have remote bare metal, builders for performance reasons.
Daniel Walsh: Yeah, yeah. And I'm like having what we're looking at here, Actually more of the client driven solution, then the server driven solutions so that you would just have to set up two two and more connection databases to different architectures and either run that VMs locally or remotely. It's just taking advantage of what basically what Pod man remote currently does to assemble these? I think build kid is more on the service side, so you'd have to have, you know, rely on a server. Being set up to do the multiatch builds. Um so anyways it's something that we'd like to get to match the functionality. That's in build kit now but take advantage of what we have with. Basically, the connection database empowerment.
Daniel Walsh: So the next one, someone else put in.
Brent Baude: Yeah, I can do that final comment.
Daniel Walsh: So I'm gonna let that Yeah, you run the bathroom. All right, I'll be back.
Brent Baude: Yep, final comment on the bit on that build farm though is I think there's a I've no objection with the feature. That's it's a good feature. I think also though there's A a couple of nuggets of gold on the topic of Cross architecture. Period. Throughout Potman.
Anders F Björklund: and I think also now that build decks gone default that has kind of upped the competition if you
Brent Baude:  Yeah. So as I think about Batman Moore as a whole, I think there are several areas where architecture plays a role and
Brent Baude: but, Starting with. My gripe about being able to pull the wrong architecture. And attempt to execute it.
Anders F Björklund: It. Yeah but I mean there are some nice things like being able to use Kubernetes pod builders and stuff like that, that this could be a nice features to have also important.
Anders F Björklund:  I mean, with, with a root, let's capabilities and everything. You have a You have a whole dockering doctor, a customer to migrate. I think the life. Of course.
Brent Baude: Indeed. Okay, so Timewise here. I'll try to be efficient. the first one was,
Brent Baude:  After that, apple hypervisor stuff is done.
Brent Baude:  Someone probably not me needs to sit down. and contemplate a refactoring of machine code, there's Plenty of duplication that can be removed. I think there's there's a couple of changes in how we do things that could be. Implemented such as factory or build type patterns.
Brent Baude:  And things along those lines. Again, that's not really a feature, it's not something that users would know about. So it could be It could be set as a goal for V5. Or it could just be done in four dot whatever. And no one be the wiser.
Daniel Walsh: Fall. Yeah, On similar we have discussed potentially moving part man. Machine out of podman into it, separate repository whether we want to or not people are using pottery machine for uses other than just pod man. and so, it potentially could get if we moved it to a separate repo, then potentially you get more people to coming work on it as a separate project. So there are, there are thoughts going around that.
Brent Baude: Agreed. I've been sort of asking questions around the team as many of them all know as to whether we should start. Making manifest lists more, integral to podman. So to me that's an open question. But but Dan wanted? wanted edge, sort of ideas that You know, are gonna push things a little bit and This might be one of those again, it involves. some compatibility issues as well as registry things, but I wonder if it's something we should start doing.
00:35:00
Daniel Walsh: Yep, for those that don't know when you pull an image right now. To a system by default. We don't have a minute. We don't necessarily pull down and manifest list with the difference between an image in a manifest list. Is that If you have a multi-atch image then you have a manifest list of defines the different arches that are in the image by default. Right? Now a very common era that we hit is people pull down a different architectures image. That becomes a default image and then if you go to run at image layer, say, Pull down Alpine for For arm and you're an x86-64. Now you go run the command. Just do a pod Man. Run commander later and you think that you're gonna re-pull a
Daniel Walsh:  X86 image and run that no you end up running the command on top of the image that you pull down. If we had a manifest list, then we could change the behavior so that if you did Pull an image for different architecture. You would get put into the manifest list, if you rent to run it and we could run the native, We pull the native one down or just have the native one available so moving to a manifest list by default again.
Daniel Walsh:  Because the world's moved pretty much when darker happened and over the last first, say eight years of container worlds. It was one architecture x86 with, you know, a tiny bit of different architectures in the world and I think over the because of what Apple has done and the rise of arm. Now we're seeing that there's two architectures out there you know better and you know if risky happens or there could be three architectures and so suddenly we'll work living in a world with Supporting multi arch should be the default as opposed to this one often. And that's what that's why I would like to see us move to manifest list as by default.
Brent Baude: I think the last time that we talked about this, we sort of came to the conclusion that what we'd be talking about here is in rather than an opt-in. This would be an opt out. So that would be the big change is that we would just turn it on. And allow users to opt out of it. As a way to start. Getting people to use it. Kind of like SC Linux.
Brent Baude:  Anything anyone want to comment on this one or honesty, Linux?
Matt Heon: How seriously is this going to Sorry?
Paul Holzinger: I can.
Matt Heon: Go go Ed.
Paul Holzinger: No, I, I totally support the idea of having manifests because I never understood the current behavior that you just used to take from your native image and then all of the sudden, it's Like no use, I can understand what's happening here. So I I think that that makes much more sense.
Brent Baude: I don't think they need to understand it either or should have to
Paul Holzinger: It right, right? That's the thing. Like the current behavior never made sense to me. So,
Brent Baude: Go ahead, Matt.
Matt Heon: How seriously is this going to affect? Like I don't think we can change the way. Say Odd man Inspects works on images. Is this going to seriously affect my workflow? If I'm used to only using podman and spec podman history, all the image specific commands. My concern would be that suddenly I start getting different output because it's a manifest list, not an image and
Daniel Walsh: I think it would just default to the unaid about this would allow us, I believe to always default to the native arch. So if you do a pod,…
Brent Baude: Correct.
Daniel Walsh: man, if you do a pod man pulled - platform equals, And then you do a pod, man. Inspect Image. Without the dash dash equals it. You'd get the native format one as opposed to the one.
Matt Heon: Okay. Yeah.
Daniel Walsh: That's the goal and…
Matt Heon: I'm sure.
Daniel Walsh: I'm making up since we haven't done this and I haven't experimented with it but that was that's the goal.
Brent Baude: These are just ideas.
Matt Heon: We're going to blow something up. We're going to make someone very angry because all of a sudden, they're making manifest list that they didn't know even were a thing. But I don't, I agree.
Daniel Walsh: Yeah. Commitment.
Matt Heon: That's a good idea and I don't think we can avoid us.
Brent Baude:  What did you say? We're gonna make users, make manifest lists.
00:40:00
Daniel Walsh: Right.
Daniel Walsh: Those that don't know on this call, manufactless is just a JSON file on this. Yeah.
Brent Baude: Yeah, and I would suggest that we make every bit of effort to hide that. There's a manifest list from people.
Daniel Walsh:  Yeah.
Brent Baude: unless, People know about it and want to alter specifically the manifest list. I think there's a set of rules. We could kind of come up with that, that would allow for that. Okay, we best move on.
Brent Baude:  The the next one is around this podman machine and the OCI images. This is this is essentially where you can build your own images or we could distribute our images, or epcot's images via something like quick,
Brent Baude:  This is a pretty big advantage for us. It, it also has a few upsides, one of which I listed there, but
Brent Baude:  this is, this could be a potentially breaking visible change in the sense that we're changing how pot Padman machine gets its content So that's why I have it kind of associated with five, but I also the same time we'd be using this. My plan was that we would use this to enforce this. That the version of the client, dictates the version of the guest. And so, if you have a Mac and you're using pie man for eight, you're gonna or rather five, oh, you're gonna get a 50. You're gonna get a 50.
Brent Baude:  Guest operating environment. Inside the machine and if you're at five one, you'll get a five one. This eliminates, our problem of mismatched. Clients and servers so to speak. It's sort of a double whammy.
Daniel Walsh: it also allows people to lock in, at a specific version, so as we, as we start to go out for
Daniel Walsh: Enterprise customers. They're going to want to building for. You know. A specific version of the operating system. I want to build on that up that level of the operating system so they can Guarantee that this will work with the podmin for six version of odd men. For instance of say that is five five seven and they want their service are all at five three. Then they can log in and build on a five, three based image.
Brent Baude: Yeah.
Daniel Walsh: Test.
Anders F Björklund: And what is the, what is the difference between this and having a URL for the image?
Brent Baude: It's the the image is, is different on there. So For example. Today, we pull down a few cow for qmu. In and…
Anders F Björklund: Yeah.
Brent Baude: so in the future, we would pull down an OCI image.
Brent Baude: Not a cute girl.
Anders F Björklund: Right. But I mean, if you wanted to fix the version, you could do that by providing a custom image to direct. But this would make it easier to host.
Brent Baude: Yeah, we're
Anders F Björklund: It doesn't.
Brent Baude: It would, but we're desperately trying to stay out of the developing our own fedora chorus and having to do things outside of what Fedora chorus, the team offers.
Anders F Björklund: That was just wondering if there was a benefit if you had a Web server serving images. Today, if there was a benefit of moving it to OCI images in a registry instead.
Brent Baude: And yeah, I don't know. but the tagging of the, you know, the tagging ability there and how image, registries are organized are Quite beneficial.
Anders F Björklund: Yeah, and I guess you don't have to maintain two different types of servers would be. A benefit to some.
Brent Baude: Something like that. Yep.
Daniel Walsh: You know.
Christopher Evich: The city and Cdns aspect. This one.
Daniel Walsh: Right. We'd like to get to a world where all software shipped fear. Image. It's basically image repositories which Are whether they're coming as containers or operating systems.
00:45:00
Anders F Björklund: Or packages. Yeah. Yeah.
Brent Baude: Okay? And the last one you guys have for those that are on the team, you've heard me kick this topic around recently and it's Probably appropriate for for V5 since it theoretically is a change that users would be impacted by. But essentially right now for running Padman machine depending on the hypervisor and the operating system being used, we have to have various services. running, whether it would be traffic forwarding, whether it would be for vsoc, listening, Whether it might be for Vert. Iowa Fest. And so on.
Brent Baude:  VF Kit would be another one. so, we've talked about whether we should continue to have these microservices and try to continue to manage them as such or whether we assimilate. Into a single service with Microservices underneath it. So that's an idea.
Daniel Walsh:  Any comments on any of this, anybody else have ideas of what they would like to see us have in padman 5.
Daniel Walsh:  Good everybody.
Anders F Björklund: And dance, some of those storage ideas.
Martin Jackson: It is.
Daniel Walsh: Go Anders.
Anders F Björklund: Yeah, so and there was some talk about like IPF storage and similar. I compared to peer storage and so on. I was wondering if any of that is coming to containers image and therefore podman.
Anders F Björklund: So that you could both split up your your layers into smaller files and then distribute those files. With our peer-to-peer type of registry.
Daniel Walsh: I guess Valentin or Miller's life, if you thought about that or Giuseppe.
Anders F Björklund: And also talk on Foster. I might
Matt Heon: We have none of those people on the call. Dan Unfortunately, Valentin actively early. So I think it's a I think it's a good idea.
Daniel Walsh: Um, yeah. Yeah, and just The Anders, could we put that in for discussion on the next Meetup? The next one of these, That seems like a decent conversation.
Anders F Björklund: Yes.
Daniel Walsh: I'll also move container shell. To the next discussion for those that don't. I've had two meetings in the last week with different customers who are looking to control users on a service. So the idea would be potentially to allow us to customize their environment. Basically imagine logging into a system, getting stuck into a, A container. And that's what I just calling a container shelf and now, but we don't have time for that. Martin, you get to talk my talk.
Martin Jackson: Okay, sure. I was wondering, you know, with the, the kind of marketing aspect of the major rep whether Quadlet would get promoted from, you know, kind of experimental tech preview to, you know, fully supported and, and get some more marketing around it.
Daniel Walsh: Yeah yes definitely. Although sometimes we do that that's more of a real thing than a necessarily.
Martin Jackson:  Yeah.
Daniel Walsh: Yeah you know but yeah definitely quadlet would be police fully supported at that time, matter fact, container shell would be Also looking at extending quadlet to allow use users to define quadlets for users. As opposed to quadrant for system services. So that's
Paul Holzinger: Speaking. And speaking for upstream, I would say Quadlet is fully supported like we five bucks, we fix bucks. People come in with ideas. So
Martin Jackson: Oh, I'm using the heck out of quadlet and I love it. You know, I I it is it is one of the coolest things to happen in the pod, man, ecosystem, you know, in my mind like ever, I've got it running game servers, I've got it, running my automatic ripping machine and since we're being recorded, I'm not going to incriminate myself, but, you know, I love it.
00:50:00
Daniel Walsh: Good. we got no, we've gotten a lot of nice feedback and now now the idea is to get more of the word out to get People blogging people, it's showing, I would love to have people start to distribute quadlets and saying, This is how I run this service underneath, you know, system D. And as we move to a judge devices, I think quadlet is critical.
Martin Jackson: I I totally agree with that thought.
Daniel Walsh:  And it's really, really simple. So that's what I think. That's what everybody likes about it.
Daniel Walsh:  So it's Valentin left. We don't have to so valentin's. I'll I'll be the devil's advocate and make myself Valentin. Now he without you is that we never break anybody, he wants He wanted to talk about
Daniel Walsh:  Sort of. Leanestabolus's idea that you never break an application by updating the kernel and i we could argue back and forth, obviously don't want to break people but we also don't want to be Carrying old crafty code for forever. So the for me, it's more about pushing the envelope. So, my concern is that when you don't, Break anybody? You end up with the same code that you had in 2012. So for instance, I pushed updates that have broken people to make things more secure, because some the false picked by darker war were bad. So my concern when we say we never break anybody is that we get stuck.
Daniel Walsh:  You know, just doing stuff the same way as we have for the last 10 years even though they're a better ways like Zstd for storing images and you know, and we have a even secretary too. It's like we get stuck. As he was three one forever. So sort of the Fedora mattress mantra is what I like which is okay. Let's push people to its these these new changes and some people are going to drag drag behind and we try to keep them as happy as possible. But we need to push the the technologies and I think this is partly why Docker was in a relief for three years is because they get stuck in this. And those quandary. So but I agree that both arguments are valid and you know, since a lot of the people in this call are supporting rel for 10 years, we're going to be stuck supporting this stuff for
Daniel Walsh:  You know many many years but I think we can push the upstream a little bit faster to take advantage of new technologies as they come along.
Matt Heon: It would be an easier sell if we Publicly maintained long-term support branches of V4 for a longer time. I think our upstream position is that V4 is going to go out of support the very moment that V5 comes out. We do have to support it for REL for a while, but that's not really an upstream thing. So maybe we could formally announce upstream support of some degree for a long-term fee for branch just to keep people. Overall, we do the breaking change v5 thing.
Daniel Walsh: Yeah. But people have to understand that they won't be getting new features. So if on the floor, yeah. Okay,…
Martin Jackson: I mean I think I think people kind of get that they wouldn't be getting new features with that kind of thing.
Daniel Walsh: for example.
Martin Jackson: But In.
Anders F Björklund: I'm not sure if you seen the Ubuntu support for podman people want a stable version and the latest version at the same time in Debian, stable release. But but I viewed apartments support is not so much kernel, it's more like Python. So you would have Python 2 and I thought that were like Be around forever and then you have a Python 3 that you try to push to people and no one will take it.
Daniel Walsh:  Right. I know it took it until Fedora basically turned off by then too, right? So
Anders F Björklund: Yeah. And that in a decade past or something. That's your
Tom Sweeney: And just looking at the clock I'm gonna push a little bit to wrap us up here. Matt that you want to say anything about the demo or on bookfix week before you head out.
Matt Heon: Sure, I can keep this quick. So the Pod Man Core team is going to be doing a bug week for the next week. Not just the podman team builder and Scorpio and everyone else should be involved as well. But as part of this, we are encouraging. Anyone who wants to fix bugs or have bug fixed, please focus. And let us know that you can see or something high priority or even better. Please comment on a book and say I'd like to work on this next week and we will get it assigned to you or try and get a prioritized. And the goal is to guys make books we can fix over the next week and then do some stability releases week after
00:55:00
Daniel Walsh: Yeah. So what we work on the next week will be in five man four or five dot one. This is the goal. To put more.
Matt Heon: Yeah, we'll do a
Christopher Evich: It might be might be worth putting that invitation out on the mailing list.
Matt Heon: Yeah, I can send an email.
Tom Sweeney: Okay, great. That word running out of clocks. So I am going to just announce real quickly that we're having our next meeting on May 18th for the Cabal and then June 6th for the community meeting. And I'd like to thank you all for being here. Today, I'm gonna hang up on the recorder.
Tom Sweeney:  No recording. Anybody want to say anything other than let's go to lunch?
Tom Sweeney:  Or dinner, depending on where you're at.
Tom Sweeney: Right folks, that's it. Thank you so much. Bye.
Anders F Björklund: Yeah, bye.
Meeting ended after 00:56:50 👋

```
