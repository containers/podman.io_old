# Podman Community Cabal Meeting Notes 

Attendees: Anders F Björklund, Ashley Cui, Ashley Cui's Presentation, Brent Baude, Christopher Evich, Daniel Walsh, Ed Santiago Munoz, Lance Lovette, Leon Nunes, Lokesh Mandvekar, Martin Jackson, Matt Heon, Mohan Boddu, Nalin Dahyabhai, Preethi Thomas, Reinhard Tartler, Tom Sweeney, Tom Sweeney's Presentation, Urvashi Mohnani, ykuksenko 

## May 18, 2023 Topics

1. containersh - Lokesh Mandvekar, Dan Walsh
2. Storage - allow layers to be split across multiple files. - Anders Bjorklund
3. podman.io - Comments/Discussion
4. github.com/containers/appstore - Dan Walsh
    

### Meeting Notes
Video [Recording](https://youtu.be/GYrFHoYtXDA)

Meeting start 11:02 a.m. Thursday, May 18, 2023

###  containersh (1:25 in the video) - Dan Walsh

A shell account to allow an interjection into a shell.  You'd interject which cgroup, image the user could have, and they would be assigned a container with those values.  Useful in a government setting.  It lets someone in with the appropriate privileges.  Dan thinks it's a fairly small addition to Podman.  The hardest part is a timing issue for execing the user environment.  A bit of a race condition with the container.  By using systemd, it will maintain the containers until the system goes down.

One thing that Lokesh has noticed is the container isn't starting.  We may need to see if the container doesn't start after some time. Then systemd will stop the container and possibly retry.

This request came from security-oriented customers.  They want the user to get on, but only to see pertinent data to them.  They've used Selinux in the past, but an ls command in that environment might show them file names they shouldn't see.  With a container, you can limit the scope of files they could see.  Better feel than being able to see all, but get blocked from parts of it.

This will be a command under Podman, so it will be under the github.com/containers/podman, not likely to be a separate project.  

###  Storage - allow layers to be split across multiple files. (13:20 in the video) - Anders Bjorklund

Question from the previous Podman meeting, about support for `ipfs://`.

* https://github.com/containerd/nerdctl/blob/main/docs/ipfs.md
* https://github.com/containerd/stargz-snapshotter/blob/v0.10.0/docs/ipfs.md

I think there was some Podman version of estargz, maybe it was zstd:chunked ?


Dan thinks we can handle this, but we need more work on the file system.  Dan is for it, but would like Giuseppe Scrivano to take a look at it.

THere was a change to containers/storage by an outside of Red Hat contributor, but it wasn't completed.  There were problems with the fuse file system, and the folks working for Red Hat weren't able to prioritize tracking down the issue.

Side note: here was the project mentioned briefly, which works in the kubernetes context for mirroring images from the registry <https://github.com/XenitAB/spegel> (probably more for CRI-O)


### podman.io demo - (21:58 in the video) - Ashley Cui - 20

Ashley showed the new website.  Showing the options.  It just went to v1.0 this week, in preparation of Red Hat Summit.  The site is a combo of Podman Desktop and Podman, with the feel of Podman Desktop.

You can download either the CLI or the Desktop from the page.  It detects the OS you're on and gives you the right choice (Mac, Windows, etc)

Anders thought it might sense to not call it CLI, but perhaps Podman Engine.  The download will have the engine to run, and CLI is part of that, but it could potentially be separate too.

Ashley thinks more documentation here on this download page to clarify things.

Happy to take contributors!

### github.com/containers/appstore (29:45 in the video) - Dan Walsh

Just an idea, an area for examples on how to use different tools.  Docker has "awesomecompose" to get compose examples.  We've been pinged for a site similar to that one.  

We have created the github.com/containers/appstore and have opened it up to people to add their examples.  I.e. how to run mariadb inside of Kubernetes.  We'd probably want to eventually set up a CI/CD system to test the scripts that are submitted to make sure they don't break, or age out.

Chris Evich thinks renovate can help with making sure the scripts are still viable.

Mark Russel has a contact, George, who has been wanting to do this and has a collection he would like to drop stuff in.

The problem this team in Red Hat has is were' container tool experts, not necessarily container creators/maintainers.

Dan wants to make sure that the apps that are dropped will actually be useful for real-world environments.  Not necessarily just "Hello World".

The issue is as priorities change, a contributor might not keep the app up to date.  We'll need to be able to easily track the maintainer and the last time they updated the app, and also revision control.  It would also be nice to be notified when an app that you grabbed gets updated later.

Chris thinks this is possible via renovate.

The project has been created.  https://github.com/containers/appstore

Dan was thinking about creating directories for quadlet and Kubernetes.

#### Open discussion (42:00 in the video)

1. When should you use pass-through versus journald should be used?   Dan thinks pass-through is better aligned with systemd (Tom check).  Across the board, Lance has defined journald for all, and wanted to know if Podman was trying to default to something else?  Dan thinks it should not.

Pass-through will send to stdin/stdout via systemd.  It was done to integrate better with the journal log driver.   If you use pass-through, podman logs gets disabled, so it's like not logging.  But you get better integration with the journal.

If Podman goes away while being run with systemd, conmon will write to the logs.  

 
 
### Next Meeting: Thursday, June 15, 2023, 11:00 a.m. EDT (UTC-5)

## Possible Topics
1. ipfs integration into Podman - Anders Björklund to kick off
2. Mark Russell's contact George for appstore


### Next Community Meeting: Tuesday, June 6, 2023, 11:00 a.m. EDT (UTC-5)

### Possible Topics:

None Discussed

Meeting finished 11:52 a.m.

Raw Meeting Chat:

```
Daniel Walsh10:59 AM
Today is a holiday in a lot of Europe.   Ascension Thursday
You11:03 AM
Meeting Notes: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Please add or correct as we go along.
Daniel Walsh11:42 AM
https://github.com/containers/appstore
```

Raw Google Meeting Transcript:
```
Tom Sweeney: Okay, the recording seems to be working at this point in time. So welcome everybody to the Quad man community the ball meeting. The meeting that we generally talk about future design decisions and topics along those lines. Rather than demos, the demos meetings are generally held during the community meetings, which will be coming up. In June, I think it's June second. We'll talk about that later on today. For today we've four topics lined up. We have talked about container sage being led by Dan and Lokesh, We have another topic about storage allowing lawyers to be split across multiple files and Anders thanks for joining today. I know it's a holiday and all where you're at

Tom Sweeney:  And I thank you started at this point and then we'll be talking about Podman.io. We've got some very exciting, new changes going on there and there are more Maureen is going to be talking about and then Dan's gonna be talking about the App Store on the containers project so given all that. Oh and you know put a link to the Hack MD, I'll be taking notes during the meeting today in hackham day. If you have any I think that add that I've messed up or you want to add a link or anything like that. Go ahead, please do it. There. And I'm trying to check on. The moment here. Given all that. I'm going to start it off with general location. I'm not sure who's doing the talk. This one for the container sh Yeah, yes.

Daniel Walsh: Yeah, I guess. Who I'm getting feedback.

Daniel Walsh:  Are the people getting it? All right, the Echo, one way. So I don't have any presentation on it right now. And Lokesh myself and some people from the SC, Linux team have been working. as a side project on the, an idea, what we calling Pod, Man Shell And what this basically is. Will be an enhancement to podman to allow. you to configure a shell account or login account with a shell of podman shell, which would automatically Inject a user into a. Container, when it lies into the system. So think of it like a hunting pot environment, What we're trying to do is to do it as

Daniel Walsh:  Part of, you know, just a link off of Pod man so it won't be a new executable and that we're all gonna be taking advantage of quadlet to define a user container for that user. So imagine you create a container, a quad that podman Sheldon, quad that

Daniel Walsh:  Not die container. I mean you define which image you want to use it to be injected into what Cgroups you want them to be controlled fine, with what volumes, you want to make available to the user inside of the environment. Then when the user logs onto the system, he would automatically get he or she would automatically get injected into the container and be locked down With that. The container would have any rights that you wanted to expose the user. The reason we, we've had a couple of government type

Daniel Walsh:  Customers that have come in and talked to us about how they would like to be able to use some container technology to actually control uses that allowing into the system. So, you can imagine a, You have a sort of a system with lots and lots of data on it when you, but you want to give a use either a shell account, so he gets onto the system and only able to see certain directories on the system. Another way another idea would be You want to set up sort of more like Toolbox where you would log on to a system and have an entire suite of tools available to you, that will be different than other users logging into the system onto the same system, but have, you know, constant data that you could use to do it?

Daniel Walsh:  So, I think it's a fairly small enhancements to pod to Odd, Man, and most functionality, we found the most of functionalities available. Now in the system, just by using system D to start up a service for the user. And then just basically getting a pyramid exact into the into the show into the container that you're going to create. One issue we're having right now is a timing issue in that. I think there's a bit of a race condition because really what we want to have happen is when the user ssh is into the box, this container gets started. For the session. And then I think, We haven't quite figured out how to wait for the shell. For the container to get up and running before you try to exact into it. So if part Man shell

00:05:00

Daniel Walsh:  Execs in right away. Then the shell might, the container might not be up and running at the time. So it was a race condition, the beauty of using system need to manage these. The actual containerized service is that System D will keep track of all sessions. So if you logged into the system multiple times, Um then system legal maintain the service running until you log out of all sessions and then we kill off the container. So anyways, we've talked internally about this and this is the first time we're really talking about it externally. Does anybody have any questions?

Brent Baude: Dan on the problem of the container starting, that the racy part could you define a basically a bogus Dependent container and…

Daniel Walsh:  Yeah.

Brent Baude: weight on that one.

Brent Baude: so, it would be Essentially,…

Daniel Walsh: I think.

Brent Baude: you'd wait on what you'd wait on one, but you're really just using it as a indicator for the other.

Daniel Walsh:  well, I think the problem is apartment Shell is gonna I think this I think when you log into the system, Lokesh you, you've experienced this, right? You talk about it.

Lokesh Mandvekar: Uh yeah. So what the one thing of notice was if I rerun the setup, I often end up with no such Container image. Sorry no such container.

Daniel Walsh: Right.

Lokesh Mandvekar: So And I also see a bunch of SC Linux messages about non-existent keep yourself. So, I'll figure that.

Daniel Walsh:  Yeah, and I think what's happening is when you log into the box as you log in System D realizes you're creating a new session. It starts the session then starts the container, but simultaneously at podman cell is running. so, I think what we need to do is to have Quad man, Shelby smart enough to retry for some period of time. you know, basically do a fallback until the container is actually exists. would be the most saying, but only do it for, you know, 10 seconds or something, I don't as we might be something that we have to configure, but

Brent Baude: We do that basically a back-off as well with other stuff…

Daniel Walsh:  Right.

Brent Baude: where you know, you try and 250 milliseconds and then 500 and then one second. Yep.

Daniel Walsh: Good. I think I think we do that and then it's a container doesn't start for a certain amount of time then. You know, kill the shell and drop out. I think that. but,

Daniel Walsh:  Any any other comments questions? Thoughts.

Brent Baude: What's the primary? You know, jumping up and down. User.

Brent Baude:  Use case, if you will.

Daniel Walsh: so, the users that first brought this up or were basically, real heavy security people who wanted to A traditional use case for um, these type of customers is that they allow a user to get onto a system that has data, that's at multi-level, so top secret data, secret data, and they want to allow the user to get on to the system and then only able to view, say, secret data and

Daniel Walsh: um, traditionally they've done this with Essie Linux, but the problem with SEO Linux is that if the user just does standard commands, like LS of an environment, he's likely just to get at or ABC generation on places that he shouldn't be looking at and so becomes very complex because I like to say is a essay Linux is complex because we give you in a view of everything in the universe and then

Daniel Walsh:  We basically say, You know, why you're looking, you know, basically SEO is gonna say why you're looking here, why you're looking it while you're looking here, and with containers, we give you a view of almost nothing of the operating system. And then we just start opening up windows to the up the operating system through volumes. And so becomes a lot easier for people to say, You know, okay, you can get on my system. But the only thing you can see is this directory on my system. And that becomes, That's a lot more human understandable than you get. On my system, you can see everything. And then I start to block you from looking at parts.

00:10:00

Anders F Björklund: I remember we had a FTP server and when we went to Not to the same option of ftps but to Sftp, then we then we ended up running shells where you previously were just sewing files. So so that that was the use case back in the day with a custom shell,…

Daniel Walsh: Right.

Anders F Björklund: that only allowed you to visit certain directories and run certain commands. That sftp. So, that could be.

Daniel Walsh:  Yeah, right. I mean, 10 to 15 years ago, I talked about Doing some stuff with Etsy, Linux around guests. And next guest and I just used to talk about how you could You know, imagine like you asked Machine at a at a library where you come in and Basically, will allow you to Web browsing and

Daniel Walsh:  You know, going. Use the printers and things like that, we'll be really nice of that. Everything you did while you were in that web, browser was destroyed. When you logged out and that, that could be a use case for someone like this as well. Where you would, you just set up a container that Allows you to do whatever you want but as soon as you log out of the system, you know, the container gets destroyed. So imagine a container that's still in a dash dash RM. So, all the content was was cleaned up after you got out. So, If you did something stupid like do online banking and have secrets stored by the Web browser and at least it would be destroyed.

Daniel Walsh:  And I mean, there are decent amount of use cases for something like this. I believe,

Tom Sweeney: some more people can look at,

Daniel Walsh:  Not yet. Who are not we're not trying to make this as fully separate projects from Podmin. I think it's a I think it's an enhancement department, just another command that probably can use, so my goal would be to To write documentation in pod, Man, how to do it. And Just have the command put on a system so it'll be a pod man. Shell Which is probably in shell, it will just be a symbolic link to Bod man and Maybe it'll be a sub package but I don't want to get into a whole separate project for this. because again, it's just gonna This is just something that Pod man can do.

Daniel Walsh:  You just have to create the Quad button.

Tom Sweeney: Great. Any other questions or comments?

Daniel Walsh: We sometimes call it Container Shell but I've been calling it podman Shelton more recently. So Hopefully in it when we get together and do demos, we can demo it in a few weeks.

Tom Sweeney:  That be good a couple weeks away. Um all right, even that I and the time I think I'm going to hand it off to it on Anders for the storage talk.

Anders F Björklund: Yeah. So we had a previous meeting where I'm also asking a question, but we didn't have time for any answer, so I guess I will just ask it again. It was really about two separate. Features one is called lazy pulling where you divide a big layer into I mean, without breaking compatibility. You can divide container layer into Sub. Files, so that you can start the container without pulling all of it until it's needed. And related to that was the other question of peer-to-peer distribution of images without having to always pull it from the central registration.

Anders F Björklund:  And I guess it's would be a question for containers image, or I mean, Portman would just use the storage.

Anders F Björklund:  Object. So there's some support about anything in container D. That's why I was asking if there's any like OCI work or if it's anything that could come to. Podman on those.

Daniel Walsh: Yes. Um Giuseppe's, not here, not. I believe that this

Daniel Walsh:  We see if I can ping Giuseppe on this. Use around early, but I'm

Tom Sweeney: Yeah, thank you.

Daniel Walsh:  forgot.

Tom Sweeney: Son Holiday today.

Daniel Walsh:  The, I believe we have some, we can handle this. From what we don't have right now is you need a fuse file system to make this thing work.

00:15:00

Anders F Björklund: Yeah.

Daniel Walsh:  Because the basic idea is you go. To run an image and container storage would say the image exists. And then you go, now you read Use a bin foobar and as soon as you execute, you've been full bar. The. underlying fuse file system would reach out to the registry and say Okay I need use of infobar and then User been full power. Would pull down say it needs G loop C. You pull down to your love C. And Continue on through the entire stack. I know that the person who wrote that originally are someone worked with, it opened up, pull request to get features like that into container storage. But I don't think anybody ever finalized it by putting in, you know, somehow getting the

Daniel Walsh: The underlying file system to do it. And my mind it would be best to enhance. Fuse. Overlay to Be able to handle it, but it's not something that anybody at Redhead is has worked on at this point. The reason we haven't really looked at it is because the latency problem, but I I think it is a reasonable issue. We've always referred to constant. So, try to avoid the latency where you'd have an application up and running. For a little bit and then also just go into a pause mode when it's downloading. gigabytes of state and…

Anders F Björklund:  Right.

Daniel Walsh: as opposed to downloading everything and then you don't have any latency.

Anders F Björklund:  Okay. Yeah. So

Daniel Walsh: So I I would say I'm all for it. I'm all for us getting this into the upstream project. but rather than having I I'm not sure what the fuse file system that implements it, but if we get that fuse file system merged somehow into fuse overlay,…

Anders F Björklund: Yeah. Not.

Daniel Walsh: I get it to be you mode if he was overly and we don't have two foul, two fuse file systems for supporting Someone desperate that things.

Anders F Björklund: yeah, and not exactly sure how it's implemented in the snapshot directly as it's calling continuity, but it has this, you need a, You need a special tar format in order to handle these I mean division of the horrified.

Daniel Walsh:  but,

Anders F Björklund: So That was us.

Daniel Walsh:  It's it's related. Is. I think it's

Anders F Björklund:  And I think we had, we had two different versions, right? We had one based on said standard and that compression and we had one based on the older work with the S tar. That, I'm not sure if it was Google or something. So, It seemed to be multiple implementations of the same idea. Being able to hack one tour streaming to It's seekable portions while keeping compression.

Daniel Walsh: I'm going through Google's, all right. contain a storage to figure out who opened up the pull request, but looking for a star right now,…

Anders F Björklund:  Yeah.

Daniel Walsh: but It's all just.

Anders F Björklund:  now, I think we took there was some talk about it, like previous container plumbing, but not this one. So maybe like you say there are other concerns that are more important, so it's not the most desired feature

Daniel Walsh:  yeah, what yeah, I mean I don't I just don't think that

Daniel Walsh:  Yeah, I can't find who wrote it now. And do you remember anything about this?

Nalin Dahyabhai: I would have to go digging through it as soon as you.

Daniel Walsh: Yeah. But yeah,…

Anders F Björklund: It was.

Daniel Walsh: as I said,…

Anders F Björklund: It was a hero talking about it. So,

Daniel Walsh: I'm you know, it's just hasn't come up as an interest for You know,…

Anders F Björklund:  Okay.

Daniel Walsh: that the developers at Red Hat at this point to, to support this and just mainly because of the fuse vial system problem and…

Anders F Björklund: Yeah. Yeah,…

Daniel Walsh: Now we haven't focused on. Yeah.

Anders F Björklund: I run into some similar issues. What while trying to promote peer-to-peer pulling over images and that is You can easily. You can easily set it to allow the private network only, but most peer-to-peer systems are public by default, which means people are terrified. So when you, when you mention an appear to pair is like mentioning Dr. Hub, you tell that to the private really stupid people and…

Daniel Walsh:  Right.

Anders F Björklund: they go into defensive mode and then it's for lockdown and everything. but,

00:20:00

Daniel Walsh: Yeah. Similar. We've been talking about that for about eight eight or ten years now. So,

Daniel Walsh: Nothing. Nothing is happened in that front. And sadly,…

Anders F Björklund:  Yeah. So

Daniel Walsh: we don't have the people who work in containers imager here, because they're on holiday…

Anders F Björklund: I, Yeah,…

Daniel Walsh: because yeah. So,

Anders F Björklund: I'm also supposed to be on holidays and relate.

Anders F Björklund:  Yeah, that's right.

Daniel Walsh: So we can put that. I mean, if you don't mind, we'll put that one on hold for what.

Anders F Björklund: Yes, you can come back to it.

Daniel Walsh: Let's talk about it.

Tom Sweeney: Up. Yeah.

Daniel Walsh: Let's talk about it next month. When

Anders F Björklund: yeah, I think Ipfs is quite experimental anyways, so you could probably do with some more maturing That there were also some like halfway solutions…

Daniel Walsh:  Yeah.

Anders F Björklund: where you would not hack up the layers, but you would distribute images from your peers. So you you would talk to your peers and then And then see if anyone close to you has the image before putting it from the registry. So, so,…

Daniel Walsh: Yeah.

Anders F Björklund: there were some work, like

Daniel Walsh: Yeah, that would be cool. I think the the issue and they might have with that is how signing and and could you verify the image and make sure it's the Because yeah,…

Anders F Björklund:  That yeah, it can assume so private.

Daniel Walsh: the field comes I asked for, you know, the fedora image and someone so I got a fedora image for you. Yeah, take this one. How do you trust it? No.

Anders F Björklund:  Yeah.

Tom Sweeney: Right, so we're compost bone, that one. So the next meeting then gets more folks here.

Anders F Björklund: Yeah, fun.

Tom Sweeney: And thanks for bringing up Anders and keep me honest, I put it on to the possible topics for the next one. I had thought the next one that we're going to do was with Maureen Duffy's and I thought She's gonna be here. So I will just do a real quick talk about it based on what I've seen Ashley here. Ashley, do you want to talk about this or give a quick little

Ashley Cui: so, Sorry.

Tom Sweeney:  Appointment.

Ashley Cui: um, I don't have anything prepared, but I guess. Take.

Daniel Walsh: Just demonstrate the website.

Ashley Cui:  Okay. Let's see.

Tom Sweeney:  Nothing like putting you on the spot.

Ashley Cui:  Let me see if I can share the tab for Partner and IL.

Tom Sweeney: And while she's doing that, I'll just say that it's gone to be 1.0 officially, as of this morning, we're getting it ready for the summit, for Brent, for next week. So it'll be announced there more officially. She can have. A sneak preview this week.

Ashley Cui: Um, so we have a new website Podmanio. It's been it's nice and shiny and it looks very very good but I guess it is brand new. So we haven't gone through, we're trying to go through and take a look at anything that is broken and so we've been kind of taking a look at it, we have a bunch of Links and Other Things. I don't know what else to say about it. Other than it looks really nice but I think there's still a little bit of work that we're doing but if you have some time, feel free to click through it and see what works, what you guys like and what you don't like. And we'll see what we can do about it, I guess.

Tom Sweeney: Yeah, and I'll just go ahead and add a little bit more, just basically, it's on Github, container spot. is the old site was if you had happened to Clone that site Prior Appointment.io, it's now point. Automan.io underscore old. So if you try and make an update there, go to the old site and not to the new site so you'll need to reclone if you've cloned prior and please just standard issues, if you have just use a standard issue process, If you find anything go at Adam there and Maureen's been very responsive there for the ones that we found and do know that we've got a couple more. Online in there right now that you need to chase down and hoping to clear those up with the next few days, but happy to get any kind of feedback there and even if it's, you know, This doesn't work so well or Hey, this looks great. At least have.

Daniel Walsh: Like, click on Get started, actually.

Daniel Walsh: Like I wait. Where's the one that title spell how to download because it's going to show. Is that this one?

Ashley Cui: so we don't it's just on the front page, we have a little download drop down, I actually Was working on. Hold on. Let me see.

Ashley Cui:  Let's see.

Daniel Walsh: Because one of the things we we have done is sort of. There's obviously there's podman desktop and then pod man. Main. And and this website is somewhat of a combination of the two.

00:25:00

Ashley Cui:  Yep.

Daniel Walsh: Because I think general users are just going to look, how do I get Pod, Man on my Mac or How do I get Bod, Man on my Windows box?

Daniel Walsh:  For some like Pod man. I think the Linux, she's community is a little more savvy about how you probably gonna get a package on the addition. So, we wanted to make, you know, obvious places, they go to his apartment.io and Um, make it easy for you to find.

Ashley Cui:  Actually worked on this this morning which is now there's a CLI option so you can download desktop and you can also get the CLI. And so it's kind of a combination, you know, if it tries to point you into the desktop direction, if you want the desktop stuff and then it also gives you option of looking for CLI stuff. Yeah.

Daniel Walsh:  And so if you were on a Mac, you would see one that says Downloaded for a Mac I would hope.

Ashley Cui:  Yeah, so automatically detects what OS you're on, which is pretty cool.

Anders F Björklund: Do you want to promote the podman engine name instead of Podma CLI, which could also relate to podman remote?

Ashley Cui: um, sure. I think it might be confusing for people who don't know the difference between podman engine and podman desktop I think CLI. Kind of makes it obvious that this is a CLI tool, but

Anders F Björklund: But but what so, so the primary option is downloading Padman desktop. And then quadman CLI.

Ashley Cui:  mm-hmm.

Anders F Björklund: Would that be the podman remote for that desktop? Or would it be the one that includes the actual running up containers? Like the full partner?

Ashley Cui: I think. It's just podman itself for I guess for Linux.

Anders F Björklund: So, Yeah.

Ashley Cui: It is the engine but for Mac and Windows, it would just be a CLI so I guess technically it is. I think we can like change this saying like installed engine using a package manager or something like that, but If that makes it more clear.

Anders F Björklund: Tabs. I was just wondering if yeah, I was just wondering if the Like now Portman desktop has gotten all the

Anders F Björklund:  Advertisements, if you want to call it that or my life. So something similar happened to Docker. So I mean, it's only natural. They, they have some kind of product entry for. So, we have a product entry for the Docker desktop, and you have a product entry for the docker engine, which Dumps. You straight into the Linux distributions and how to install on your server type of thing.

Anders F Björklund:  something similar could be done for pod money if you want to separate the ones while having like the podmon desk focus here and then you could have like a separate Section for how you install podman on, on your Linux machine and how you run podman, not remotely. But have ironic locally. I mean like the old site if you want to call it back, how are you?

Ashley Cui: Yeah. I think we could put more documentation on this stuff.

Ashley Cui:  And clarify it. Yeah.

Daniel Walsh: Yeah, it's funny. I'm not crazy about the name engine because I don't think I don't think that's a No,…

Anders F Björklund: No, no.

Daniel Walsh: no. You normal user term so It's Eli.

Anders F Björklund: It's you know, now the whole desktop is just

Daniel Walsh: Is I I would prefer to say probably five minutes for Linux, but we're we're starting to blank shed at this point.

Anders F Björklund:  Yeah. Okay.

Daniel Walsh: So, yeah, he's least here Icon makes it a little bit clearer…

Anders F Björklund: So, I No,…

Daniel Walsh: but yeah.

Anders F Björklund: no, those are definitely someone else's words and terms. So they are just,…

Daniel Walsh:  Yeah.

Anders F Björklund: they are just there to make the transition easier for people if you would start out. From scratch, we will not call it.

Daniel Walsh: yeah, I use I use engine all the time but I'm not sure that you know,…

Anders F Björklund: I think that even the programs this Indian I…

Daniel Walsh: Joe engine is and yeah,

Anders F Björklund: if you're on Portman version, it will tell you. It's and I think so.

Daniel Walsh:  Okay.

Daniel Walsh:  That's good.

Tom Sweeney: Right. Yeah it does look good. Actually thank you for doing well with that. Given how much time you have to prepare?

Daniel Walsh:  And if anybody from community wants to contribute, we'd love to have contributions. You don't have to be. Engineer to contribute to that website.

Tom Sweeney:  Yes.

Daniel Walsh:  So this this is actually Just an idea. We haven't done much work on it yet, but

Daniel Walsh:  People have been asking us for examples of how to use. Different tools and darker has this thing called awesome compose. And a lot of people go to awesome compose to get darker composed examples so they can sort of take and then hack on. So, a few people have been paying us about. Could we have some kind of Site like that. And I think the obvious thing for

00:30:00

Daniel Walsh:  For us to work on would be to first grade aside and then allow people to start to contribute, say either Kubernetes Yaml files or quadlets that people might want to experiment with. So the idea was to set up, get up containers slash App Store. And then steps to sub directories underneath it, where people could start opening up. Poor request to get their favorite. you know, variant on

Daniel Walsh:  You know, how they want to run their WordPress inside of a quadlet, or how they would run, you know? Base Inside of Kubernetes. Now what we want to have, if we start to build out this, we probably need to have some kind of cicd system where we would continuously test. All the quadlets and Yaml files that are available against, you know, a versions of Pod man, to make sure that they continue working and then If stuff becomes stale and old, then we have to get rid of it. I think the fair with something like this is, is one stuff gets old and crusty and I also worry about, if we had image that people are putting versions of images into their examples,

Daniel Walsh:  People start to pull down images that the two or three years out of date. And how do we do? So It's I think we've talked about this internally. Chris is pointed out that I think renovate can actually help us out a little bit with that secondary problem and that it could go through a win actually update. Of images or open, a pull request to update version of images. So,

Daniel Walsh:  I just opening up to have. Anybody have any ideas or thoughts on this?

Brent Baude: I do. I spoke to someone that Mark Russell. Had. been speaking with, I think they actually know each other from canonical. And the gentleman's name is George.

Brent Baude:  I think it's George Castro. And George has been proposing to Mark that this exact concept. Minus quadlet. Needed to get done and was looking for a home. to put all of us, he evidently has oodles of the stuff already done. And I spoke with them about an hour and 15 minutes basically. He just, He wants to do what we've we're meeting and wants a spot. Put it. That somewhat associated with containers.

Brent Baude:  He was going to reach out the Tom to actually get on the schedule for today, but He must not have been able to, in the short order.

Brent Baude: But I think the next thing it is just having come talk. About what his ideas and…

Daniel Walsh: See.

Brent Baude: What? He's got already.

Brent Baude:  And he he's looking for us just like simple.

Brent Baude:  It there's some stuff he hasn't figured out like you know, container wise and there's some stuff that, you know, could go this way, could go that way. He's just looking for Tyree. And advice.

Daniel Walsh: Yeah.

Daniel Walsh:  Then we can get chat GPT to just start generating these things for us.

Brent Baude: well, I think the problem that this team has Is we are?

Brent Baude: Container cools. Development. And that's fundamentally different than container service or container. Creation.

Daniel Walsh:  Right.

Brent Baude: And We probably all have our little pet projects. I'm guessing none of us are my sequel. Experts or, you know, we can get nginx running but just enough to serve a file. so,

Daniel Walsh:  I can get in a patchy Web server up and curl to it, and that's about it.

Daniel Walsh:  And basically none of us are real good systems. Yeah, at least that's not I call function.

00:35:00

Brent Baude:  Right. So again, at my vote, I'd like to the deeper dive with George and You know, spin them off and get gone.

Daniel Walsh:  Yeah.

Daniel Walsh: I think.

Brent Baude: And it sounds like yes,…

Brent Baude: time bit to this.

Daniel Walsh: Yeah. It'd be nice…

Daniel Walsh: if someone went through all of awesome, awesome compose and Wrote equivalent applications and Kubernetes YAML files. And That could run with part men. I'm trying to make sure that they don't become a General Kubernetes Yaml drop site because it might be lots. And lots of stuff that podman can't handle. That's why I like the idea of Verifying that the applications would actually ride with, but man.

Brent Baude: indeed and I I know fair amount of those Apps, if you will, that are in awesome and some of them don't do anything. That just like Hello World type stuff.

Daniel Walsh:  Right.

Brent Baude: so I think ideally what you're looking for is Put your gunk in this volume and then make sure it gets mounted.

Daniel Walsh: Right.

Christopher Evich: I'm guessing. That probably. Writing tests for these things. It's going to be equal to if not harder than developing them in the first place. Especially the,…

Daniel Walsh:  Yeah.

Christopher Evich: what the, what that stuff. I mean if it's simple things like curling from URL, using my SQL client to connect to A I see how container with that. Kind of stuff can probably do, but I think more complex. Can get challenging.

Daniel Walsh: Yeah. but I I just start a service and then a five minute inspected to make sure that you know, the the stuff that you thought was gonna be creative, got created, then

Christopher Evich: Yeah.

Daniel Walsh:  again, when I'm hoping, is that, if we start getting these things and images start disappearing that week and easily clean out, Applications as sort of disappear from the base of the planet, right? People's priorities change and they're not going to necessarily maintain their own. Applications that get donated to the site.

Brent Baude: There's there's also this question of You know, do you tag it? Like let's say you're gonna do You know, my sequel or something? Do you

Brent Baude:  You know. But there's a fair amount of variety that could occur whether you depend on. Building the image. My sequel image, Do you start at like the winter level and then all the way up? Or do you grab them and use my sequel? And then how does the the versioning work because if you if you go latest, then your subject to failures in which something inside the image changes, which, which puts ed into orbit,

Brent Baude:  Or you say tag it to a particular version and and now you know, you have to go update that at some point.

Daniel Walsh: Yeah, I mean that's what also something we have to worry about with the Cicd system. Again we're all channeling it here because in those there's nothing more unstable than container registries as far as Cicd systems. So, You know, if if 75% of the time that Test suite. Blows up because it couldn't pull down and some random image and You know, we're never gonna get it successful Testro.

Brent Baude: the other little, Treat here would be that also if I was a consumer of that. Stuff. I don't think I'd want something pointing to latest either.

Daniel Walsh:  Right.

Brent Baude: but I would like to be notified when You know, a new image comes up. In case it was security.

Christopher Evich: Renovate can run away. Runaway can handle that pretty elegantly. There's You can set up regular expressions. That can extract version numbers. And it'll And then basically give it a source of where those versions come from and it'll open up yours when it finds a new one. There's also a way you can do kind of a more generic thing. That's probably more user friendly. where you set up a regular expression that searches for a comment, a special comment that says You know, get the versions from the source, use this type of versioning and the other options like that. That's probably easier. Then it's just adding this stuff is just you know, somebody putting a comment into their Code. And Renovator pick it up automatically.

00:40:00

Daniel Walsh: So, it seems like I think I've already created the the website. Containers. App Store. Just make sure it's

Daniel Walsh:  It's nice and blank right now. Has a license in a one-line. Text.

Daniel Walsh:  I do that a week ago and then forgot about it.

Tom Sweeney: Can you add a link to the chat?

Daniel Walsh:  I will.

Daniel Walsh:  My goal was to create two subdirectories underneath. It one called Kubernetes and one called What?

Daniel Walsh:  Github will not let you create empty directories and then check them in. You have to put content in the directories and I didn't have any content and then, Some of the sparkly light went off. And I went chasing after. Whatever. That was so.

Tom Sweeney: Know, did you just drop a green beans? Each Just a real quick, read me.

Daniel Walsh:  Could I drop could I drop one?

Christopher Evich: It put a dot and put a dot MP file in.

Tom Sweeney:  Yeah. And in the directors you want to create just put a little readme at the top.

Daniel Walsh:  Law. Okay, that would have been nice. But now that I have this site up You can open up a pull request to do that.

Daniel Walsh:  Want to become Sawyer. I want you to paint my wall. White wash my fence.

Daniel Walsh:  I guess we can open up the general discussion at this point.

Tom Sweeney: There's any questions topics that anybody has?

Lance Lovette: I've got one.

Lance Lovette: so, I've been curious that the past through log driver, It's not really clear to me when I should or would want to use that as opposed to Journal D. or if Pod Man selects a default based on where it's running,

Lance Lovette:  At the moment, I specified Journal. D explicitly and I'm wondering if As I went down this rabbit hole where Kanman takes standard by default, well, it takes standard air and marks it red in the logs and python logs, right? Everything to standard air. So everything that Python writes shows up. In red said, I went down this rabbit hole, figure that out, and then I change this law and I figured out the issue but I was like maybe I should be using pass through instead of journal D. So anybody have any Direction or guidelines on how to decide one or the other.

Daniel Walsh:  I take. I take the goal of pass through is that if you're running it underneath this as a systemd service, and pass through will allow you when you do a pod man system d status, you'll be able to see it right in the Be a system D, right? And then if you run journal, you'd have to use Pod, Man command or a journal to, you wouldn't see it as part of the outputs, the unit file. I believe it's what the difference is.

Lance Lovette: Well, you, I believe you do. I mean well, Because I'm doing Journal D, now. And that everything, you know, journal controlled at Jeff shows everything, it all gets tagged with the with the proper.

Daniel Walsh: But are you doing it on the unit file or…

Lance Lovette:  Variables.

Daniel Walsh: you're doing it of the container level?

Lance Lovette: Well, I both I run it in the like when I run it standalone, it's I use log driver. And then when you do make system D, it captures that.

Daniel Walsh: But doesn't do it.

Lance Lovette: So so my container. Yeah.

Daniel Walsh: Does it switch to pass through at that point?

Lance Lovette: No, I mean not. I'm Yeah,…

Daniel Walsh:  It's the journal? Yeah. Yeah.

Lance Lovette: so across the board I especially specify Log Driver Journal, D, You know, does pod men do something under the covers like Oh hey, I'm a system D service. So let's use pass through. I can't say

Daniel Walsh:  No. No, it does it, I don't believe it does. Matt, The original version of Quadlet was attempting to do that. I believe and I think that's all been revoked, but

Lance Lovette: Because I don't know what Journal D. Or what system D. Does with outputs, like I have a dove into it enough to live like are they somewhat equivalent? Like if you're if you're using all generally driver, it's still sticking in the journal and if you do it through system D, it just attaches. Standard out to the journal, like I haven't really dug into that. So it may be equivalent. when it's running under system D, then it may be a, you…

00:45:00

Daniel Walsh: Then. But that wouldn't make that would not make sense of that passed through.

Lance Lovette: one of the other

Daniel Walsh: That I thought pass through just meant right to stand it out standard error and all inside a unifile. But I might be mistaken. Matt, do you know?

Matt Heon: That is definitely the intention pass through is basically it will have CON monologue directly to standard out standard error and since Systemd is monitoring commodity will print it directly to the journal? The intention Giuseppe is the one who added it. So I don't want to speak for necessarily because I'm not a hundred percent of why it's there, but I believe the attention was better integration into what they call it better integration with podme and inside a System D unit in certain circumstances but I'm not completely aware of what those circumstances are. There's also happened in a much earlier time at the life of the journal log driver At that point we were not well integrated with basically the journal log driver was not logging to the same.

Matt Heon:  You get logs, but they wouldn't show up as the associated with the unit in question, I think that has been fixed since. So it might be that some of the reasons we're using it to have gone away, I will say it, certainly simpler than the Journalty log driver and probably a lot more performance.

Daniel Walsh: Yeah, I think that one of the problems would pass through is that if you do a pod, man logs then you don't see it anymore, right?

Lance Lovette: All right, well, maybe I'll play around with it and

Daniel Walsh: But the most most likely Lance what I would say is, if you like it, what? Journal D. I would stick with General Day and not just pass through because when that Would my only thing is is if I do a status of the unit file or journal control dash u of the unit file. Do I see the the data that's coming out of the container? You know,…

Lance Lovette: Right, right? Because now I'm trying to think.

Daniel Walsh: then I would if that works with journal journal, then that's, that, probably all you really care about. So, I would just…

Lance Lovette: Right. Yeah,…

Daniel Walsh: because then part

Lance Lovette: because I guess I guess there's some interaction with Kanmon there. Yeah, I'm not sure…

Daniel Walsh:  Yeah.

Lance Lovette: who exactly is tagging. Entries with all the variables that toddman attaches.

Daniel Walsh:  Could you basically when you run Pod, man as a When you run pod man inside of System, D unit file and podman goes away. What system D is watching is konmon

Daniel Walsh:  if cotton on outputs any standard out, a standard error, that's sort of what a traditional service would do. Instead of a system to unit, follow if Con Mohan is writing directly to the journal, Then, I'm not sure if you see that, you see the same behavior, as if it was right into, stand it out and standard error. That, that would be my question.

Lance Lovette: Right. Yeah, it's interesting. Yeah, I mean yeah, like I said, me at the moment I get I kind of got once I fixed the Python syslog thing. It's working the way I like it to. So All right,…

Daniel Walsh: Yeah. We're all about flexibility here, but

Lance Lovette: good. yeah, all those play with it and it probably is like I said journal D's been around a while so probably some of it's been Alleviated in the last couple of years. Thanks.

Daniel Walsh:  yeah.

Tom Sweeney: Okay, any other questions or discussions? And close to the end of the meeting.

Tom Sweeney:  I'm not hearing anything, so I'm just going to give a quick reminder for our next meetings. Our next community meeting is on Tuesday, June 6th. So that's just around the corner a couple weeks from now right after holiday in the US and then our cabal meeting will be on June 15th. And both of those meetings will be at 11, a clock. June 15th is Thursday in the Community Institute Tuesday. And so, for puzzle topic, we already have two lined up. One is the IPSS integration that Anders was talking about earlier. And then also, some more talks about the App Store. If anybody has any other topics, please let me know. These are through the hacking, these scripts, we're hacking deep site or by saying me an email, so any other questions or comments before I turn off the recording here?

Tom Sweeney:  Right, well then, thank you for coming today and turn off the recording.

Tom Sweeney:  and it is stopped anything you want to say before without being recorded,

00:50:00

Tom Sweeney: Silent group about. Let's go to lunch dinner. Enjoy the rest of my holiday. If you're in Europe. Right. All thanks.
```
